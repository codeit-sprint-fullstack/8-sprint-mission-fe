import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    root: '.', // 프로젝트 루트 지정
    publicDir: 'public', // public 디렉토리 지정
})
