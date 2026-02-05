# Task 04: Integration & Polish

## Objective

Polish the chat feature, add proper MCP connection, and finalize Phase 3.

## Steps

1. **Complete MCP integration**
   - Replace simulated response with real MCP call
   - Test with Claude Teams
   - Handle streaming responses (optional)

2. **Add navigation**
   - Update home page with chat link
   - Add chat to navigation if exists
   - Breadcrumbs for better UX

3. **Polish UI**
   - Smooth transitions
   - Better loading states
   - Responsive design
   - Accessibility improvements

4. **Error handling**
   - Network errors
   - MCP connection failures
   - Empty states
   - User-friendly messages

5. **Add features**
   - Clear conversation button
   - Copy code snippets from messages
   - Export conversation (optional)
   - Rate limiting (optional)

## MCP Integration

Replace simulation in `server/api/chat.post.ts`:

```typescript
// Real MCP integration
import { MCPClient } from '../utils/mcpClient' // Create this utility

async function getMCPResponse(messages: any[]): Promise<string> {
  const client = new MCPClient({
    serverUrl: process.env.MCP_SERVER_URL || 'http://localhost:3001'
  })

  try {
    const response = await client.chat({
      messages,
      model: 'claude-sonnet-4.5'
    })

    return response.content
  } catch (error) {
    throw new Error('Failed to connect to MCP server')
  }
}
```

## Update Home Page

Add chat CTA:

```vue
<!-- In app/pages/index.vue -->
<div class="grid md:grid-cols-2 gap-4 mt-8">
  <NuxtLink
    to="/analyze"
    class="p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
  >
    <h3 class="text-xl font-semibold text-gray-900 mb-2">Code Analysis</h3>
    <p class="text-gray-600">Upload code to analyze metrics and quality</p>
  </NuxtLink>

  <NuxtLink
    to="/chat"
    class="p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
  >
    <h3 class="text-xl font-semibold text-gray-900 mb-2">Code Chat</h3>
    <p class="text-gray-600">Ask questions and get AI-powered explanations</p>
  </NuxtLink>
</div>
```

## Polish Checklist

- [ ] MCP connection working
- [ ] Error handling complete
- [ ] Loading states polished
- [ ] Responsive design
- [ ] Keyboard shortcuts
- [ ] Accessibility (ARIA labels)
- [ ] Navigation improved
- [ ] Empty states handled
- [ ] Code snippets formatted
- [ ] Smooth animations

## Testing

1. Test complete flow: analyze → chat
2. Test standalone chat
3. Test error cases
4. Test on mobile/tablet
5. Test keyboard navigation
6. Test with real MCP server

## Expected Outcome

- Fully functional chat feature
- Connected to Claude Teams via MCP
- Professional UI/UX
- Complete error handling
- Phase 3 complete

## Commit Message

```
feat(chat): complete Phase 3 - Chatbot Integration

- Add real MCP integration for chat
- Polish chat UI with animations
- Add navigation links to home page
- Add error handling and loading states
- Add clear conversation feature
- Improve responsive design
- Complete Phase 3 - Chatbot Interface

Task 04: Integration & Polish - Phase 3

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```
