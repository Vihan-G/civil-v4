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
        bg: "rgb(var(--bg-rgb) / <alpha-value>)",
        "bg-elev": "rgb(var(--bg-elev-rgb) / <alpha-value>)",
        fg: "rgb(var(--fg-rgb) / <alpha-value>)",
        "fg-muted": "rgb(var(--fg-muted-rgb) / <alpha-value>)",
        border: "var(--border)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        "accent-glow": "rgb(var(--accent-glow-rgb) / <alpha-value>)",
        paper: "rgb(var(--bg-elev-rgb) / <alpha-value>)",
        ink: "rgb(var(--fg-rgb) / <alpha-value>)",
        muted: "rgb(var(--fg-muted-rgb) / <alpha-value>)",
        "surface-low": "rgb(var(--bg-rgb) / <alpha-value>)",
        surface: "rgb(var(--bg-elev-rgb) / <alpha-value>)",
        "surface-high": "rgb(var(--bg-elev-rgb) / <alpha-value>)",
        "surface-highest": "rgb(var(--bg-elev-rgb) / <alpha-value>)",
        inverse: "rgb(var(--bg-rgb) / <alpha-value>)",
        primary: "rgb(var(--accent-rgb) / <alpha-value>)",
        teal: "rgb(var(--accent-rgb) / <alpha-value>)",
        purple: "rgb(var(--accent-rgb) / <alpha-value>)",
        pink: "rgb(var(--accent-rgb) / <alpha-value>)",
        coral: "rgb(var(--accent-rgb) / <alpha-value>)",
        blue: "rgb(var(--accent-rgb) / <alpha-value>)",
        success: "rgb(var(--accent-rgb) / <alpha-value>)",
        warning: "rgb(var(--accent-rgb) / <alpha-value>)",
        error: "rgb(var(--accent-rgb) / <alpha-value>)"
      },
      fontFamily: {
        headline: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        vellum:
          "0 24px 48px rgba(0,0,0,0.36), inset 0 0 80px rgba(255,255,255,0.02)",
        soft: "0 18px 36px rgba(0,0,0,0.22)"
      },
      backgroundImage: {
        "canvas-grid":
          "linear-gradient(to right, rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.05) 1px, transparent 1px)",
        "canvas-grid-inverse":
          "linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
