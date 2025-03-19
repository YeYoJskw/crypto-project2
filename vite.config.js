import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Указывает относительный путь для работы на сервере
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
