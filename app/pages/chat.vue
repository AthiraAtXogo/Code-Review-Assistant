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

// Get code context from route query
const codeContext = computed(() => {
  if (route.query.code) {
    try {
      return {
        code: decodeURIComponent(route.query.code as string),
        language: route.query.language as string,
        analysis: route.query.analysis ? JSON.parse(route.query.analysis as string) : null
      }
    } catch (e) {
      return null
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
      content: `I can see you've uploaded **${codeContext.value.language}** code with **${codeContext.value.analysis?.lines || '?'} lines** of code.

The code has:
- Complexity: **${codeContext.value.analysis?.complexity || 'unknown'}**
- Functions: **${codeContext.value.analysis?.functions || 0}**
- Comments: **${codeContext.value.analysis?.comments || 0}**

What would you like to know about it?`,
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
        conversationHistory: messages.value.map((m) => ({
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
    // Remove the user message on error
    messages.value.pop()
  } finally {
    loading.value = false
  }
}

function clearConversation() {
  if (confirm('Are you sure you want to clear this conversation?')) {
    const hasContext = codeContext.value !== null
    messages.value = []

    // Re-add initial message if there's code context
    if (hasContext && codeContext.value) {
      messages.value.push({
        id: Date.now().toString(),
        role: 'assistant',
        content: `I can see you've uploaded **${codeContext.value.language}** code with **${codeContext.value.analysis?.lines || '?'} lines** of code.

The code has:
- Complexity: **${codeContext.value.analysis?.complexity || 'unknown'}**
- Functions: **${codeContext.value.analysis?.functions || 0}**
- Comments: **${codeContext.value.analysis?.comments || 0}**

What would you like to know about it?`,
        timestamp: new Date()
      })
    }

    error.value = ''
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
              Chatting about {{ codeContext.language }} code ({{ codeContext.analysis?.lines }} lines)
            </p>
            <p v-else class="text-sm text-gray-600 mt-1">Ask questions about code</p>
          </div>
          <div class="flex items-center space-x-4">
            <button
              v-if="messages.length > 0"
              @click="clearConversation"
              class="text-gray-600 hover:text-gray-900 text-sm"
            >
              Clear
            </button>
            <NuxtLink to="/analyze" class="text-blue-600 hover:text-blue-700 text-sm">
              {{ codeContext ? 'Back to Analysis' : 'Analyze Code' }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Error message -->
      <div v-if="error" class="bg-red-50 border-b border-red-200 p-4">
        <div class="flex items-center justify-between">
          <p class="text-red-800 text-sm">{{ error }}</p>
          <button @click="error = ''" class="text-red-600 hover:text-red-800">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Chat interface -->
      <div class="flex-1 bg-white overflow-hidden">
        <ChatInterface :messages="messages" :loading="loading" @send="handleSend" />
      </div>
    </div>
  </div>
</template>
