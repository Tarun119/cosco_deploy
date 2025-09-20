import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/cosco_deploy/',
  plugins: [
    tailwindcss(),
  ],
})