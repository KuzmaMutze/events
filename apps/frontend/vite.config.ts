import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': 'http://localhost:3333',
        '/auth': 'http://localhost:3333',
        '/health': 'http://localhost:3333',
      },
      watch: {
        ignored: ['!**/libs/**/dist/**'],
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src/'),
      },
    },
    optimizeDeps: {
      exclude: mode === 'development' ? [] : [],
      include: mode === 'development' ? [] : [],
    },
  };
});
