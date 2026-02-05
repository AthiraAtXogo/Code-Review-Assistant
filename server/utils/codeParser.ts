export interface CodeMetadata {
  language: string
  lines: number
  characters: number
  blank: number
  comments: number
  functions?: number
  imports?: number
}

export function parseCodeMetadata(code: string, language?: string): CodeMetadata {
  const lines = code.split('\n')
  const lineCount = lines.length
  const charCount = code.length

  return {
    language: language || detectLanguage(code),
    lines: lineCount,
    characters: charCount,
    blank: countBlankLines(lines),
    comments: countComments(lines, language),
    functions: countFunctions(code, language),
    imports: countImports(lines, language)
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

export function formatCodeForDisplay(code: string, maxLines: number = 50): string {
  const lines = code.split('\n')

  if (lines.length <= maxLines) {
    return code
  }

  const displayLines = lines.slice(0, maxLines)
  return displayLines.join('\n') + `\n\n... (${lines.length - maxLines} more lines)`
}
