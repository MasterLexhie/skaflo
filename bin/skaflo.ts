import { Command } from 'commander'
import { parsePrompt, parsePromptWithRules } from '../src/ai/promptParser'
import { generateProject } from '../src/generator/projectGenerator'
import chalk from 'chalk'
import dotenv from 'dotenv'

dotenv.config()

const program = new Command()

program
  .name('skaflo')
  .description('Generate JS/TS app scaffolds from natural prompts')
  .argument('<prompt>', 'Describe your app in natural language')
  .option('--ai', 'Use OpenAI to interpret the prompt')
  .option('-n, --name <projectName>', 'Name of the project')
  .action(async (prompt: string, options: { ai: boolean; name?: string }) => {
    console.log(chalk.cyan('\n🚀 Processing your project prompt...'))

    let intent
    if (options.ai) {
      intent = await parsePrompt(prompt)
    } else {
      intent = parsePromptWithRules(prompt)
    }

    const projectName = options.name || 'my-app'

    console.log(chalk.green('\n✅ Project Intent Detected:\n'), intent)

    await generateProject(intent, projectName)
    console.log(chalk.yellow('\n🎉 Project generated successfully!'))
  })

program.parse()
