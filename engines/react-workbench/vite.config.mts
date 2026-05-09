import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: false,
  plugins: [react()],
  build: {
    outDir: resolve(import.meta.dirname, '../../public/engines'),
    emptyOutDir: false,
    lib: {
      entry: resolve(import.meta.dirname, 'src/react-workbench.element.tsx'),
      name: 'ReactDataWorkbenchEngine',
      formats: ['iife'],
      fileName: () => 'react-workbench.js'
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  }
});
