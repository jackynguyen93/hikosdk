import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    name: 'hikosdk',
    file: 'dist/hikosdk.esm.js',
    format: 'es',
  },
  external: [
    'lodash',
    'popper.js',
    'vue-resize',
  ],
})

export default config