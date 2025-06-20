# Skaflo 🛠️

**Skaflo** is a developer-first CLI tool that transforms natural language prompts into fully functional project scaffolds — complete with folder structures, boilerplate code, and configurations — so you can start building right away.

> ⚡️ "From idea to codebase in seconds."

---

## 🧠 Philosophy

Skaflo empowers developers by reducing boilerplate time and shifting focus to building real features. Whether you're starting a prototype or automating internal tooling, Skaflo gets you to code faster.

---

## 🚀 Features

### ✅ Current

- 🔍 **Prompt Parsing**: Accepts dynamic natural language prompts to describe a project
- 🧠 **Hybrid Engine**: Choose between AI-powered parsing or a fast, rule-based fallback
- 📦 **Project Types Supported**:
  - Frontend (React, Next.js)
  - Backend (Express.js, Next.js API routes)
  - Fullstack (Integrated or Separated)
- 🗃 **Template-Based Code Generation**: Uses pre-defined templates to generate working code projects
- 📝 **Custom Project Naming**: Use `--name` to specify the generated project folder name

### 🔮 In Progress / Coming Soon

- 🧩 **Feature-Driven Code Generation**: Detect features like `auth`, `realtime`, `offline`, `todo`, and generate appropriate logic/code
- 🔧 **Dynamic Package Injection**: Auto-generate `package.json` with required dependencies
- 🛠 **Live Project Runner**: Post-gen setup with `npm install`, `git init`, and optional dev server boot
- 💬 **Prompt Suggestions & Guidance**: CLI wizard for refining vague prompts
- 📁 **File Templating System**: Use `ejs` or similar to inject custom content into generated files
- 📡 **Plugin Architecture**: Add your own stacks, templates, or feature rules

---

## 💡 Usage

### Install (Dev Mode)

```bash
npm install -g .
```

### Basic Command

```bash
skaflo "a frontend app using React" --name react-starter
```

### Use AI (OpenAI API Key required in `.env`)

```bash
skaflo "a todo app with offline and realtime sync" --ai --name todo-sync-app
```

---

## 🗃 Example Prompts

```bash
skaflo "a fullstack app using Next.js and MongoDB"
skaflo "a backend API in Express with GraphQL and MongoDB"
skaflo "a PWA budgeting tool with offline sync"
```

---

## 📁 Output Structure (Fullstack Example)

```
my-app/
├── frontend/
│   └── index.tsx
├── backend/
│   └── index.js
├── package.json
├── .env
└── README.md
```
