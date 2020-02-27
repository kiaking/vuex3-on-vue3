import replace from '@rollup/plugin-replace'
import ts from 'rollup-plugin-typescript2'
import alias from '@rollup/plugin-alias'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} Evan You
  * @license MIT
  */`

const configs = [
  { input: 'src/index.ts', file: 'dist/vuex.js', format: 'iife' },
  { input: 'src/index.ts', file: 'dist/vuex.min.js', format: 'iife', minify: true },
  { input: 'src/index.ts', file: 'dist/vuex.cjs.js', format: 'cjs' },
  { input: 'src/index.ts', file: 'dist/vuex.esm-bundler.js', format: 'es' },
  { input: 'src/index.ts', file: 'dist/vuex.esm.js', format: 'es', browser: true }
]

function createEntries() {
  return configs.map(c => createEntry(c))
}

function createEntry({
  format, // Rollup format (iife, umd, cjs, es)
  input = 'src/index.ts', // entry point
  file, // output file name
  env = 'development', // NODE_ENV variable
  minify = false,
  browser = false, // produce a browser module version or not
}) {
  // force production mode when minifying
  if (minify) {
    env = 'production'
  }

  const isProductionBuild = process.env.__DEV__ === 'false' || env === 'production'

  const config = {
    input,
    plugins: [
      replace({
        __VERSION__: JSON.stringify(pkg.version),
        __DEV__:
          (format === 'es' && !browser) || format === 'cjs'
            ? // preserve to be handled by bundlers
              `process.env.NODE_ENV !== 'production'`
            : // hard coded dev/prod builds
              !isProductionBuild
      }),
      alias({
        resolve: ['ts']
      }),
      ts({
        // only check once, during the es version with browser (it includes external libs)
        check: format === 'es' && browser && !minify,
        tsconfigOverride: {
          compilerOptions: {
            // same for d.ts files
            declaration: format === 'es' && browser && !minify,
            // we need to override module because mocha requires this value to be commonjs
            module: 'esnext',
            target: format === 'iife' || format === 'cjs' ? 'es5' : 'esnext'
          },
          exclude: ['**/__tests__']
        }
      })
    ],
    output: {
      banner,
      file,
      format,
      name: 'Vuex',
      globals: {
        vue: 'Vue'
      }
    },
    external: ['vue']
  }

  if (minify) {
    config.plugins.push(
      terser({ module: format === 'es' })
    )
  }

  return config
}

export default createEntries()
