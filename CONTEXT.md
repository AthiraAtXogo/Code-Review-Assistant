# Project Context

## Project Overview

**Code Review Assistant** - AI-powered code analysis and explanation tool combining automated code review with an interactive chatbot to help developers understand codebases and maintain quality standards.

## Project Structure

- **Source code**: `app/` (Nuxt application layer), `server/` (Nitro API)
- **Tests**: `tests/` (to be created)
- **Config files**: `nuxt.config.ts`, `tsconfig.json`, `.eslintrc.js`
- **Generated artifacts**: `.nuxt/`, `.output/`, `dist/`

## Language & Tooling

- **Language**: TypeScript
- **Framework**: Vue 3 + Nuxt 4
- **Build**: `pnpm build`
- **Test**: `pnpm test` (to be configured)
- **Dev**: `pnpm dev`
- **Package manager**: pnpm 9+

## Build & Test Entry Points

These are the approved commands. Do not invent alternatives.

- **Dev server**: `pnpm dev`
- **Build**: `pnpm build`
- **Preview**: `pnpm preview`
- **Test**: `pnpm test` (Vitest - to be configured)
- **Lint**: `pnpm lint`
- **Typecheck**: `pnpm typecheck`

## Architecture

### Tech Stack
- **Frontend**: Vue 3 (Composition API), Nuxt 4, TailwindCSS
- **Backend**: Nitro server (Nuxt server layer)
- **AI**: Claude Teams via MCP (Model Context Protocol)
- **Analysis**: ESLint integration + AI-powered review
- **Database**: PostgreSQL (Phase 2+), Redis for caching (Phase 3+)
- **Deploy**: Vercel or Netlify
- **Integration**: MCP for Claude Teams communication

### Folder Structure
```
app/
  ├── components/       # Vue components (ChatInterface, CodeViewer, etc.)
  ├── composables/      # Composables (useCodeAnalysis, useChatbot, etc.)
  ├── pages/            # Nuxt pages (routes)
  ├── layouts/          # Layout components
  └── assets/           # Styles, images

server/
  ├── api/              # API endpoints
  │   ├── analyze.post.ts    # Code analysis endpoint
  │   └── explain.post.ts    # Code explanation endpoint
  ├── mcp/              # MCP server and tools
  │   └── tools.ts           # MCP tool definitions
  └── utils/            # Server utilities (parsers, formatters)

Tasks/                  # Structured task breakdowns
  ├── 01-setup/         # Foundation setup
  ├── 02-code-analysis/ # Analysis engine
  ├── 03-chatbot/       # Chat interface
  └── 04-integration/   # Connect services
```

## Task Management

Tasks are stored under `Tasks/{FeatureName}/` with numbered task files.
See `.claude/commands/brain.md` for the BRAIN workflow.

Each task file represents one unit of work with clean git commits at boundaries.

## Constraints

1. **AI Integration**: Uses Claude Teams via MCP (no API key needed)
2. **Node version**: Node.js 18+ required
3. **Deployment**: Requires Claude Code running for MCP communication
4. **Phase 1 scope**: Focus on MVP (file upload, analysis, explanation) before GitHub integration
5. **Security**: No file system writes from user input; sanitize all code before processing
6. **Primary user**: Tool designed for personal use with Claude Teams subscription

## Development Phases

**Current Phase**: Phase 1 - MVP Foundation

- Phase 1: File analysis + chatbot (local files)
- Phase 2: GitHub PR integration
- Phase 3: Vector DB + codebase context
- Phase 4: Multi-user + team features

## External Dependencies

- Claude Teams (via MCP)
- ESLint (code analysis)
- Nuxt UI (component library - optional)
- Vue Router (included with Nuxt)
