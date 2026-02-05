# Task 02: Claude Teams Integration via MCP

## Objective
Integrate with Claude Teams subscription using MCP (Model Context Protocol) for code analysis and chat features.

**Architecture**: This tool will be used BY YOU via Claude Teams. No API keys needed - leverages your existing subscription.

## Steps

1. **Remove Anthropic SDK** (not needed for Teams)
   ```bash
   pnpm remove @anthropic-ai/sdk
   ```

2. **Create MCP server configuration**
   - Update `.mcp.json` with code review tools
   - Define tools for code analysis, explanation, review

3. **Create server endpoints for MCP tools**
   - File: `server/api/analyze.post.ts` - Analyze code endpoint
   - File: `server/api/explain.post.ts` - Explain code endpoint
   - These receive code, Claude Teams processes via MCP

4. **Create MCP tool handlers**
   - File: `server/mcp/tools.ts`
   - Export MCP tool definitions
   - Handle tool calls from Claude

5. **Test MCP integration**
   - Start dev server
   - Use Claude Code to call tools
   - Verify responses

## Expected Outcome
- No API keys needed (uses Claude Teams)
- MCP tools registered and callable
- Server endpoints ready for Claude interaction
- You can use Claude Code to analyze code via this app

## MCP Configuration

### .mcp.json
```json
{
  "mcpServers": {
    "code-review-assistant": {
      "command": "node",
      "args": ["server/mcp/server.js"],
      "env": {
        "PORT": "3001"
      }
    }
  }
}
```

### server/api/analyze.post.ts
```typescript
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { code, language } = body

  // This will be called BY Claude via MCP
  // Just process and return the code for Claude to analyze

  return {
    code,
    language,
    metadata: {
      lines: code.split('\n').length,
      size: code.length
    }
  }
})
```

## How It Works

1. **You run the Nuxt app**: `pnpm dev`
2. **Claude Teams connects via MCP**
3. **You ask Claude**: "Analyze this code file"
4. **Claude uses MCP tools** to call your endpoints
5. **Your app processes** code and returns to Claude
6. **Claude analyzes** and returns results to you

## Usage Flow

```
You → Claude Code → MCP → Your Nuxt App → Process Code → Claude → Results
```

## Testing
1. Start dev server: `pnpm dev`
2. In Claude Code, ask: "Use code-review-assistant to analyze [file]"
3. Claude will invoke MCP tools
4. Your app processes the request
5. Claude returns analysis

## Commit Message
```
feat(mcp): integrate with Claude Teams via MCP

- Remove Anthropic SDK (using Teams instead)
- Configure MCP server for code review tools
- Create endpoints for code analysis
- Set up tool handlers for Claude integration

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

## Notes
- This approach is simpler - no API management
- Leverages your existing Claude Teams subscription
- MCP provides structured tool calling
- You get full Claude Code integration
