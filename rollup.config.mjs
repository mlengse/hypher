import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'lib/hypher.js',
  output: [
    {
      file: 'dist/hypher.umd.js',
      format: 'umd',
      name: 'Hypher',
      exports: 'default'
    },
    {
      file: 'dist/hypher.esm.js',
      format: 'es'
    }
  ],
  plugins: [resolve(), commonjs()]
};
