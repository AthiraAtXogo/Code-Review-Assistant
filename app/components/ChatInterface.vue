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

function formatMessage(content: string): string {
  // Escape HTML first
  let escaped = content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Replace code blocks with syntax-highlighted HTML
  escaped = escaped.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre class="bg-gray-800 text-white p-3 rounded mt-2 overflow-x-auto text-sm"><code>${code.trim()}</code></pre>`
  })

  // Replace inline code
  escaped = escaped.replace(/`([^`]+)`/g, '<code class="bg-gray-200 px-1 py-0.5 rounded text-sm">$1</code>')

  return escaped
}

function formatTime(date: Date): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

watch(
  () => props.messages.length,
  () => {
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTo({
          top: messagesContainer.value.scrollHeight,
          behavior: 'smooth'
        })
      }
    })
  }
)
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Messages -->
    <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
      <!-- Empty state -->
      <div v-if="messages.length === 0" class="flex items-center justify-center h-full text-gray-500">
        <div class="text-center">
          <svg
            class="w-16 h-16 mx-auto mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <p>Start a conversation</p>
        </div>
      </div>

      <!-- Messages -->
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
          <div class="whitespace-pre-wrap break-words" v-html="formatMessage(message.content)" />
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
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s" />
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s" />
          </div>
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="border-t border-gray-200 p-4 bg-white">
      <div class="flex space-x-2">
        <textarea
          v-model="input"
          @keydown="handleKeydown"
          :disabled="loading"
          placeholder="Ask a question about your code..."
          class="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          rows="2"
        />
        <button
          @click="handleSend"
          :disabled="!input.trim() || loading"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Send
        </button>
      </div>
      <p class="text-xs text-gray-500 mt-2">Press Enter to send, Shift+Enter for new line</p>
    </div>
  </div>
</template>

<style scoped>
/* Ensure code blocks in messages have proper styling */
:deep(pre) {
  margin-top: 0.5rem;
  font-family: 'Courier New', monospace;
}

:deep(code) {
  font-family: 'Courier New', monospace;
}
</style>
