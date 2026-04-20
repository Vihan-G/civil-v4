import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#fbf9f2",
        ink: "#313429",
        muted: "#5e6054",
        "surface-low": "#f5f4eb",
        surface: "#efeee3",
        "surface-high": "#e9e9dc",
        "surface-highest": "#e3e4d4",
        inverse: "#0e0f0b",
        primary: "#5f5e5e",
        teal: "#006a6a",
        purple: "#6a4c93",
        pink: "#b5548c",
        coral: "#c2615b",
        blue: "#3c6e91",
        success: "#4a7c59",
        warning: "#b8842b",
        error: "#9f403d"
      },
      fontFamily: {
        headline: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        vellum: "0 24px 32px -12px rgba(49, 52, 41, 0.06)",
        soft: "0 12px 24px -12px rgba(49, 52, 41, 0.04), 0 2px 6px -2px rgba(49, 52, 41, 0.03)"
      },
      backgroundImage: {
        "canvas-grid":
          "linear-gradient(to right, rgba(49,52,41,.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(49,52,41,.05) 1px, transparent 1px)",
        "canvas-grid-inverse":
          "linear-gradient(to right, rgba(250,247,246,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(250,247,246,.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
