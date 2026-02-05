<script setup lang="ts">
const result = ref<any>(null)
const loading = ref(false)

async function handleAnalyze(code: string, language: string, fileName: string) {
  loading.value = true
  result.value = null

  try {
    const response = await $fetch('/api/analyze', {
      method: 'POST',
      body: { code, language, filePath: fileName }
    })
    result.value = response
  } catch (error: any) {
    console.error('Analysis failed:', error)
    alert('Failed to analyze code. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Header with back button -->
      <div class="mb-8">
        <NuxtLink
          to="/"
          class="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </NuxtLink>

        <h1 class="text-3xl font-bold text-gray-900">Code Analysis</h1>
        <p class="text-gray-600 mt-2">Upload or paste code to analyze its quality and metrics</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Upload section -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Upload Code</h2>
          <CodeUpload @analyze="handleAnalyze" />
        </div>

        <!-- Results section -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Analysis Results</h2>

          <!-- Loading state -->
          <div v-if="loading" class="flex flex-col items-center justify-center py-12">
            <div
              class="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"
            />
            <p class="text-gray-600">Analyzing code...</p>
          </div>

          <!-- Results -->
          <div v-else-if="result" class="space-y-4">
            <!-- Metadata Grid -->
            <div class="grid grid-cols-2 gap-4">
              <div class="border border-gray-200 rounded-lg p-4">
                <div class="text-xs text-gray-600 mb-1">Lines</div>
                <div class="text-2xl font-semibold text-gray-900">
                  {{ result.analysis.metadata.lines }}
                </div>
              </div>

              <div class="border border-gray-200 rounded-lg p-4">
                <div class="text-xs text-gray-600 mb-1">Characters</div>
                <div class="text-2xl font-semibold text-gray-900">
                  {{ result.analysis.metadata.characters }}
                </div>
              </div>

              <div class="border border-gray-200 rounded-lg p-4">
                <div class="text-xs text-gray-600 mb-1">Comments</div>
                <div class="text-2xl font-semibold text-gray-900">
                  {{ result.analysis.metadata.comments }}
                </div>
              </div>

              <div class="border border-gray-200 rounded-lg p-4">
                <div class="text-xs text-gray-600 mb-1">Blank Lines</div>
                <div class="text-2xl font-semibold text-gray-900">
                  {{ result.analysis.metadata.blank }}
                </div>
              </div>
            </div>

            <!-- Details -->
            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="text-sm font-semibold text-gray-900 mb-2">Details</h3>
              <dl class="space-y-1 text-sm">
                <div class="flex justify-between">
                  <dt class="text-gray-600">Language:</dt>
                  <dd class="font-medium text-gray-900">{{ result.analysis.metadata.language }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-600">File:</dt>
                  <dd class="font-medium text-gray-900">{{ result.analysis.metadata.filePath }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-600">Analyzed:</dt>
                  <dd class="font-medium text-gray-900">
                    {{ new Date(result.analysis.timestamp).toLocaleTimeString() }}
                  </dd>
                </div>
              </dl>
            </div>

            <!-- Success message -->
            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-start">
                <svg
                  class="w-5 h-5 text-green-600 mr-3 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p class="text-green-800 text-sm">Code analyzed successfully!</p>
              </div>
            </div>
          </div>

          <!-- Empty state -->
          <div v-else class="flex flex-col items-center justify-center py-12 text-gray-500">
            <svg
              class="w-16 h-16 mb-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p>Upload code to see analysis results</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
