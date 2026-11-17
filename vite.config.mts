import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://15.design.htmlacademy.pro',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/six-cities'),
      },
    },
  },
  plugins: [react()],
  build: { outDir: 'build' },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
});
