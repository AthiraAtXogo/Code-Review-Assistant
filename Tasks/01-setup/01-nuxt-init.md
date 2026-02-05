# Task 01: Initialize Nuxt Project

## Objective
Set up a fresh Nuxt 4 project with Vue 3 and basic dependencies.

## Steps

1. **Initialize Nuxt project**
   ```bash
   pnpm dlx nuxi@latest init .
   ```

2. **Install core dependencies**
   ```bash
   pnpm install
   ```

3. **Add essential packages**
   ```bash
   pnpm add -D @nuxtjs/tailwindcss
   pnpm add -D typescript
   pnpm add -D eslint @nuxtjs/eslint-config-typescript
   ```

4. **Configure nuxt.config.ts**
   - Enable TypeScript strict mode
   - Add TailwindCSS module
   - Set up dev server options

5. **Create .env.example**
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

## Expected Outcome
- Clean Nuxt 4 project structure
- Dependencies installed
- Dev server runs: `pnpm dev`
- No compilation errors

## Testing
```bash
pnpm dev
# Should start on http://localhost:3000
```

## Commit Message
```
feat(setup): initialize Nuxt 4 project with TypeScript

- Initialize Nuxt 4 with Vue 3
- Add TailwindCSS, TypeScript, ESLint
- Create basic configuration
- Add environment template
```
