export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { code, question, language } = body

  if (!code) {
    throw createError({
      statusCode: 400,
      message: 'Code is required'
    })
  }

  // Prepare code context for Claude
  const context = {
    code,
    language: language || 'unknown',
    question: question || 'Explain this code',
    metadata: {
      lines: code.split('\n').length,
      characters: code.length
    },
    timestamp: new Date().toISOString()
  }

  return {
    success: true,
    context
  }
})
