// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    typescript: true
  }
}).append({
  rules: {
    'vue/multi-word-component-names': 'off'
  }
})
