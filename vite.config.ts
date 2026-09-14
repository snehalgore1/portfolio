import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://snehalgore1.github.io/portfolio/
  base: '/portfolio/',
  plugins: [react(), tailwindcss()],
})
