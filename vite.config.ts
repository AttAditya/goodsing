import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@registry': '/src/registry',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@api': '/src/api',
      '@contexts': '/src/contexts',
      '@styles': '/src/styles',
      '@interfaces': '/src/interfaces',
      '@hooks': '/src/hooks',
    }
  }
});

