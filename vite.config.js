import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/steam-api': {
        target: 'https://api.steampowered.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/steam-api/, ''),
      },
      '/lrclib-api': {
        target: 'https://lrclib.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/lrclib-api/, ''),
      },
      '/hko-api': {
        target: 'https://data.weather.gov.hk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hko-api/, ''),
      },
    },
  },
})
