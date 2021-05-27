import babel from '@rollup/plugin-babel'
// rollup.js编译源码中的模块引用默认只支持 ES6+的模块方式import/export
// @rollup/plugin-commonjs可以将cjs转化为es module
// 这样做的原因 其它npm包可能是以cjs规范导出
import commonjs from '@rollup/plugin-commonjs'
// The @rollup/plugin-node-resolve plugin teaches Rollup how to find external modules
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default {
  input: 'src/index.tsx',
  output: {
    file: 'dist/index.min.js', // 输出文件的路径和名称
    format: 'umd', // 五种输出格式：amd/es/iife/umd/cjs
    name: 'ReactFormMaker', // 当format为iife和umd时必须提供，将作为全局变量挂在window下
    globals: { react: 'React', antd: 'antd' },
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      extensions,
      babelHelpers: 'runtime'
    }),
    nodeResolve({ browser: true, extensions }),
    commonjs(),
    terser()
  ],
  external: ['react', 'antd']
}
