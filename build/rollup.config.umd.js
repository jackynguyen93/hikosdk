import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'hikosdk',
    file: 'dist/hikosdk.umd.js',
    format: 'umd',
  },
})

export default config