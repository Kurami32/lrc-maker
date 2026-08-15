import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import checker from 'vite-plugin-checker';
import { compression } from 'vite-plugin-compression2';

const isDevBuild = process.env.DEV_BUILD === 'true';

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(), // for debugging
    VueI18nPlugin({
      runtimeOnly: false,
      include: [path.resolve(import.meta.dirname, './src/i18n/**/*.json')],
    }),
    isDevBuild && checker({
      vueTsc: {
        tsconfigPath: './tsconfig.json',
      },
    }),
    !isDevBuild && compression({
      include: /\.(js|css|html|svg|json|woff2?)(\?|$)/i,
      deleteOriginalAssets: true, // removes uncompressed versions
      algorithms: ['brotliCompress'],
    }),
  ].filter(Boolean), // removes falsy entries

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  define: {
    // vue-i18n tree‑shaking
    __VUE_I18N_LEGACY_API__: JSON.stringify(false),
    __VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    watch: isDevBuild ? { buildDelay: 500 } : null, // for `vite build --watch`
    target: 'esnext',
    sourcemap: false,
    chunkSizeWarningLimit: 5000,
    rolldownOptions: {
      input: {
        index: path.resolve(import.meta.dirname, "./index.html"),
      },
      /*output: {
        manualChunks(id) {
          return undefined;
        },
      },*/
      // Note: if this block is ever uncommented, the object/function `manualChunks`
      // form above is Rollup-era. Under Rolldown (Vite 8+) the equivalent is
      // `output.codeSplitting.groups`, e.g. `{ groups: [{ name: '...', test: /.../ }] }`.
      onwarn(warning, warn) {
        // Suppress warn
        if (isDevBuild && warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
        warn(warning);
      },
    },
  },
});
