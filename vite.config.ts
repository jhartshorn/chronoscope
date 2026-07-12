import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Deployed as a standalone page at https://hartshorn.io/chronoscope/ (custom
  // apex domain → site root, so the subpath is just /chronoscope/). Vite emits
  // absolute asset URLs from `base`, so the production build must carry the
  // subpath; the dev server (and the test suite) stay at '/'.
  base: command === 'build' ? '/chronoscope/' : '/',
  server: { port: 5178 },
  build: {
    chunkSizeWarningLimit: 1500,
  },
}));
