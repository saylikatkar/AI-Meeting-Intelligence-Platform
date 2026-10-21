import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Read .env from the repository root (one .env for the whole project).
  envDir: '..',
  server: { port: 5173, open: true },
})
