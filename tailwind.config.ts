import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryButton: "var(--primary-button)",
        buttonHoverColor: "var(--hover-text-color)",
        secondaryTextColor: "var(--secondary-text-color)",
      },
    },
  },
  plugins: [],
} satisfies Config;
