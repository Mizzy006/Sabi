import { defineConfig } from 'vite';

export default defineConfig({
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  esbuild: { jsx: 'automatic' },
  build: {
    minify: true,
    outDir: '../static/react',
    emptyOutDir: true,
    lib: {
      entry: 'src/main.jsx',
      formats: ['es'],
      fileName: () => 'app.js'
    },
    rollupOptions: {
      output: {
        entryFileNames: 'app.js',
        chunkFileNames: 'chunk-[name].js',
        assetFileNames: 'app[extname]'
      }
    }
  }
});
