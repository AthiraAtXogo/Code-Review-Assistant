<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h1 class="text-2xl font-semibold text-gray-900">Code Review Assistant</h1>
          </div>
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-md border border-green-200">
              <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Online
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          AI-Powered Code Analysis
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive code review and explanation tool powered by Claude Teams
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <!-- Feature 1 -->
        <div class="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
          <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Code Analysis</h3>
          <p class="text-gray-600 text-sm">
            Analyze code quality, security vulnerabilities, and style compliance with detailed reports
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
          <div class="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Code Explanation</h3>
          <p class="text-gray-600 text-sm">
            Get detailed explanations and insights about code logic, patterns, and implementation
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
          <div class="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Instant Feedback</h3>
          <p class="text-gray-600 text-sm">
            Real-time analysis and suggestions integrated with Claude Teams via MCP
          </p>
        </div>
      </div>

      <!-- Integration Info -->
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-8">
        <div class="max-w-3xl mx-auto">
          <h3 class="text-xl font-semibold text-gray-900 mb-4 text-center">System Integration</h3>
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-0.5">
                <span class="text-blue-600 font-semibold text-sm">1</span>
              </div>
              <div>
                <h4 class="font-medium text-gray-900 mb-1">Claude Teams Integration</h4>
                <p class="text-gray-600 text-sm">Connected via Model Context Protocol (MCP) for seamless AI-powered analysis</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-0.5">
                <span class="text-blue-600 font-semibold text-sm">2</span>
              </div>
              <div>
                <h4 class="font-medium text-gray-900 mb-1">API Endpoints</h4>
                <p class="text-gray-600 text-sm">RESTful endpoints for code analysis and explanation at <code class="bg-gray-100 px-2 py-0.5 rounded text-xs">/api/*</code></p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-0.5">
                <span class="text-blue-600 font-semibold text-sm">3</span>
              </div>
              <div>
                <h4 class="font-medium text-gray-900 mb-1">Development Ready</h4>
                <p class="text-gray-600 text-sm">Built with Nuxt 4, Vue 3, and TypeScript for modern development workflow</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-200 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p class="text-center text-sm text-gray-500">
          Code Review Assistant · Powered by Claude Teams
        </p>
      </div>
    </footer>
  </div>
</template>
