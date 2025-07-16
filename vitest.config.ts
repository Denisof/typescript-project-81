/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.test.{ts,js}', 'tests/**/*.spec.{ts,js}'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{ts,js}'],
      exclude: [
        'src/**/*.test.{ts,js}',
        'src/**/*.spec.{ts,js}',
        'dist/**',
      ],
    },
  },
})
