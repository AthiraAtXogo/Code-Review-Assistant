import { parseCodeMetadata, formatCodeForDisplay } from '../utils/codeParser'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { code, language, filePath } = body

  if (!code) {
    throw createError({
      statusCode: 400,
      message: 'Code is required'
    })
  }

  // Use enhanced parser for code analysis
  const metadata = parseCodeMetadata(code, language)

  const analysis = {
    metadata: {
      ...metadata,
      filePath: filePath || 'unknown'
    },
    code: formatCodeForDisplay(code),
    timestamp: new Date().toISOString()
  }

  return {
    success: true,
    analysis
  }
})
