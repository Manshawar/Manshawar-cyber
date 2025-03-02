import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
  },

  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将所有带短横线的标签名都视为自定义元素
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    }) as any,
    dts({
      // tsconfigPath: "./tsconfig.build.json",
      entryRoot: 'src',
      outDir: 'dist/types',
      staticImport: true,
      insertTypesEntry: true,
      exclude: ['**/__tests__/**', '**/*.stories.ts'],
      beforeWriteFile: (path, content) => {
        // 修复嵌套组件类型路径问题
        const fixedPath = path.replace(/src\//g, '')
        return { filePath: fixedPath, content }
      }
    }),
    
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'lib',
      formats: ['es', 'cjs'],
      fileName: (format) => `lib.${format}.js`
    },
    rollupOptions: {
      // external: ['vue', 'vue-router'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter'
        },
        assetFileNames: 'assets/[name].[ext]',
        preserveModules: false
      },
      treeshake: true
    },
    minify: 'terser',
    sourcemap: true,
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),

    }
  }
})