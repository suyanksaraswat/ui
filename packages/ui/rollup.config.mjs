import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import path from "path";
import { dts } from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.resolve(__dirname, "src/index.ts");
const distDir = path.resolve(__dirname, "dist");

/** @type {import('rollup').RollupOptions[]} */
export default [
  // JS build (ESM and CJS)
  {
    input: "src/index.ts",
    output: [
      {
        file: path.join(distDir, "index.mjs"),
        format: "esm",
        sourcemap: true,
      },
      {
        file: path.join(distDir, "index.js"),
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        emitDeclarationOnly: false,
        outDir: distDir,
      }),
    ],
    external: [
      "react",
      "react-dom",
      "lucide-react",
      "zod",
      "tailwindcss",
    ],
  },

  // CSS build
  {
    input: "src/theme.css",
    output: {
      file: path.join(distDir, "theme.css"),
    },
    plugins: [
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },

  // Type declarations (index.d.mts)
  {
    input: inputFile,
    output: {
      file: path.join(distDir, "index.d.mts"),
      format: "esm",
    },
    plugins: [
      dts({
        compilerOptions: {
          declaration: true,
          emitDeclarationOnly: true,
          outDir: distDir,
        },
      }),
    ],
    external: ["react", "react-dom", "lucide-react", "zod", "tailwindcss"],
  },

  // Type declarations (index.d.ts)
  {
    input: inputFile,
    output: {
      file: path.join(distDir, "index.d.ts"),
      format: "cjs",
    },
    plugins: [
      dts({
        compilerOptions: {
          declaration: true,
          emitDeclarationOnly: true,
          outDir: distDir,
        },
      }),
    ],
    external: ["react", "react-dom", "lucide-react", "zod", "tailwindcss"],
  },
];
