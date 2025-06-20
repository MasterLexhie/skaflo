import fs from 'fs'
import path from 'path'
import { PromptIntent } from '../types/promptIntent'

function copyTemplate(srcDir: string, destDir: string) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name)
    const destPath = path.join(destDir, entry.name)

    if (entry.isDirectory()) {
      copyTemplate(srcPath, destPath)
    } else {
      const content = fs.readFileSync(srcPath, 'utf-8')
      fs.writeFileSync(destPath, content)
    }
  }
}

export async function generateProject(
  intent: PromptIntent,
  projectName: string = 'my-app'
) {
  const outputDir = path.resolve(process.cwd(), projectName)

  let templateDir = ''

  if (intent.type === 'frontend') {
    if (intent.frontendFramework === 'React') {
      templateDir = path.resolve(__dirname, '../../templates/frontend/react')
    } else if (intent.frontendFramework === 'Next.js') {
      templateDir = path.resolve(__dirname, '../../templates/frontend/nextjs')
    } else {
      throw new Error(
        `Unsupported frontend framework: ${intent.frontendFramework}`
      )
    }
  } else if (intent.type === 'backend') {
    if (intent.backendFramework === 'Express') {
      templateDir = path.resolve(__dirname, '../../templates/backend/express')
    } else if (intent.backendFramework === 'Next.js API routes') {
      templateDir = path.resolve(
        __dirname,
        '../../templates/backend/nextjs-api'
      )
    } else {
      throw new Error(
        `Unsupported backend framework: ${intent.backendFramework}`
      )
    }
  } else if (intent.type === 'fullstack') {
    templateDir =
      intent.layout === 'separate'
        ? path.resolve(__dirname, '../../templates/fullstack/separate')
        : path.resolve(__dirname, '../../templates/fullstack/nextjs-integrated')
  }

  if (!templateDir || !fs.existsSync(templateDir)) {
    throw new Error(`Template path does not exist for type: ${intent.type}`)
  }

  console.log(`📁 Generating project in: ${outputDir}`)
  copyTemplate(templateDir, outputDir)
}
