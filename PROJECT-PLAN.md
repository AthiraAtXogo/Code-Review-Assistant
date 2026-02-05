# Code Review Assistant - Project Plan

## Project Overview

**Goal**: Build an AI-powered code review and explanation tool that helps developers understand codebases and maintain quality standards.

**Repository**: https://github.com/AthiraAtXogo/Code-Review-Assistant

---

## Tech Stack

- **Frontend**: Vue 3 + Nuxt 4
- **Backend**: Nitro (Nuxt server)
- **AI**: Anthropic Claude API
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **Deploy**: Vercel or Netlify
- **Package Manager**: pnpm 9+

---

## Development Phases

### Phase 1: MVP Foundation (Current)

**Goal**: Basic working application with core features

**Features**:

- File/snippet upload and analysis
- AI-powered code review (quality, security, style)
- Interactive chatbot for code questions
- Markdown-formatted reports
- Local development environment

**Tasks**: See `Tasks/01-setup/` through `Tasks/04-integration/`

---

### Phase 2: GitHub Integration (Future)

**Features**:

- GitHub App setup + OAuth
- PR review automation
- Inline PR comments
- Webhook integration
- Repository browsing

---

### Phase 3: Advanced Intelligence (Future)

**Features**:

- Vector database integration (Pinecone/Weaviate)
- Codebase-wide semantic search
- Custom rule engine
- Team convention learning
- Historical pattern recognition

---

### Phase 4: Team Features (Future)

**Features**:

- Multi-user authentication
- Team workspaces
- Analytics dashboard
- Review templates
- Slack/Discord notifications

---

## Task Structure

Tasks are organized in `Tasks/` with the following structure:

```
Tasks/
├── 01-setup/              ✅ Project initialization
│   ├── CONTEXT.md         # Feature context
│   ├── Status.md          # Progress tracking
│   ├── 01-nuxt-init.md
│   ├── 02-claude-api-setup.md
│   ├── 03-project-structure.md
│   └── 04-config-tooling.md
├── 02-code-analysis/      ⏳ Analysis engine
├── 03-chatbot/            ⏳ Chat interface
└── 04-integration/        ⏳ Connect & polish
```

---

## Current Status: Phase 1

### Next Steps

1. **Start Task 01-setup/01-nuxt-init.md**
   - Initialize Nuxt 4 project
   - Install dependencies
   - Configure basics

2. **Complete remaining setup tasks** (02-04)
   - Claude API integration
   - Project structure
   - Tooling configuration

3. **Move to code analysis feature** (Tasks/02-code-analysis/)

4. **Build chatbot interface** (Tasks/03-chatbot/)

5. **Integrate and polish** (Tasks/04-integration/)

---

## Architecture

```
┌─────────────┐
│  Vue 3 UI   │ (Chat + Code Viewer + Upload)
└──────┬──────┘
       │
┌──────▼──────────────────────┐
│   Nuxt/Nitro API Layer      │
├─────────────┬────────────────┤
│ /api/analyze│  /api/chat     │
└──────┬──────┴────────┬───────┘
       │               │
┌──────▼──────┐ ┌─────▼──────┐
│  Analysis   │ │   Chat     │
│  Service    │ │  Service   │
│  (ESLint +  │ │  (Claude)  │
│   Claude)   │ │            │
└─────────────┘ └────────────┘
```

---

## Key Decisions

1. **Vue 3 over React**: Better Nuxt integration, composition API preferred
2. **Vercel deployment**: Serverless functions for API routes, edge network
3. **Phase 1 scope**: Focus on core features before GitHub integration
4. **No database in Phase 1**: Session-based storage, add DB in Phase 2
5. **Claude API**: Best for code understanding vs GPT-4

---

## Success Metrics (Phase 1)

- [ ] Dev environment runs without errors
- [ ] Can upload and analyze code files
- [ ] Receives meaningful AI-generated reviews
- [ ] Chat interface responds to code questions
- [ ] Code snippets display with syntax highlighting
- [ ] Deployment to Vercel/Netlify successful
- [ ] Documentation complete

---

## Getting Started

```bash
# See Tasks/01-setup/01-nuxt-init.md
pnpm dlx nuxi@latest init .
pnpm install
pnpm dev
```

Follow task files in order for detailed implementation steps.
