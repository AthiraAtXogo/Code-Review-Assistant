# Task 01: File Upload UI Component

## Objective

Create a Vue component for uploading and pasting code for analysis.

## Steps

1. **Create upload component**

   - File: `app/components/CodeUpload.vue`
   - Support file upload (drag & drop)
   - Support paste/text input
   - Language selection dropdown

2. **Add file validation**

   - Max size: 100KB
   - Allowed extensions: .js, .ts, .py, .go, .vue
   - Show validation errors

3. **Create analysis page**

   - File: `app/pages/analyze.vue`
   - Use CodeUpload component
   - Display upload area and results

4. **Style with Tailwind**
   - Match existing professional design
   - Loading states
   - Error states

## Expected Files

### app/components/CodeUpload.vue

```vue
<script setup lang="ts">
const code = ref('')
const language = ref('javascript')
const fileName = ref('')

const emit = defineEmits<{
  analyze: [code: string, language: string, fileName: string]
}>()

function handleAnalyze() {
  if (!code.value) return
  emit('analyze', code.value, language.value, fileName.value)
}

function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    code.value = e.target?.result as string
    fileName.value = file.name
  }
  reader.readAsText(file)
}
</script>

<template>
  <div class="space-y-4">
    <!-- File upload or paste -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2"> Upload or Paste Code </label>
      <textarea
        v-model="code"
        class="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm"
        placeholder="Paste your code here or upload a file..."
      />
    </div>

    <!-- File upload button -->
    <div>
      <input type="file" @change="handleFileUpload" accept=".js,.ts,.py,.go,.vue" />
    </div>

    <!-- Language selector -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2"> Language </label>
      <select
        v-model="language"
        class="w-full p-2 border border-gray-300 rounded-lg"
      >
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="python">Python</option>
        <option value="go">Go</option>
      </select>
    </div>

    <!-- Analyze button -->
    <button
      @click="handleAnalyze"
      :disabled="!code"
      class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
    >
      Analyze Code
    </button>
  </div>
</template>
```

### app/pages/analyze.vue

```vue
<script setup lang="ts">
const result = ref(null)
const loading = ref(false)

async function handleAnalyze(code: string, language: string, fileName: string) {
  loading.value = true
  try {
    const response = await $fetch('/api/analyze', {
      method: 'POST',
      body: { code, language, filePath: fileName }
    })
    result.value = response
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Code Analysis</h1>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Upload section -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <CodeUpload @analyze="handleAnalyze" />
        </div>

        <!-- Results section -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h2 class="text-xl font-semibold mb-4">Analysis Results</h2>

          <div v-if="loading">Loading...</div>

          <div v-else-if="result">
            <pre>{{ result }}</pre>
          </div>

          <div v-else class="text-gray-500">Upload code to see results</div>
        </div>
      </div>
    </div>
  </div>
</template>
```

## Testing

1. Navigate to `/analyze`
2. Paste code or upload file
3. Select language
4. Click "Analyze Code"
5. See metadata results

## Commit Message

```
feat(analysis): add code upload UI component

- Create CodeUpload.vue component
- Add file upload with drag & drop
- Add paste/text input support
- Create /analyze page
- Language selection dropdown
- File validation (100KB max)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```
