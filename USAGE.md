# How to Use Code Review Assistant in Your Projects

This guide explains how to integrate Code Review Assistant as a tool in your other projects.

---

## 🎯 **Three Ways to Use This Tool**

### **Option 1: Via Claude Code CLI (Recommended)**

Use Claude Code to analyze files in any project through MCP integration.

#### **Setup:**

1. **Build this project first:**
   ```bash
   cd d:\ManagerProject\claude-template\Code-Review-Assistant
   pnpm build
   ```

2. **Claude Code will auto-detect** the MCP server from `.mcp.json`

3. **In any project**, ask Claude:
   ```
   "Use code-review-assistant to analyze this file: [path/to/file.js]"

   "Use code-review-assistant to explain this code: [paste code]"
   ```

#### **Example:**
```bash
# In your other project
cd d:\MyProject

# Start Claude Code
claude

# Ask Claude:
"Use code-review-assistant to analyze src/utils/helper.js"
```

---

### **Option 2: Via API Endpoints (HTTP)**

Call the REST API from any project or tool.

#### **Setup:**

1. **Start the dev server:**
   ```bash
   cd d:\ManagerProject\claude-template\Code-Review-Assistant
   pnpm dev
   ```
   Server runs at: `http://localhost:3000`

2. **Call endpoints from your project:**

#### **Analyze Code:**
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "code": "function add(a, b) { return a + b; }",
    "language": "javascript",
    "filePath": "src/utils/math.js"
  }'
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "metadata": {
      "language": "javascript",
      "lines": 1,
      "characters": 38,
      "blank": 0,
      "comments": 0
    },
    "code": "...",
    "timestamp": "2025-02-05T..."
  }
}
```

#### **Explain Code:**
```bash
curl -X POST http://localhost:3000/api/explain \
  -H "Content-Type: application/json" \
  -d '{
    "code": "const users = await db.query(...)",
    "question": "What does this code do?",
    "language": "javascript"
  }'
```

#### **From Node.js:**
```javascript
// In your project's script
const analyzeCode = async (code, language) => {
  const response = await fetch('http://localhost:3000/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, language })
  })
  return response.json()
}

// Use it
const result = await analyzeCode('console.log("test")', 'javascript')
console.log(result.analysis.metadata)
```

#### **From Python:**
```python
import requests

def analyze_code(code, language):
    response = requests.post('http://localhost:3000/api/analyze', json={
        'code': code,
        'language': language
    })
    return response.json()

# Use it
result = analyze_code('print("hello")', 'python')
print(result['analysis']['metadata'])
```

---

### **Option 3: VSCode Extension/Script (Future)**

Create a VSCode extension or script to integrate directly.

#### **Quick Script Example (Node.js):**

Create `review.js` in your project:
```javascript
#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const API_URL = 'http://localhost:3000/api/analyze'

async function reviewFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf-8')
  const language = path.extname(filePath).slice(1)

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, language, filePath })
  })

  const result = await response.json()
  console.log(`\n📊 Analysis for ${filePath}:`)
  console.log(`Lines: ${result.analysis.metadata.lines}`)
  console.log(`Comments: ${result.analysis.metadata.comments}`)
}

// Usage: node review.js src/index.js
reviewFile(process.argv[2])
```

**Run it:**
```bash
node review.js src/components/MyComponent.vue
```

---

## 📋 **Common Use Cases**

### **1. Pre-commit Hook**

Add to `.git/hooks/pre-commit`:
```bash
#!/bin/bash

# Get changed files
FILES=$(git diff --cached --name-only --diff-filter=ACM | grep '\.js$\|\.ts$')

# Analyze each file
for FILE in $FILES; do
  curl -s -X POST http://localhost:3000/api/analyze \
    -H "Content-Type: application/json" \
    -d "{\"code\":\"$(cat $FILE)\",\"language\":\"javascript\",\"filePath\":\"$FILE\"}"
done
```

### **2. CI/CD Integration**

**GitHub Actions:**
```yaml
name: Code Review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Start Review Server
        run: |
          cd /path/to/Code-Review-Assistant
          pnpm dev &
          sleep 5

      - name: Analyze Changed Files
        run: |
          for file in $(git diff --name-only origin/main...HEAD); do
            curl -X POST http://localhost:3000/api/analyze \
              -H "Content-Type: application/json" \
              -d "{\"code\":\"$(cat $file)\"}"
          done
```

### **3. VS Code Task**

Add to your project's `.vscode/tasks.json`:
```json
{
  "label": "Review Current File",
  "type": "shell",
  "command": "curl -X POST http://localhost:3000/api/analyze -H 'Content-Type: application/json' -d @- << EOF\n{\"code\":\"$(cat ${file})\",\"language\":\"${fileExtname}\",\"filePath\":\"${file}\"}\nEOF",
  "problemMatcher": []
}
```

### **4. npm Script**

Add to your project's `package.json`:
```json
{
  "scripts": {
    "review": "node scripts/review-code.js",
    "review:file": "curl -X POST http://localhost:3000/api/analyze -H 'Content-Type: application/json' -d @review-payload.json"
  }
}
```

---

## 🔧 **API Reference**

### **POST /api/analyze**
Analyze code quality and metadata.

**Request:**
```typescript
{
  code: string      // Code to analyze
  language?: string // Language (js, ts, py, etc.)
  filePath?: string // Optional file path
}
```

**Response:**
```typescript
{
  success: boolean
  analysis: {
    metadata: {
      language: string
      lines: number
      characters: number
      blank: number
      comments: number
      functions?: number
      imports?: number
    }
    code: string
    timestamp: string
  }
}
```

### **POST /api/explain**
Get code explanation context.

**Request:**
```typescript
{
  code: string       // Code to explain
  question?: string  // Specific question
  language?: string  // Language
}
```

**Response:**
```typescript
{
  success: boolean
  context: {
    code: string
    language: string
    question: string
    metadata: {
      lines: number
      characters: number
    }
    timestamp: string
  }
}
```

### **GET /api/health**
Check server status.

**Response:**
```typescript
{
  status: "ok"
  service: "code-review-assistant"
  version: "0.1.0"
  timestamp: string
}
```

---

## 🚀 **Quick Start Example**

1. **Start the server:**
   ```bash
   cd d:\ManagerProject\claude-template\Code-Review-Assistant
   pnpm dev
   ```

2. **In your other project, create `review.sh`:**
   ```bash
   #!/bin/bash
   curl -X POST http://localhost:3000/api/analyze \
     -H "Content-Type: application/json" \
     -d "{\"code\":\"$(cat $1)\",\"language\":\"javascript\"}"
   ```

3. **Make it executable:**
   ```bash
   chmod +x review.sh
   ```

4. **Use it:**
   ```bash
   ./review.sh src/index.js
   ```

---

## 💡 **Tips**

- **Keep server running**: Use `pnpm dev` in background or systemd/pm2 for production
- **Different ports**: Change port in `nuxt.config.ts` if 3000 is taken
- **Error handling**: Always check `success` field in responses
- **Rate limiting**: Consider adding rate limits for production use
- **Security**: Don't expose API publicly without authentication

---

## 📞 **Integration Support**

For Claude Teams MCP integration, the server auto-registers when built.
For API usage, ensure server is running on `localhost:3000`.

**Need help?** Check the API endpoints at `http://localhost:3000/api/health`
