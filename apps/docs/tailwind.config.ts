import sharedConfig from "@suyanksaraswat/ui/tailwind.config.ts";
import type { Config } from "tailwindcss";

const config: Config = {
  ...sharedConfig,
  content: [
    "./src/stories/**/*.stories.{tsx,mdx}",
    "./src/components/*.tsx",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
};

export default config;
