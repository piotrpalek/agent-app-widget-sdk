import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const config = {
  input: './src/index.js',
  output: [
    {
      format: 'es',
      file: pkg.module
    },
    {
      format: 'cjs',
      file: pkg.main
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};

export default config;
