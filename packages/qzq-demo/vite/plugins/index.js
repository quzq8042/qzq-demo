import vue from '@vitejs/plugin-vue'

import htmlPlugin from 'vite-plugin-html-config'
import legacy from '@vitejs/plugin-legacy'
// import { visualizer } from 'rollup-plugin-visualizer'

import createAutoImport from './auto-import'
import createSvgIcon from './svg-icon'
import createCompression from './compression'

const packageJson = require('../../package.json')
const version = packageJson.version

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [
    htmlPlugin({
      metas: [
        {
          name: 'version',
          content: version,
        },
      ],
    }),
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      modernPolyfills: true,
      polyfills: ['es.promise', 'es.symbol'],
    }),
    // visualizer({
    //   file: './dist/stats.html',
    // }),
  ]
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createSvgIcon(isBuild))
  isBuild && vitePlugins.push(...createCompression(viteEnv))
  return vitePlugins
}
