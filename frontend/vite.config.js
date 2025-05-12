import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config with historyApiFallback for React Router
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,  // Ensures proper client-side routing
  },
  resolve: {
    alias: {
      '@shared-theme': '/src/shared-theme',
    }
  },
});
