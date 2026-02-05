interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { message, conversationHistory = [], codeContext } = body

  if (!message?.trim()) {
    throw createError({
      statusCode: 400,
      message: 'Message is required'
    })
  }

  try {
    // Build conversation context
    const messages: Message[] = []

    // Add system message with code context if provided
    if (codeContext) {
      messages.push({
        role: 'system',
        content: `You are a helpful code review assistant. Here's the code being analyzed:\n\n\`\`\`\n${codeContext}\n\`\`\`\n\nPlease provide clear, concise explanations about this code.`
      })
    }

    // Add conversation history
    conversationHistory.forEach((msg: any) => {
      messages.push({
        role: msg.role,
        content: msg.content
      })
    })

    // Add current user message
    messages.push({
      role: 'user',
      content: message
    })

    // Call MCP server (simulated for now)
    const response = await simulateMCPResponse(messages)

    return {
      success: true,
      message: response,
      timestamp: new Date().toISOString()
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to get response from AI'
    })
  }
})

// Temporary simulation function - will be replaced with real MCP integration
async function simulateMCPResponse(messages: Message[]): Promise<string> {
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const lastMessage = messages[messages.length - 1]
  const hasCodeContext = messages.some((m) => m.role === 'system')

  // Generate a contextual response
  if (hasCodeContext) {
    return `I can help you understand this code. Regarding your question: "${lastMessage.content}"

Here are some insights:

1. **Code Structure**: The code appears to be well-organized.
2. **Best Practices**: Consider adding error handling if not present.
3. **Performance**: Look for opportunities to optimize loops and data structures.

Would you like me to explain any specific part of the code?

*Note: This is a simulated response. Real MCP integration coming soon.*`
  }

  return `Thank you for your question: "${lastMessage.content}"

To better assist you, please upload some code for analysis first. I can provide more specific insights when I have code to review.

*Note: This is a simulated response. Real MCP integration coming soon.*`
}
