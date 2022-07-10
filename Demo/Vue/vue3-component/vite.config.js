import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import autoPlugin from './src/auto-import';
import tryCatch from './src/tryCatch';
import { visualizer } from 'rollup-plugin-visualizer';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), , tryCatch(), autoPlugin(), vueJsx(), visualizer()],
  server: {
    hmr: true,
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
});
