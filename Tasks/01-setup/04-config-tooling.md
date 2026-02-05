# Task 04: Configure Tooling (TypeScript, ESLint, Prettier)

## Objective
Set up development tooling for code quality and consistency.

## Steps

1. **Create tsconfig.json**
   ```json
   {
     "extends": "./.nuxt/tsconfig.json",
     "compilerOptions": {
       "strict": true,
       "noUnusedLocals": true,
       "noUnusedParameters": true,
       "noImplicitReturns": true
     }
   }
   ```

2. **Install ESLint dependencies**
   ```bash
   pnpm add -D eslint @nuxt/eslint-config
   pnpm add -D prettier eslint-config-prettier
   ```

3. **Create .eslintrc.js**
   ```javascript
   module.exports = {
     root: true,
     extends: [
       '@nuxt/eslint-config',
       'prettier'
     ]
   }
   ```

4. **Create .prettierrc**
   ```json
   {
     "semi": false,
     "singleQuote": true,
     "trailingComma": "none",
     "printWidth": 100
   }
   ```

5. **Add npm scripts to package.json**
   ```json
   "scripts": {
     "lint": "eslint .",
     "lint:fix": "eslint . --fix",
     "format": "prettier --write .",
     "typecheck": "nuxt typecheck"
   }
   ```

6. **Create .editorconfig**
   ```
   root = true

   [*]
   charset = utf-8
   indent_style = space
   indent_size = 2
   end_of_line = lf
   insert_final_newline = true
   trim_trailing_whitespace = true
   ```

## Expected Outcome
- TypeScript strict mode enabled
- ESLint configured and working
- Prettier formatting consistent
- npm scripts for linting/formatting

## Testing
```bash
# Check types
pnpm typecheck

# Lint code
pnpm lint

# Format code
pnpm format
```

All should run without errors.

## Commit Message
```
feat(tooling): configure TypeScript, ESLint, and Prettier

- Enable TypeScript strict mode
- Set up ESLint with Nuxt config
- Add Prettier for code formatting
- Create npm scripts for quality checks
- Add .editorconfig for consistency
```
