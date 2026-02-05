# Task 04: Integration & Polish

## Objective

Connect all analysis features, add error handling, and polish the user experience.

## Steps

1. **Update analyze page**
   - Use AnalysisReport component
   - Add loading states
   - Add error handling
   - Add success feedback

2. **Add navigation**
   - Update home page with link to `/analyze`
   - Add back navigation
   - Breadcrumbs (optional)

3. **Add error handling**
   - File size validation (100KB max)
   - Network error handling
   - Empty input validation
   - User-friendly error messages

4. **Add loading states**
   - Skeleton loaders
   - Progress indicators
   - Disable buttons during loading

5. **Polish UI**
   - Smooth transitions
   - Hover states
   - Focus states
   - Responsive design

## Enhanced Analyze Page

```vue
<script setup lang="ts">
const result = ref(null)
const loading = ref(false)
const error = ref('')

async function handleAnalyze(code: string, language: string, fileName: string) {
  if (!code.trim()) {
    error.value = 'Please provide some code to analyze'
    return
  }

  // File size check (assuming ~1 byte per character)
  if (code.length > 100000) {
    error.value = 'File too large. Maximum size is 100KB'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await $fetch('/api/analyze', {
      method: 'POST',
      body: { code, language, filePath: fileName }
    })

    result.value = response
  } catch (err: any) {
    error.value = err.message || 'Failed to analyze code. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Back button -->
      <NuxtLink
        to="/"
        class="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
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

      <h1 class="text-3xl font-bold text-gray-900 mb-8">Code Analysis</h1>

      <!-- Error message -->
      <div v-if="error" class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
        <div class="flex items-start">
          <svg
            class="w-5 h-5 text-red-600 mr-3 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="text-red-800">{{ error }}</p>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Upload section -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Upload Code</h2>
          <CodeUpload @analyze="handleAnalyze" :disabled="loading" />
        </div>

        <!-- Results section -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Results</h2>

          <!-- Loading state -->
          <div v-if="loading" class="flex items-center justify-center py-12">
            <div class="text-center">
              <div
                class="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"
              />
              <p class="text-gray-600">Analyzing code...</p>
            </div>
          </div>

          <!-- Results -->
          <AnalysisReport v-else-if="result" :analysis="result.analysis" />

          <!-- Empty state -->
          <div v-else class="text-center py-12 text-gray-500">
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
```

## Update Home Page

Add "Try It Now" button:

```vue
<NuxtLink
  to="/analyze"
  class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
>
  Try Code Analysis
</NuxtLink>
```

## Expected Outcome

- Complete analysis flow working
- Error handling for all cases
- Professional loading states
- Navigation between pages
- User-friendly messages

## Testing

1. Visit home page → Click "Try It Now"
2. Try analyzing without code → See error
3. Upload large file → See size error
4. Upload valid code → See analysis
5. Navigate back → Return to home

## Commit Message

```
feat(analysis): complete Phase 2 integration

- Connect upload, parsing, and display
- Add comprehensive error handling
- Add loading states and feedback
- Add navigation between pages
- Polish UI with transitions
- Complete Phase 2 - Code Analysis

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```
