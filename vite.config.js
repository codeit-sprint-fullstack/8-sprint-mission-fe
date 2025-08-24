import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    port: 5173,
    proxy: {
      '/items': 'http://localhost:3000', // Express API 프록시
    },
  },
})
