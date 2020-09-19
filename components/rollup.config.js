/* eslint-disable */
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import ignore from 'rollup-plugin-ignore';
import pkg from './package.json';

const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json'];
const CODES = [
  'THIS_IS_UNDEFINED',
  'MISSING_GLOBAL_NAME',
  'CIRCULAR_DEPENDENCY'
];

const discardWarning = (warning) => {
  if (CODES.includes(warning.code)) {
    return;
  }

  console.error(warning);
};

const env = process.env.NODE_ENV;

const commonPlugins = () => [
  postcss({
    extract: true,
    use: ['sass']
  }),
  ignore(
    ['react', '@ant-design', 'react-notification-system', 'antd', 'prop-types'],
    {
      commonjsBugFix: true
    }
  ),
  external(),
  babel({
    babelrc: false,
    presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
    extensions: EXTENSIONS,
    ignore: ['**/*.test.js', '**/*.stories.js', '**/*.spec.js', '**/__tests__'],
    exclude: ['node_modules/**']
  }),
  commonjs({
    include: /node_modules/
  }),
  replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
  resolve()
];

export default [
  {
    onwarn: discardWarning,
    input: 'src/index.js',
    output: {
      esModule: false,
      file: pkg.unpkg,
      format: 'cjs',
      name: 'ph-shared',
      exports: 'named',
      globals: {
        antd: 'antd',
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'prop-types'
      }
    },
    external: [
      'react',
      '@ant-design',
      'react-notification-system',
      'antd',
      'prop-types'
    ],
    plugins: [...commonPlugins(), env === 'production' && terser()],
    output: [{ dir: 'dist', format: 'cjs', exports: 'named', sourcemap: true }]
  }
];
