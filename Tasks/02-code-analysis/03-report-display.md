# Task 03: Analysis Report Display Component

## Objective

Create a Vue component to display analysis results in a professional, readable format.

## Steps

1. **Create report component**
   - File: `app/components/AnalysisReport.vue`
   - Display metadata in cards
   - Show code with syntax highlighting
   - Visual indicators for metrics

2. **Add syntax highlighting**
   - Install: `pnpm add shiki`
   - Highlight code based on language
   - Line numbers

3. **Create metric cards**
   - Lines of code
   - Comments ratio
   - Complexity indicator
   - Functions count

4. **Add visual feedback**
   - Color-coded complexity (green/yellow/red)
   - Progress bars for metrics
   - Icons for different metrics

## Component Structure

```vue
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
      complexity?: 'low' | 'medium' | 'high'
    }
    code: string
    timestamp: string
  }
}

const props = defineProps<Props>()

const complexityColor = computed(() => {
  switch (props.analysis.metadata.complexity) {
    case 'low':
      return 'text-green-600 bg-green-50'
    case 'medium':
      return 'text-yellow-600 bg-yellow-50'
    case 'high':
      return 'text-red-600 bg-red-50'
    default:
      return 'text-gray-600 bg-gray-50'
  }
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="border-b border-gray-200 pb-4">
      <h2 class="text-2xl font-semibold text-gray-900">Analysis Report</h2>
      <p class="text-sm text-gray-500">{{ analysis.metadata.language }}</p>
    </div>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <!-- Lines -->
      <div class="border border-gray-200 rounded-lg p-4">
        <div class="text-sm text-gray-600 mb-1">Lines of Code</div>
        <div class="text-2xl font-semibold text-gray-900">{{ analysis.metadata.lines }}</div>
      </div>

      <!-- Comments -->
      <div class="border border-gray-200 rounded-lg p-4">
        <div class="text-sm text-gray-600 mb-1">Comments</div>
        <div class="text-2xl font-semibold text-gray-900">{{ analysis.metadata.comments }}</div>
      </div>

      <!-- Functions -->
      <div class="border border-gray-200 rounded-lg p-4">
        <div class="text-sm text-gray-600 mb-1">Functions</div>
        <div class="text-2xl font-semibold text-gray-900">
          {{ analysis.metadata.functions || 0 }}
        </div>
      </div>

      <!-- Complexity -->
      <div class="border border-gray-200 rounded-lg p-4">
        <div class="text-sm text-gray-600 mb-1">Complexity</div>
        <div
          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
          :class="complexityColor"
        >
          {{ analysis.metadata.complexity || 'N/A' }}
        </div>
      </div>
    </div>

    <!-- Code Preview -->
    <div class="border border-gray-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-3">Code Preview</h3>
      <pre class="bg-gray-50 p-4 rounded overflow-x-auto"><code>{{ analysis.code }}</code></pre>
    </div>
  </div>
</template>
```

## Shiki Integration (Optional)

```typescript
// composables/useCodeHighlight.ts
import { getHighlighter } from 'shiki'

export async function useCodeHighlight(code: string, language: string) {
  const highlighter = await getHighlighter({
    themes: ['github-light'],
    langs: ['javascript', 'typescript', 'python', 'go']
  })

  return highlighter.codeToHtml(code, { lang: language, theme: 'github-light' })
}
```

## Expected Outcome

- Professional report display
- Clear metrics visualization
- Syntax-highlighted code
- Responsive design

## Testing

1. Go to `/analyze`
2. Upload code
3. See formatted report with:
   - Metric cards
   - Complexity indicator
   - Code preview

## Commit Message

```
feat(ui): add analysis report display component

- Create AnalysisReport.vue component
- Add metric cards with visual indicators
- Add complexity color coding
- Display code with formatting
- Responsive grid layout

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```
