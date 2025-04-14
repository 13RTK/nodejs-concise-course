import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/info': {
        target: 'http://localhost:3000/idol',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/info/, ''),
      },
    },
  },
});
