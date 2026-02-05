# Code Review Assistant

AI-powered code review and explanation tool built with Nuxt 4, Vue 3, and Claude Teams integration.

![Status](https://img.shields.io/badge/status-active-success)
![Nuxt](https://img.shields.io/badge/Nuxt-4.0-00DC82?logo=nuxt.js)
![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)

---

## Overview

**Code Review Assistant** is an interactive tool that helps developers analyze code quality and get AI-powered explanations. It features:

- 📊 **Code Analysis** - Analyze metrics, complexity, and quality
- 💬 **Interactive Chat** - Ask questions about your code
- 🎯 **Context-Aware** - Chat remembers your analyzed code
- 🚀 **Fast & Modern** - Built with Nuxt 4 and Vue 3

---

## Features

### Code Analysis
- Upload files or paste code snippets
- Support for JavaScript, TypeScript, Python, Go, Vue
- Analyze metrics: LOC, comments, functions, complexity
- Detect imports, exports, classes/interfaces
- Color-coded complexity indicators

### Interactive Chatbot
- Ask questions about your code
- Get detailed explanations
- Maintains conversation context
- Code block formatting in messages
- Clear conversation feature

### Integration
- Claude Teams integration via MCP (Model Context Protocol)
- RESTful API endpoints
- VSCode workspace configuration
- Clean, professional UI

---

## Tech Stack

| Layer      | Technology              |
| ---------- | ----------------------- |
| Frontend   | Vue 3 + Nuxt 4          |
| Backend    | Nitro (Nuxt server)     |
| AI         | Claude Teams (via MCP)  |
| Styling    | TailwindCSS 3           |
| Language   | TypeScript 5.9          |
| Package    | pnpm 9+                 |
| Deployment | Vercel/Netlify ready    |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (22.x LTS recommended)
- **pnpm** 9+
- **Claude Teams** subscription (optional for AI features)

### Installation

```bash
# Clone the repository
git clone https://github.com/AthiraAtXogo/Code-Review-Assistant.git
cd Code-Review-Assistant

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Development Commands

```bash
pnpm dev          # Start dev server (hot reload enabled)
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
```

---

## Project Structure

```
Code-Review-Assistant/
├── app/                      # Nuxt application layer
│   ├── components/          # Vue components
│   │   ├── AnalysisReport.vue   # Analysis results display
│   │   ├── ChatInterface.vue    # Chat UI component
│   │   └── CodeUpload.vue       # File upload component
│   ├── pages/               # Routes (auto-generated)
│   │   ├── index.vue           # Home page
│   │   ├── analyze.vue         # Code analysis page
│   │   └── chat.vue            # Chat interface page
│   └── assets/              # Styles and static assets
├── server/                   # Nitro server (API)
│   ├── api/                 # REST endpoints
│   │   ├── analyze.post.ts     # Code analysis endpoint
│   │   ├── chat.post.ts        # Chat endpoint
│   │   └── health.get.ts       # Health check
│   └── utils/               # Server utilities
│       └── codeParser.ts       # Code parsing logic
├── Tasks/                    # Structured task documentation
│   ├── 01-setup/            # Phase 1: Project setup
│   ├── 02-code-analysis/    # Phase 2: Analysis features
│   ├── 03-chatbot/          # Phase 3: Chat interface
│   └── 04-final-polish/     # Phase 4: Documentation
├── .mcp.json                # MCP server configuration
├── CLAUDE.md                # AI assistant behavior rules
├── CONTEXT.md               # Project architecture guide
├── USAGE.md                 # Usage documentation
└── README.md                # This file
```

---

## Usage

### 1. Analyze Code

1. Navigate to [/analyze](http://localhost:3000/analyze)
2. Upload a code file or paste code
3. Select the language
4. Click "Analyze Code"
5. View comprehensive metrics and analysis

### 2. Chat About Code

**From Analysis:**
1. After analyzing code, click "Chat about this code"
2. Ask questions in the chat interface
3. Get AI-powered explanations with code context

**Standalone Chat:**
1. Navigate to [/chat](http://localhost:3000/chat)
2. Start asking questions about code
3. Upload code first for better context

### 3. API Endpoints

#### Analyze Code
```bash
POST /api/analyze
Content-Type: application/json

{
  "code": "function hello() { console.log('Hi'); }",
  "language": "javascript",
  "filePath": "example.js"
}
```

#### Chat
```bash
POST /api/chat
Content-Type: application/json

{
  "message": "What does this function do?",
  "conversationHistory": [],
  "codeContext": "function hello() {...}"
}
```

See [USAGE.md](USAGE.md) for detailed usage examples.

---

## MCP Integration

This project uses the **Model Context Protocol (MCP)** to integrate with Claude Teams.

### Current Status
- ✅ MCP configuration file (`.mcp.json`)
- ✅ API endpoints ready for MCP
- ⏳ Real MCP integration (currently simulated)

### To Enable Real MCP:
1. Build the project: `pnpm build`
2. Start MCP server: `node .output/server/index.mjs`
3. Connect Claude Teams to MCP server
4. Replace simulated responses in `server/api/chat.post.ts`

See [USAGE.md](USAGE.md) for detailed MCP setup instructions.

---

## Development Workflow

This project follows structured AI-assisted development:

### Task-Based Development
- Tasks organized in `Tasks/` folder by phase
- Each task = one focused objective
- Git commits at task boundaries
- Clean rollback points

### Phases Completed
- ✅ **Phase 1**: Project Setup & Configuration
- ✅ **Phase 2**: Code Analysis Engine
- ✅ **Phase 3**: Interactive Chatbot
- ✅ **Phase 4**: Documentation & Polish

### AI Assistant
- Follows rules in [CLAUDE.md](CLAUDE.md)
- Task-driven development
- Structured commit messages
- Documentation-first approach

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Manual Build

```bash
# Build for production
pnpm build

# Preview locally
pnpm preview

# Deploy .output/ directory to your hosting provider
```

---

## Environment Variables

No environment variables required for basic functionality. For MCP integration:

```env
# Optional: MCP Server Configuration
MCP_SERVER_URL=http://localhost:3001
NODE_ENV=production
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow task structure in `Tasks/`
4. Commit at task boundaries
5. Push and create a Pull Request

---

## Roadmap

### Completed ✅
- [x] Project setup and foundation
- [x] Code analysis with metrics
- [x] Interactive chat interface
- [x] Context-aware conversations
- [x] Professional UI/UX

### Future Enhancements
- [ ] Real-time MCP integration with Claude Teams
- [ ] GitHub PR integration
- [ ] Syntax highlighting for code blocks
- [ ] Export analysis reports
- [ ] Multi-file analysis
- [ ] Custom analysis rules
- [ ] Team collaboration features

---

## Maintainer

**Athira** - [@AthiraAtXogo](https://github.com/AthiraAtXogo)

Repository: [Code-Review-Assistant](https://github.com/AthiraAtXogo/Code-Review-Assistant)

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

## Acknowledgments

- Built with [Nuxt 4](https://nuxt.com/)
- Powered by [Claude AI](https://www.anthropic.com/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)

---

**Need help?** Check out [USAGE.md](USAGE.md) or open an issue on GitHub.
