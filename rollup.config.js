import babel from "rollup-plugin-babel";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.cjs.js", //输出文件的路径和名称
    format: "iife", // 五种输出格式：amd/es6/iife/umd/cjs
    name: "bundleName", //当format为iife和umd时必须提供，将作为全局变量挂在window下
    globals: {},
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
    })
  ],
  external: [],
};
