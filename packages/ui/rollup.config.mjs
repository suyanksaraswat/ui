import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { readdirSync, statSync } from "fs";
import { join, extname } from "path";
import copy from "rollup-plugin-copy";
import { dts } from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

// Helper function to automatically discover all components and utilities
function discoverModules(dir, extensions = ['.ts', '.tsx']) {
  const modules = {};
  
  function scanDirectory(currentDir, basePath = '') {
    const items = readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = join(currentDir, item);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Recursively scan subdirectories
        scanDirectory(fullPath, join(basePath, item));
      } else if (stat.isFile()) {
        const ext = extname(item);
        if (extensions.includes(ext)) {
          const name = item.replace(ext, '');
          // Skip index files as they're handled separately
          if (name !== 'index') {
            const modulePath = join(basePath, name).replace(/\\/g, '/');
            modules[name] = `${modulePath}${ext}`;
          }
        }
      }
    }
  }
  
  scanDirectory(dir);
  return modules;
}

// Auto-discover components and utilities
const components = discoverModules('src/components');
const utils = discoverModules('src/utils');

// Add src/ prefix to all paths
Object.keys(components).forEach(key => {
  components[key] = `src/components/${components[key]}`;
});
Object.keys(utils).forEach(key => {
  utils[key] = `src/utils/${utils[key]}`;
});

// Combine all individual modules
const individualModules = { ...components, ...utils };

// Shared plugins configuration
const sharedPlugins = [
  resolve({
    extensions: [".mjs", ".js", ".ts", ".tsx", ".json"],
  }),
  commonjs(),
  typescript({
    tsconfig: "./tsconfig.build.json",
    jsx: "preserve",
    sourceMap: true,
  }),
  babel({
    exclude: "node_modules/**",
    babelHelpers: "bundled",
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    presets: [
      [
        "@babel/preset-react",
        {
          runtime: "automatic",
        },
      ],
    ],
  }),
  postcss({
    extract: "theme.css",
    minimize: true,
  }),
  terser({
    compress: {
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ["console.log", "console.info", "console.debug"],
      passes: 2,
    },
    mangle: {
      toplevel: true,
    },
    format: {
      comments: false,
    },
  }),
  copy({
    targets: [
      { src: "src/theme.css", dest: "dist" },
      { src: "src/theme-v4.css", dest: "dist" },
      { src: "tailwind.config.ts", dest: "dist" },
      { src: "tailwind-v4.config.ts", dest: "dist" },
    ],
  }),
];

/** @type {import('rollup').RollupOptions[]} */
const config = [
  // 1️⃣ Main bundle
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist/esm",
        format: "esm",
        sourcemap: true,
        entryFileNames: "[name].js",
        manualChunks: {
          "radix-vendor": ["@radix-ui/react-slot"],
          "utils-vendor": [
            "class-variance-authority",
            "clsx",
            "tailwind-merge",
          ],
        },
      },
      {
        dir: "dist/cjs",
        format: "cjs",
        sourcemap: true,
        entryFileNames: "[name].cjs.js",
        manualChunks: {
          "radix-vendor": ["@radix-ui/react-slot"],
          "utils-vendor": [
            "class-variance-authority",
            "clsx",
            "tailwind-merge",
          ],
        },
      },
    ],
    plugins: sharedPlugins,
    external: ["react", "react-dom"],
  },

  // 2️⃣ Individual components and utilities (auto-discovered)
  {
    input: individualModules,
    output: [
      {
        dir: "dist/esm",
        format: "esm",
        sourcemap: true,
        entryFileNames: "[name].js",
      },
      {
        dir: "dist/cjs",
        format: "cjs",
        sourcemap: true,
        entryFileNames: "[name].cjs.js",
      },
    ],
    plugins: sharedPlugins,
    external: ["react", "react-dom"],
  },

  // 3️⃣ Type definitions
  {
    input: {
      index: "src/index.ts",
      ...individualModules,
    },
    output: [
      {
        dir: "dist",
        format: "esm",
        entryFileNames: "[name].d.ts",
      },
    ],
    plugins: [dts()],
    external: [/\.css$/],
  },
];

export default config;
