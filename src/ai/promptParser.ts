import { PromptIntent } from '../types/promptIntent'
import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function parsePrompt(prompt: string): Promise<PromptIntent> {
  const systemPrompt = `You are a code assistant that parses project ideas into JSON instructions for code scaffolding. Return only a valid JSON object with these keys:
- type: 'frontend' | 'backend' | 'fullstack'
- language: 'JavaScript' | 'TypeScript'
- frontendFramework: optional, e.g. 'React' | 'Next.js'
- backendFramework: optional, e.g. 'Express' | 'Next.js API routes'
- layout: if fullstack: 'integrated' or 'separate'
- apiType: optional, 'REST' | 'GraphQL'
- db: optional, e.g. 'MongoDB'
- auth: true | false`

  const userPrompt = `Project description: ${prompt}`

  const response = await openai.responses.create({
    model: 'gpt-4.1',
    input: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.3
  })

  const message = response.output_text

  try {
    const parsed: PromptIntent = JSON.parse(message || '{}')
    return parsed
  } catch (err) {
    throw new Error('❌ Failed to parse prompt output as JSON.')
  }
}

export function parsePromptWithRules(prompt: string): PromptIntent {
  const lower = prompt.toLowerCase()

  const intent: PromptIntent = {
    type: 'frontend',
    language: 'TypeScript',
    auth: false
  }

  if (lower.includes('fullstack')) {
    intent.type = 'fullstack'
  } else if (lower.includes('backend')) {
    intent.type = 'backend'
  } else {
    intent.type = 'frontend'
  }

  if (lower.includes('next')) {
    intent.frontendFramework = 'Next.js'
    if (intent.type === 'fullstack') {
      intent.backendFramework = 'Next.js API routes'
      intent.layout = 'integrated'
    }
  } else if (lower.includes('react')) {
    intent.frontendFramework = 'React'
  }

  if (lower.includes('express')) {
    intent.backendFramework = 'Express'
    if (intent.type === 'fullstack') {
      intent.layout = 'separate'
    }
  }

  if (lower.includes('auth')) {
    intent.auth = true
  }

  if (lower.includes('mongodb')) {
    intent.db = 'MongoDB'
  }

  if (lower.includes('graphql')) {
    intent.apiType = 'GraphQL'
  } else if (lower.includes('rest')) {
    intent.apiType = 'REST'
  }

  return intent
}
