import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

interface Config extends UserConfig {
  test: {
    globals: boolean;
    environment: string;
    setupFiles: string;
  };
}

export default defineConfig({
  base: '/react-autocomplete/',
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js',
  },
} as Config);
