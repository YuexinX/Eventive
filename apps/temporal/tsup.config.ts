import { defineConfig, type Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: ['src/**/*.ts'],
  clean: true,
  splitting: true,
  sourcemap: true,
  format: ['esm'],
  ...options,
}));
