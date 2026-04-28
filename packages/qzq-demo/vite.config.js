import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import createVitePlugins from './vite/plugins'
const packageJson = require('./package.json')
const version = packageJson.version

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, './mode')
  const { VITE_APP_ENV, VITE_APP_BASE_API } = env
  return {
    base: '/qzq-demo/',
    envDir: './mode',
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    // vite 相关配置
    server: {
      port: 3001,
      host: true,
      open: true,
      historyApiFallback: true, // 解决刷新页面404问题
      proxy: {
        '/dev-api': {
          target: `http://localhost:8080/`,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, ''),
        },
      },
    },
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              },
            },
          },
        ],
      },
    },
    build: {
      outDir: '../../dist',
      emptyOutDir: true,
      target: 'es2015',
      sourcemap: false, // 关闭生成map文件
      reportCompressedSize: false, // 关闭文件计算
      // minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log'],
        },
        output: {
          comments: true,
        },
      },
      assetsDir: 'static',
      assetsInclude: ['image/**'],
      rollupOptions: {
        output: {
          assetFileNames: `${version}/[ext]/[name].[hash].[ext]`,
          chunkFileNames: `${version}/js/[name].[hash].js`,
          entryFileNames: `${version}/[name].[hash].js`,
        },
      },
    },
  }
})
