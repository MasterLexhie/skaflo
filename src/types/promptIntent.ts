export interface PromptIntent {
  type: 'frontend' | 'backend' | 'fullstack'
  language: 'JavaScript' | 'TypeScript'
  frontendFramework?: 'React' | 'Next.js'
  backendFramework?: 'Express' | 'Next.js API routes'
  layout?: 'integrated' | 'separate'
  apiType?: 'REST' | 'GraphQL'
  db?: string
  auth: boolean
}
