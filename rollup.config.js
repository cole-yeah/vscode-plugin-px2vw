import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/extension.ts",
  format: "cjs",
  output: {
    format: "cjs",
    file: "dist/extension.js",
  },
  watch: {
    include: "src/**",
    exclude: "node_modules/**",
  },
  plugins: [typescript(), commonjs(), resolve()],
};
