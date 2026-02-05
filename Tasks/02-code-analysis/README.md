# Phase 2: Code Analysis Engine

## Overview

Build a complete code analysis feature with upload UI, enhanced parsing, and report display.

## Tasks

| #   | Task              | Description                         | Files                                                  |
| --- | ----------------- | ----------------------------------- | ------------------------------------------------------ |
| 01  | File Upload UI    | Upload component and analyze page   | `app/components/CodeUpload.vue`, `app/pages/analyze.vue` |
| 02  | Enhanced Parsing  | Better metadata and complexity      | `server/utils/codeParser.ts` (enhance existing)        |
| 03  | Report Display    | Professional results component      | `app/components/AnalysisReport.vue`                    |
| 04  | Integration       | Connect everything with error handling | Update `app/pages/analyze.vue`, `app/pages/index.vue` |

## Features

### Code Upload

- File upload with drag & drop
- Text area for pasting code
- Language selector (JS, TS, Python, Go)
- File validation (size, type)

### Analysis

- Lines of code
- Comment counting
- Function detection
- Complexity analysis
- Import/export counting

### Report

- Metric cards
- Color-coded complexity
- Syntax-highlighted code preview
- Responsive layout

## Architecture

```
User → Upload Component → /api/analyze → Enhanced Parser → Report Display
```

## Progress

Track in [Status.md](Status.md)

## Next Phase

Phase 3: Chatbot Interface (see `Tasks/03-chatbot/`)
