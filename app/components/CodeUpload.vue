<script setup lang="ts">
const code = ref('')
const language = ref('javascript')
const fileName = ref('')
const fileInput = ref<HTMLInputElement>()

const emit = defineEmits<{
  analyze: [code: string, language: string, fileName: string]
}>()

function handleAnalyze() {
  if (!code.value.trim()) return
  emit('analyze', code.value, language.value, fileName.value)
}

function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  // Check file size (100KB = 102400 bytes)
  if (file.size > 102400) {
    alert('File too large. Maximum size is 100KB')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    code.value = e.target?.result as string
    fileName.value = file.name

    // Auto-detect language from file extension
    const ext = file.name.split('.').pop()?.toLowerCase()
    if (ext === 'ts') language.value = 'typescript'
    else if (ext === 'py') language.value = 'python'
    else if (ext === 'go') language.value = 'go'
    else if (ext === 'js' || ext === 'jsx') language.value = 'javascript'
    else if (ext === 'vue') language.value = 'vue'
  }
  reader.readAsText(file)
}

function clearCode() {
  code.value = ''
  fileName.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- File info -->
    <div v-if="fileName" class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span class="text-sm font-medium text-blue-900">{{ fileName }}</span>
      </div>
      <button
        @click="clearCode"
        class="text-blue-600 hover:text-blue-800"
        type="button"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Code input -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2"> Code </label>
      <textarea
        v-model="code"
        class="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Paste your code here..."
      />
    </div>

    <!-- File upload button -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2"> Or Upload File </label>
      <input
        ref="fileInput"
        type="file"
        @change="handleFileUpload"
        accept=".js,.ts,.jsx,.tsx,.py,.go,.vue"
        class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <p class="mt-1 text-xs text-gray-500">
        Supported: .js, .ts, .py, .go, .vue (max 100KB)
      </p>
    </div>

    <!-- Language selector -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2"> Language </label>
      <select
        v-model="language"
        class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="python">Python</option>
        <option value="go">Go</option>
        <option value="vue">Vue</option>
      </select>
    </div>

    <!-- Analyze button -->
    <button
      @click="handleAnalyze"
      :disabled="!code.trim()"
      class="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
    >
      Analyze Code
    </button>
  </div>
</template>
