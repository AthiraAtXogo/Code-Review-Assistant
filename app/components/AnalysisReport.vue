<script setup lang="ts">
interface Props {
  analysis: {
    metadata: {
      language: string
      lines: number
      characters: number
      blank: number
      comments: number
      functions?: number
      imports?: number
      exports?: number
      classes?: number
      complexity?: 'low' | 'medium' | 'high'
      filePath?: string
    }
    code: string
    timestamp: string
  }
}

const props = defineProps<Props>()

const complexityColor = computed(() => {
  switch (props.analysis.metadata.complexity) {
    case 'low':
      return 'text-green-600 bg-green-50 border-green-200'
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'high':
      return 'text-red-600 bg-red-50 border-red-200'
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200'
  }
})

const commentRatio = computed(() => {
  const total = props.analysis.metadata.lines - props.analysis.metadata.blank
  if (total === 0) return 0
  return Math.round((props.analysis.metadata.comments / total) * 100)
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="border-b border-gray-200 pb-4">
      <h2 class="text-2xl font-semibold text-gray-900">Analysis Report</h2>
      <p class="text-sm text-gray-500 mt-1">
        {{ analysis.metadata.language }} •
        {{ new Date(analysis.timestamp).toLocaleString() }}
      </p>
      <p v-if="analysis.metadata.filePath" class="text-xs text-gray-400 mt-1">
        {{ analysis.metadata.filePath }}
      </p>
    </div>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <!-- Lines -->
      <div class="border border-gray-200 rounded-lg p-4">
        <div class="text-sm text-gray-600 mb-1">Lines of Code</div>
        <div class="text-2xl font-semibold text-gray-900">
          {{ analysis.metadata.lines }}
        </div>
        <div class="text-xs text-gray-500 mt-1">
          {{ analysis.metadata.blank }} blank
        </div>
      </div>

      <!-- Comments -->
      <div class="border border-gray-200 rounded-lg p-4">
        <div class="text-sm text-gray-600 mb-1">Comments</div>
        <div class="text-2xl font-semibold text-gray-900">
          {{ analysis.metadata.comments }}
        </div>
        <div class="text-xs text-gray-500 mt-1">{{ commentRatio }}% ratio</div>
      </div>

      <!-- Functions -->
      <div class="border border-gray-200 rounded-lg p-4">
        <div class="text-sm text-gray-600 mb-1">Functions</div>
        <div class="text-2xl font-semibold text-gray-900">
          {{ analysis.metadata.functions || 0 }}
        </div>
        <div class="text-xs text-gray-500 mt-1">detected</div>
      </div>

      <!-- Complexity -->
      <div class="border border-gray-200 rounded-lg p-4">
        <div class="text-sm text-gray-600 mb-1">Complexity</div>
        <div
          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border"
          :class="complexityColor"
        >
          {{ analysis.metadata.complexity || 'N/A' }}
        </div>
      </div>
    </div>

    <!-- Additional Metrics -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <!-- Imports -->
      <div class="border border-gray-200 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-gray-600">Imports</div>
            <div class="text-xl font-semibold text-gray-900 mt-1">
              {{ analysis.metadata.imports || 0 }}
            </div>
          </div>
          <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
            />
          </svg>
        </div>
      </div>

      <!-- Exports -->
      <div class="border border-gray-200 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-gray-600">Exports</div>
            <div class="text-xl font-semibold text-gray-900 mt-1">
              {{ analysis.metadata.exports || 0 }}
            </div>
          </div>
          <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
      </div>

      <!-- Classes -->
      <div class="border border-gray-200 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-gray-600">Classes</div>
            <div class="text-xl font-semibold text-gray-900 mt-1">
              {{ analysis.metadata.classes || 0 }}
            </div>
          </div>
          <svg class="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Code Preview -->
    <div class="border border-gray-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-3">Code Preview</h3>
      <pre
        class="bg-gray-50 p-4 rounded overflow-x-auto text-sm font-mono text-gray-800 border border-gray-200"
      ><code>{{ analysis.code }}</code></pre>
    </div>
  </div>
</template>
