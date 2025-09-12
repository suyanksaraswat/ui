import { defineTailwindConfig } from "./src/utils/config";

/** @type {import('tailwindcss').Config} */
export default defineTailwindConfig({
  content: ["./src/**/*.{ts,tsx}"],
});
