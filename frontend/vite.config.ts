import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true, // optional, usually not needed for Vercel
  },
  server: {
    proxy: {
      "/api": "http://localhost:5000/",
    },
  },
})