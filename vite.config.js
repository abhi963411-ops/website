import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  base: './',
  base: '/',
  plugins: [
    tailwindcss(),
  ],
  server: {
    port: 3000,
    open: false
  }
})
