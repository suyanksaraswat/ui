import typescript from "@rollup/plugin-typescript";
import fs from "fs";
import path from "path";
import { dts } from "rollup-plugin-dts";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.resolve(__dirname, "src");
const distDir = path.resolve(__dirname, "dist");

// Only TSX files at the top-level of src
const inputFiles = fs
  .readdirSync(srcDir)
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => path.join("src", file));

function flattenDts(distDir) {
  return {
    name: "flatten-dts",
    generateBundle: async () => {
      const srcRoot = path.join(distDir, "src");
      if (!fs.existsSync(srcRoot)) return;

      function moveFiles(dir) {
        for (const file of fs.readdirSync(dir)) {
          const fullPath = path.join(dir, file);
          const stat = fs.statSync(fullPath);

          if (stat.isDirectory()) {
            moveFiles(fullPath);
          } else if (
            file.endsWith(".d.ts") ||
            file.endsWith(".d.mts") ||
            file.endsWith(".d.cts")
          ) {
            const destFile = path.join(distDir, file);

            // overwrite if necessary
            if (fs.existsSync(destFile)) {
              fs.rmSync(destFile);
            }

            fs.renameSync(fullPath, destFile);
          }
        }
      }

      moveFiles(srcRoot);

      fs.rmSync(srcRoot, { recursive: true, force: true });
    },
  };
}

/** @type {import('rollup').RollupOptions[]} */
const config = [
  {
    input: inputFiles,
    output: [
      {
        dir: distDir,
        format: "esm",
        entryFileNames: "[name].mjs",
        sourcemap: true,
        preserveModules: true,
      },
      {
        dir: distDir,
        format: "cjs",
        entryFileNames: "[name].js",
        sourcemap: true,
        exports: "named",
        preserveModules: true,
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: distDir,
        rootDir: "src",
        jsx: "react-jsx",
        emitDeclarationOnly: false,
      }),
    ],
    external: ["react", "react-dom"],
  },
  // DTS for ESM (.d.mts)
  {
    input: inputFiles,
    output: {
      dir: distDir,
      format: "esm",
      entryFileNames: "[name].d.mts",
      preserveModules: true,
    },
    plugins: [
      dts({
        compilerOptions: {
          declaration: true,
          declarationMap: false,
          emitDeclarationOnly: true,
        },
      }),
    ],
    external: ["react", "react-dom"],
  },
  // DTS for CJS (.d.ts)
  {
    input: inputFiles,
    output: {
      dir: distDir,
      format: "cjs",
      entryFileNames: "[name].d.ts",
      preserveModules: true,
    },
    plugins: [
      dts({
        compilerOptions: {
          declaration: true,
          declarationMap: false,
          emitDeclarationOnly: true,
        },
      }),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: inputFiles,
    output: {
      dir: distDir,
      format: "es",
      preserveModules: true,
    },
    plugins: [dts(), flattenDts(distDir)],
  },
];

export default config;
