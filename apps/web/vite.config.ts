import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  envDir: './env',
  plugins: [react(), tsconfigPaths()],
  server: {
    strictPort: true,
    port: process.env.VITE_PORT ? Number(process.env.VITE_PORT) : 8688,
  },
});
