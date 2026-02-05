export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { code, language, filePath } = body

  if (!code) {
    throw createError({
      statusCode: 400,
      message: 'Code is required'
    })
  }

  // Parse code metadata
  const lines = code.split('\n')
  const lineCount = lines.length
  const charCount = code.length

  // Basic code analysis
  const analysis = {
    metadata: {
      language: language || 'unknown',
      filePath: filePath || 'unknown',
      lines: lineCount,
      characters: charCount,
      blank: lines.filter((line: string) => line.trim() === '').length,
      comments: detectComments(code, language)
    },
    code,
    timestamp: new Date().toISOString()
  }

  return {
    success: true,
    analysis
  }
})

function detectComments(code: string, _language?: string): number {
  let count = 0
  const lines = code.split('\n')

  // Simple comment detection
  for (const line of lines) {
    const trimmed = line.trim()
    if (
      trimmed.startsWith('//') ||
      trimmed.startsWith('#') ||
      trimmed.startsWith('/*') ||
      trimmed.startsWith('*')
    ) {
      count++
    }
  }

  return count
}
