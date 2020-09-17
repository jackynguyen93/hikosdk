import base from './rollup.config.base'
import { terser } from 'rollup-plugin-terser'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'hikosdk',
    file: 'dist/hikosdk.min.js',
    format: 'iife',
  },
})

config.plugins.push(terser())

export default config