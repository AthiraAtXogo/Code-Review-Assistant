# Task 02: Enhanced Code Parsing

## Objective

Improve the code parser to extract more detailed metadata and insights.

## Steps

1. **Enhance codeParser utility**
   - File: `server/utils/codeParser.ts` (already exists)
   - Add better function detection
   - Add import/export counting
   - Add complexity metrics

2. **Add language-specific parsing**
   - Better detection for each language
   - Language-specific patterns
   - Extract classes, interfaces, types

3. **Add code metrics**
   - Cyclomatic complexity (basic)
   - Nesting depth
   - Function length analysis

4. **Update analyze endpoint**
   - Use enhanced parser
   - Return richer metadata

## Enhanced Parser Features

```typescript
export interface EnhancedMetadata {
  language: string
  lines: number
  characters: number
  blank: number
  comments: number
  functions: number
  imports: number
  exports?: number
  classes?: number
  complexity?: 'low' | 'medium' | 'high'
  avgFunctionLength?: number
}

export function analyzeCodeComplexity(code: string): 'low' | 'medium' | 'high' {
  // Count control flow statements
  const controlFlowPatterns = /\b(if|else|for|while|switch|case)\b/g
  const matches = code.match(controlFlowPatterns)
  const count = matches ? matches.length : 0

  if (count < 5) return 'low'
  if (count < 15) return 'medium'
  return 'high'
}
```

## Expected Outcome

- Richer metadata from `/api/analyze`
- Complexity indicators
- Better language detection
- More actionable insights

## Testing

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "code": "function test() { if (x) { for(let i=0; i<10; i++) { console.log(i) } } }",
    "language": "javascript"
  }'

# Should return complexity: "medium"
```

## Commit Message

```
feat(parser): enhance code parsing with metrics

- Add complexity analysis
- Improve function detection
- Add exports counting
- Calculate average function length
- Better language-specific patterns

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```
