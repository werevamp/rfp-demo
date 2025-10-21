import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
  ],
  server: {
    allowedHosts: ['theoremwebhooks.ngrok.io'],
  },
  build: {
    sourcemap: true, // Enable source maps for production debugging - allows you to see original code in browser DevTools
  },
})
