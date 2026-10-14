import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      '/Retail_Suite_API': {
        target: 'http://172.20.204.118',
        changeOrigin: true,
      },
    },
  },
})

