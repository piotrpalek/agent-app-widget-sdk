const { NODE_ENV, BABEL_ENV } = process.env;

const cjs = NODE_ENV === 'test' && BABEL_ENV === 'cjs';

module.exports = {
  presets: [
    [
      'env',
      {
        loose: true,
        modules: false
      }
    ],
    'stage-3'
  ],
  plugins: [cjs && 'transform-es2015-modules-commonjs'].filter(Boolean)
};
