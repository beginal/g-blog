import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      colors: {
        primary: "#6ee7b7",
        "primary-hover": "#5ad1a0",
        background: "#262b33",
        surface: "#2c313a",
        "surface-light": "#3a404d",
        "surface-lighter": "#4a505c",
        text: "#ffffff",
        "text-secondary": "rgba(255, 255, 255, 0.8)",
        "text-muted": "rgba(255, 255, 255, 0.6)",
        "text-disabled": "rgba(255, 255, 255, 0.4)",
        border: "#3a404d",
        "border-light": "#4a505c",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  // plugins: [require("@tailwindcss/typography")],
};
export default config;
