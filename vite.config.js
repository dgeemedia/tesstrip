import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'tesstrip', // Your actual project root
  base: './',        // Relative base path for production
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'tesstrip/src'),
      '@styles': path.resolve(__dirname, 'tesstrip/src/styles'),
      '@auth': path.resolve(__dirname, 'tesstrip/src/auth'),
    },
  },
  build: {
    outDir: 'dist', // Adjust if needed
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'tesstrip/index.html'),
        dashboard: path.resolve(__dirname, 'tesstrip/pages/dashboard.html'),
        login: path.resolve(__dirname, 'tesstrip/pages/login.html'),
        signup: path.resolve(__dirname, 'tesstrip/pages/signup.html'),
        success: path.resolve(__dirname, 'tesstrip/pages/success.html'),
      },
    },
  },
  server: {
    open: '/index.html',
  },
});
