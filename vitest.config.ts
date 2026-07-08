import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./__tests__/setup.tsx'],
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['**/*.e2e.test.{ts,tsx}', '**/e2e/**', 'node_modules/**', '.next/**', 'dist/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        '__tests__/setup.tsx',
        '**/*.d.ts',
        '**/*.config.{ts,js}',
        '**/scripts/**',
        '.next/**',
        'dist/**',
        '**/types/**',
        '**/constants/**',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
