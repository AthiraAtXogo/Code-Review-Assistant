export default defineEventHandler(() => {
  return {
    status: 'ok',
    service: 'code-review-assistant',
    version: '0.1.0',
    timestamp: new Date().toISOString()
  }
})
