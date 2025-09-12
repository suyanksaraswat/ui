import { defineTailwindConfig } from "@suyanksaraswat/styles";

/** @type {import('tailwindcss').Config} */
export default defineTailwindConfig({
  content: [
    "./src/stories/**/*.stories.{tsx,mdx}", 
    "./src/components/*.tsx",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
});
