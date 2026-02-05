# Task 01: Chat UI Component

## Objective

Create a Vue component for the chat interface with message display and input.

## Steps

1. **Create ChatInterface component**
   - File: `app/components/ChatInterface.vue`
   - Message list with scroll
   - User vs assistant message styling
   - Input field with submit button

2. **Message structure**
   - User messages: right-aligned, blue background
   - Assistant messages: left-aligned, gray background
   - Timestamp display
   - Code block support (pre/code tags)

3. **Input handling**
   - Text area for message input
   - Submit button
   - Enter key to send (Shift+Enter for new line)
   - Disable while loading

4. **Loading states**
   - Show typing indicator when waiting for response
   - Disable input during response
   - Auto-scroll to latest message

## Component Structure

```vue
<script setup lang="ts">
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Props {
  messages: Message[]
  loading?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  send: [message: string]
}>()

const input = ref('')
const messagesContainer = ref<HTMLElement>()

function handleSend() {
  if (!input.value.trim() || props.loading) return
  emit('send', input.value)
  input.value = ''
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}

watch(() => props.messages.length, () => {
  nextTick(() => {
    messagesContainer.value?.scrollTo({
      top: messagesContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  })
})
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Messages -->
    <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
      <div
        v-for="message in messages"
        :key="message.id"
        class="flex"
        :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-[80%] rounded-lg p-4"
          :class="
            message.role === 'user'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-900'
          "
        >
          <div class="whitespace-pre-wrap" v-html="formatMessage(message.content)" />
          <div
            class="text-xs mt-2 opacity-70"
            :class="message.role === 'user' ? 'text-right' : 'text-left'"
          >
            {{ formatTime(message.timestamp) }}
          </div>
        </div>
      </div>

      <!-- Loading indicator -->
      <div v-if="loading" class="flex justify-start">
        <div class="bg-gray-100 rounded-lg p-4">
          <div class="flex space-x-2">
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
          </div>
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="border-t border-gray-200 p-4">
      <div class="flex space-x-2">
        <textarea
          v-model="input"
          @keydown="handleKeydown"
          :disabled="loading"
          placeholder="Ask a question about your code..."
          class="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
          rows="2"
        />
        <button
          @click="handleSend"
          :disabled="!input.trim() || loading"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>
```

## Helper Functions

```typescript
function formatMessage(content: string): string {
  // Replace code blocks with syntax-highlighted HTML
  return content.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre class="bg-gray-800 text-white p-3 rounded mt-2 overflow-x-auto"><code>${escapeHtml(code)}</code></pre>`
  })
}

function formatTime(date: Date): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}
```

## Expected Outcome

- Functional chat interface
- Clean message display
- Smooth scrolling
- Loading states
- Keyboard shortcuts

## Testing

1. Add some test messages
2. Try sending messages
3. Check loading state
4. Test keyboard shortcuts (Enter, Shift+Enter)
5. Verify auto-scroll

## Commit Message

```
feat(chat): add chat interface component

- Create ChatInterface.vue component
- Add message display with user/assistant styling
- Add input with keyboard shortcuts
- Add loading indicator with typing animation
- Add auto-scroll to latest message
- Support code blocks in messages

Task 01: Chat UI - Phase 3

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```
