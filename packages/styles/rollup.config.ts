import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

import pkg from "./package.json" with { type: "json" };

export default defineConfig([
  // ---- JS + CSS build ----
  {
    input: {
      index: "src/index.ts",
      theme: "src/theme.css",
    },
    output: [
      {
        dir: "dist",
        format: "cjs",
        entryFileNames: "[name].js",
        exports: "auto",
      },
      {
        dir: "dist",
        format: "esm",
        entryFileNames: "[name].mjs",
      },
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        extract: "theme.css", // emits dist/theme.css
        minimize: true,
      }),
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
  },

  // ---- Type Declarations ----
  {
    input: "dist/types/src/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
]);
