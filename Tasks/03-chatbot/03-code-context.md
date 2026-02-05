# Task 03: Code Context Integration

## Objective

Connect the analysis feature with the chat interface to share code context.

## Steps

1. **Create chat page**
   - File: `app/pages/chat.vue`
   - Use ChatInterface component
   - Manage conversation state
   - Handle API calls

2. **Add "Chat" button to analysis page**
   - In AnalysisReport component
   - Opens chat with code context
   - Passes analyzed code and metadata

3. **State management**
   - Store analyzed code in session
   - Pass to chat page via navigation
   - Include in API requests

4. **Context structure**
   ```typescript
   interface CodeContext {
     code: string
     language: string
     analysis: {
       lines: number
       complexity: string
       // ... other metrics
     }
   }
   ```

## Chat Page Implementation

```vue
<!-- app/pages/chat.vue -->
<script setup lang="ts">
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const route = useRoute()
const messages = ref<Message[]>([])
const loading = ref(false)
const error = ref('')

// Get code context from route query or state
const codeContext = computed(() => {
  if (route.query.code) {
    return {
      code: route.query.code as string,
      language: route.query.language as string,
      analysis: route.query.analysis ? JSON.parse(route.query.analysis as string) : null
    }
  }
  return null
})

// Add initial system message if context exists
onMounted(() => {
  if (codeContext.value) {
    messages.value.push({
      id: Date.now().toString(),
      role: 'assistant',
      content: `I can see you've uploaded ${codeContext.value.language} code with ${codeContext.value.analysis?.lines || '?'} lines. What would you like to know about it?`,
      timestamp: new Date()
    })
  }
})

async function handleSend(message: string) {
  // Add user message
  const userMessage: Message = {
    id: Date.now().toString(),
    role: 'user',
    content: message,
    timestamp: new Date()
  }
  messages.value.push(userMessage)

  loading.value = true
  error.value = ''

  try {
    const response = await $fetch('/api/chat', {
      method: 'POST',
      body: {
        message,
        conversationHistory: messages.value.map(m => ({
          role: m.role,
          content: m.content
        })),
        codeContext: codeContext.value?.code
      }
    })

    // Add assistant response
    messages.value.push({
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.message,
      timestamp: new Date()
    })
  } catch (err: any) {
    error.value = err.message || 'Failed to send message'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-5xl mx-auto h-screen flex flex-col">
      <!-- Header -->
      <div class="bg-white border-b border-gray-200 p-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Code Chat</h1>
            <p v-if="codeContext" class="text-sm text-gray-600 mt-1">
              Chatting about {{ codeContext.language }} code
            </p>
          </div>
          <NuxtLink
            to="/analyze"
            class="text-blue-600 hover:text-blue-700"
          >
            Back to Analysis
          </NuxtLink>
        </div>
      </div>

      <!-- Error message -->
      <div v-if="error" class="bg-red-50 border-b border-red-200 p-4">
        <p class="text-red-800 text-sm">{{ error }}</p>
      </div>

      <!-- Chat interface -->
      <div class="flex-1 bg-white">
        <ChatInterface
          :messages="messages"
          :loading="loading"
          @send="handleSend"
        />
      </div>
    </div>
  </div>
</template>
```

## Update AnalysisReport Component

Add "Chat" button:

```vue
<!-- In AnalysisReport.vue, add after metrics -->
<div class="border-t border-gray-200 pt-4">
  <NuxtLink
    :to="{
      path: '/chat',
      query: {
        code: analysis.code,
        language: analysis.metadata.language,
        analysis: JSON.stringify(analysis.metadata)
      }
    }"
    class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
  >
    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
    Chat about this code
  </NuxtLink>
</div>
```

## Expected Outcome

- Chat page with context awareness
- Smooth navigation from analysis to chat
- Code context passed correctly
- Conversation flows naturally

## Testing

1. Analyze code on `/analyze`
2. Click "Chat about this code" button
3. Verify context is passed
4. Send messages in chat
5. Verify responses include code context

## Commit Message

```
feat(chat): integrate code context with chat

- Create chat.vue page with ChatInterface
- Add conversation state management
- Pass code context from analysis to chat
- Add "Chat" button to AnalysisReport
- Include code context in API requests

Task 03: Code Context - Phase 3

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```
