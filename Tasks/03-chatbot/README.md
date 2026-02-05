# Phase 3: Interactive Code Chatbot

## Overview

Build an interactive chatbot interface that allows users to ask questions about code and get AI-powered explanations.

## Tasks

| #   | Task                | Description                              | Files                                        |
| --- | ------------------- | ---------------------------------------- | -------------------------------------------- |
| 01  | Chat UI             | Vue chat component with message display  | `app/components/ChatInterface.vue`           |
| 02  | MCP Integration     | Connect to Claude Teams via MCP          | `server/api/chat.post.ts`                    |
| 03  | Code Context        | Share analyzed code context with chat    | `app/pages/analyze.vue`, `app/pages/chat.vue`|
| 04  | Integration         | Polish and connect everything            | Update all pages                             |

## Features

### Chat Interface

- Message input with submit button
- Message history display
- User/assistant message differentiation
- Loading states during AI responses
- Code block rendering in messages

### MCP Integration

- Server-side chat endpoint
- Context preservation across messages
- Error handling
- Response streaming (optional)

### Code Context

- Share analysis results with chat
- Reference code snippets in conversation
- Maintain context between analysis and chat

## Architecture

```
User → Chat UI → /api/chat → MCP Server → Claude Teams → Response
                    ↑
                    └─ Code Context (from analysis)
```

## Progress

Track in [Status.md](Status.md)

## Next Phase

Phase 4: Final Polish & Deployment
