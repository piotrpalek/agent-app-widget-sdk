import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from "rollup-plugin-commonjs";

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
    resolve(),
    commonjs({ include: 'node_modules/**' }),
    babel({
      exclude: 'node_modules/**'
    }),
  ]
};

export default config;
