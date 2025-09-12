import typescript from "@rollup/plugin-typescript";
import path from "path";
import { dts } from "rollup-plugin-dts";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.resolve(__dirname, "src/index.tsx");
const distDir = path.resolve(__dirname, "dist");

/** @type {import('rollup').RollupOptions[]} */
export default [
  // JS outputs (ESM and CJS)
  {
    input: inputFile,
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
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false, // No declarations here, handled by dts()
        emitDeclarationOnly: false,
        outDir: distDir,
      }),
    ],
    external: ["react", "react-dom"],
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
    external: ["react", "react-dom"],
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
    external: ["react", "react-dom"],
  },
];
