import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from the user site root: https://snehalgore1.github.io/
  base: '/',
  plugins: [react(), tailwindcss()],
})
