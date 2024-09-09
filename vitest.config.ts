import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  server: {
    open: true,
  },
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['__tests__/setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    coverage: {
      all: true,
      provider: 'v8',
      include: ['**/*.tsx', '**/*.ts', '*.tsx'],
      exclude: [
        '**/.eslintrc.cjs',
        'vite.config.ts',
        'vitest.config.ts',
        'dist',
        'utils/downloadCSV/downloadCSV.ts',
      ],
    },
  },
});
