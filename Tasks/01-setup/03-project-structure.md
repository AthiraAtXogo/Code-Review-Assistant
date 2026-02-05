# Task 03: Create Project Structure

## Objective
Set up the folder structure matching CONTEXT.md architecture.

## Steps

1. **Create app directories**
   ```bash
   mkdir -p app/components
   mkdir -p app/composables
   mkdir -p app/pages
   mkdir -p app/layouts
   mkdir -p app/assets/css
   ```

2. **Create server directories**
   ```bash
   mkdir -p server/api
   mkdir -p server/utils
   ```

3. **Create placeholder files**
   - `app/pages/index.vue` - Home page
   - `app/layouts/default.vue` - Default layout
   - `app/assets/css/main.css` - Tailwind imports

4. **Update nuxt.config.ts**
   ```typescript
   export default defineNuxtConfig({
     modules: ['@nuxtjs/tailwindcss'],
     css: ['~/assets/css/main.css']
   })
   ```

5. **Create Tailwind config**
   - `tailwind.config.js` with basic setup

## Expected Outcome
- Complete folder structure
- Basic pages and layouts
- Tailwind CSS configured and working

## Files to Create

### app/assets/css/main.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### app/pages/index.vue
```vue
<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Code Review Assistant
      </h1>
      <p class="text-gray-600">
        AI-powered code analysis and explanation
      </p>
    </div>
  </div>
</template>
```

### app/layouts/default.vue
```vue
<template>
  <div>
    <slot />
  </div>
</template>
```

## Testing
```bash
pnpm dev
# Visit http://localhost:3000
# Should see styled landing page
```

## Commit Message
```
feat(structure): create app and server folder structure

- Set up app/ directories (components, pages, layouts)
- Set up server/ directories (api, utils)
- Create basic home page with Tailwind
- Configure Tailwind CSS
```
