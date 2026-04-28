import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#F5EDD6",
        ink: "#1A0F00",
        "ink-muted": "#5C4A30",
        accent: "#C4622A",
        "accent-dark": "#A04E1F",
        "surface-dark": "#2A1F0E",
      },
      fontFamily: {
        typewriter: ["American Typewriter", "Courier New", "monospace"],
        raleway: ["var(--font-raleway)", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        34: "8.5rem",
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 9rem)", { lineHeight: "0.95" }],
        "display-lg": ["clamp(2.5rem, 6vw, 6rem)", { lineHeight: "1.0" }],
        "display-md": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.05" }],
        "display-sm": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.1" }],
      },
      borderRadius: {
        cta: "0px",
        card: "0px",
      },
    },
  },
  plugins: [],
};

export default config;
