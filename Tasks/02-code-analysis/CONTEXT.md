# Feature: Code Analysis Engine

## Begin (B) - What we're building

Build the core code analysis engine that:

- Accepts code files or snippets
- Performs quality, security, and style analysis
- Uses Claude AI for intelligent insights
- Returns structured reports

## Refine (R) - Goals & Constraints

### Goals

- Parse and analyze code files (multiple languages)
- Generate comprehensive review reports
- Identify quality issues, security vulnerabilities, style problems
- Provide actionable recommendations
- Support both file upload and text input

### Constraints

- Must sanitize user input before AI processing
- Rate limit API calls to Claude
- Max file size: 100KB per analysis
- Support: JavaScript, TypeScript, Python, Go (initial)

### Success Criteria

- Can analyze uploaded files
- Returns structured markdown report
- Identifies at least: syntax issues, security patterns, style violations
- API response time < 10 seconds

## Arrange (A) - Task Breakdown

- `01-file-parser.md` - Parse and validate code files
- `02-ai-review.md` - Claude integration for analysis
- `03-report-generator.md` - Format results as markdown
- `04-api-endpoint.md` - Create POST /api/analyze endpoint

## Status

Track completion in `Status.md`
