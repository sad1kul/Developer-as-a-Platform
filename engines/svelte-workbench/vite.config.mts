import { resolve } from 'node:path';

import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: false,
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true
      }
    })
  ],
  build: {
    outDir: resolve(import.meta.dirname, '../../public/engines'),
    emptyOutDir: false,
    lib: {
      entry: resolve(import.meta.dirname, 'src/svelte-workbench.entry.ts'),
      name: 'SvelteDataWorkbenchEngine',
      formats: ['iife'],
      fileName: () => 'svelte-workbench.js'
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  }
});
