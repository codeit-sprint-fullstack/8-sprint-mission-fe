// vite.config.js (별칭 설정을 삭제해도 무방)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
