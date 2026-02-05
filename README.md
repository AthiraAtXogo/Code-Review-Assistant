# Code Review Assistant

AI-powered code review and explanation tool that helps developers understand codebases and maintain quality standards.

---

## Overview

**Code Review Assistant** combines automated code analysis with an interactive AI chatbot to:

1. **Review Code** - Analyze pull requests, files, or snippets for quality, security, and best practices
2. **Explain Code** - Answer questions about codebases, logic, and implementation details
3. **Assist Teams** - Help developers understand unfamiliar code and enforce standards

Built with Vue 3, Nuxt, and Claude AI for intelligent code understanding.

---

## Features

### Current (Phase 1 - MVP)

- File/snippet code analysis
- AI-powered quality & security review
- Interactive chatbot for code questions
- Markdown-formatted reports
- Local file system integration

### Planned

- **Phase 2**: GitHub PR integration, inline comments, webhooks
- **Phase 3**: Codebase-wide context (RAG), custom rules, convention learning
- **Phase 4**: Multi-user support, analytics, team workspaces

---

## Tech Stack

| Layer    | Technology                  |
| -------- | --------------------------- |
| Frontend | Vue 3 + Nuxt 4              |
| Backend  | Nitro (Nuxt server)         |
| AI       | Anthropic Claude API        |
| Analysis | ESLint + AI-powered review  |
| Storage  | PostgreSQL + Redis (future) |
| Deploy   | Vercel/Netlify              |

---

## Project Structure

```
code-review-assistant/
├── app/                    # Nuxt application layer
│   ├── components/        # Vue components
│   ├── composables/       # Composables (API, state)
│   ├── pages/             # Routes
│   └── assets/            # Styles, images
├── server/                # Nitro server (API routes)
│   ├── api/              # REST endpoints
│   └── utils/            # Server utilities
├── Tasks/                 # Structured task breakdowns
├── .claude/              # AI assistant configuration
├── CLAUDE.md             # AI behavior rules
└── CONTEXT.md            # Project structure guide
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9+
- Anthropic API key

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env

# Run development server
pnpm dev

# Build for production
pnpm build
```

### Development Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run linter
pnpm typecheck    # Check TypeScript types
```

---

## Usage

### Code Review

1. Upload a file or paste code snippet
2. Click "Analyze"
3. View quality, security, and style feedback

### Code Explanation

1. Open chat interface
2. Ask questions about the code
3. Get detailed explanations with context

---

## Development Workflow

This project follows structured AI-assisted development:

1. **Tasks** are broken down in `Tasks/` folder
2. Each task = one focused objective
3. **Git commits at task boundaries** for clean rollback
4. AI assistant follows rules in `CLAUDE.md`

See [CONTEXT.md](CONTEXT.md) for architecture details.

---

## Contributing

1. Check existing tasks in `Tasks/`
2. Create new task files for features
3. Follow commit conventions (see `CLAUDE.md`)
4. Test locally before pushing

---

## Maintainer

**Athira** - [@AthiraAtXogo](https://github.com/AthiraAtXogo)

Repository: https://github.com/AthiraAtXogo/Code-Review-Assistant

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

## Roadmap

- [x] Project setup and foundation
- [ ] MVP: File analysis + chatbot
- [ ] GitHub PR integration
- [ ] Vector database for codebase context
- [ ] Team features and analytics

See `Tasks/` folder for detailed task breakdown.
