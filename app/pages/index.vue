<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="max-w-4xl w-full">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">
          Code Review Assistant
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          AI-powered code analysis and explanation using Claude Teams
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-6 mb-12">
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900">Code Analysis</h2>
          </div>
          <p class="text-gray-600">
            Upload code files or paste snippets for comprehensive quality, security, and style analysis
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900">Code Explanation</h2>
          </div>
          <p class="text-gray-600">
            Ask questions about code and get detailed explanations with context
          </p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-8 text-center">
        <h3 class="text-2xl font-semibold text-gray-900 mb-4">Getting Started</h3>
        <p class="text-gray-600 mb-6">
          This tool integrates with Claude Teams via MCP. Make sure Claude Code is running.
        </p>
        <div class="flex justify-center gap-4">
          <span class="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            Server Ready
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
