export interface CodeMetadata {
  language: string
  lines: number
  characters: number
  blank: number
  comments: number
  functions?: number
  imports?: number
  exports?: number
  classes?: number
  complexity?: 'low' | 'medium' | 'high'
}

export function parseCodeMetadata(code: string, language?: string): CodeMetadata {
  const lines = code.split('\n')
  const lineCount = lines.length
  const charCount = code.length
  const detectedLanguage = language || detectLanguage(code)

  return {
    language: detectedLanguage,
    lines: lineCount,
    characters: charCount,
    blank: countBlankLines(lines),
    comments: countComments(lines, detectedLanguage),
    functions: countFunctions(code, detectedLanguage),
    imports: countImports(lines, detectedLanguage),
    exports: countExports(lines, detectedLanguage),
    classes: countClasses(code, detectedLanguage),
    complexity: calculateComplexity(code, lineCount)
  }
}

function detectLanguage(code: string): string {
  // Simple heuristic-based language detection
  if (code.includes('function') && code.includes('=>')) return 'typescript'
  if (code.includes('def ') && code.includes(':')) return 'python'
  if (code.includes('public class')) return 'java'
  if (code.includes('<?php')) return 'php'
  if (code.includes('package main')) return 'go'

  return 'unknown'
}

function countBlankLines(lines: string[]): number {
  return lines.filter((line) => line.trim() === '').length
}

function countComments(lines: string[], _language?: string): number {
  let count = 0

  for (const line of lines) {
    const trimmed = line.trim()
    if (
      trimmed.startsWith('//') ||
      trimmed.startsWith('#') ||
      trimmed.startsWith('/*') ||
      trimmed.startsWith('*') ||
      trimmed.startsWith('"""') ||
      trimmed.startsWith("'''")
    ) {
      count++
    }
  }

  return count
}

function countFunctions(code: string, _language?: string): number {
  const patterns = [
    /function\s+\w+/g, // JavaScript/TypeScript
    /def\s+\w+/g, // Python
    /func\s+\w+/g, // Go
    /\w+\s*\([^)]*\)\s*{/g // General function pattern
  ]

  let count = 0
  for (const pattern of patterns) {
    const matches = code.match(pattern)
    if (matches) count += matches.length
  }

  return count
}

function countImports(lines: string[], _language?: string): number {
  return lines.filter((line) => {
    const trimmed = line.trim()
    return (
      trimmed.startsWith('import ') ||
      trimmed.startsWith('from ') ||
      trimmed.startsWith('require(') ||
      trimmed.startsWith('use ')
    )
  }).length
}

function countExports(lines: string[], _language?: string): number {
  return lines.filter((line) => {
    const trimmed = line.trim()
    return (
      trimmed.startsWith('export ') ||
      trimmed.startsWith('module.exports') ||
      trimmed.startsWith('exports.')
    )
  }).length
}

function countClasses(code: string, _language?: string): number {
  const patterns = [
    /class\s+\w+/g, // JavaScript/TypeScript/Python
    /type\s+\w+\s+struct/g, // Go
    /public\s+class\s+\w+/g, // Java
    /interface\s+\w+/g // TypeScript/Go interfaces
  ]

  let count = 0
  for (const pattern of patterns) {
    const matches = code.match(pattern)
    if (matches) count += matches.length
  }

  return count
}

function calculateComplexity(code: string, lines: number): 'low' | 'medium' | 'high' {
  // Calculate complexity based on control flow statements and code structure
  const controlFlowPatterns = [
    /\bif\s*\(/g,
    /\belse\b/g,
    /\bfor\s*\(/g,
    /\bwhile\s*\(/g,
    /\bswitch\s*\(/g,
    /\bcase\s+/g,
    /\btry\s*{/g,
    /\bcatch\s*\(/g,
    /\?\s*.*\s*:/g, // ternary operators
    /&&|\|\|/g // logical operators
  ]

  let complexityScore = 0
  for (const pattern of controlFlowPatterns) {
    const matches = code.match(pattern)
    if (matches) complexityScore += matches.length
  }

  // Normalize by lines of code
  const normalizedScore = lines > 0 ? complexityScore / lines : 0

  if (normalizedScore < 0.1) return 'low'
  if (normalizedScore < 0.3) return 'medium'
  return 'high'
}

export function formatCodeForDisplay(code: string, maxLines: number = 50): string {
  const lines = code.split('\n')

  if (lines.length <= maxLines) {
    return code
  }

  const displayLines = lines.slice(0, maxLines)
  return displayLines.join('\n') + `\n\n... (${lines.length - maxLines} more lines)`
}
