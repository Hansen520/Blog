import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import'
import path from 'path'
// 忽略某些文件不分割
var ignoreFile = []
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), createStyleImportPlugin({
    resolves: [AntdResolve()]
  })],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {  
        target: 'http://1212333.com',
        ws: false,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#ff9933',
          'link-color': '#1da57a',
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      },
      output: {
        manualChunks: (id) => {
          // 使用这种方式在项目里确实遇到过因为分割包后,因为加载问题出现一些报错的异常情况,所以声明了ignoreFile对有问题的文件不进行分割处理
          if (id.includes('node_modules')) {
            var fileName = id.toString().split('node_modules/')[1].split('/')[0].toString()
            if (ignoreFile.indexOf(fileName) === -1) {
              return fileName
            }
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },


})
