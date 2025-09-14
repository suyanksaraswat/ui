import sharedConfig from "@suyanksaraswat/design-system/tailwind.config.ts";
import type { Config } from "tailwindcss";

const config: Config = {
  ...sharedConfig,
  content: [
    "./src/stories/**/*.stories.{tsx,mdx}",
    "./src/components/*.tsx",
    "../../packages/design-system/src/**/*.{ts,tsx}",
  ],
};

export default config;
