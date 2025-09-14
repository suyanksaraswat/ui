import type { Config } from "tailwindcss";

const config: Config = {
  content: [],
  // Tailwind v4 uses @theme directive instead of theme.extend
  // This config is mainly for compatibility and documentation
  // The actual theme is defined in theme-v4.css using @theme directive
  theme: {
    // In v4, most theme configuration is done via CSS @theme directive
    // This config serves as a fallback and documentation
  },
  plugins: [],
};

export default config;
