import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#07070d",
        card: "rgba(13, 13, 24, 0.75)",
        surface: "rgba(22, 22, 38, 0.65)",
        border: "rgba(139, 92, 246, 0.2)",
        neuro: {
          purple: {
            DEFAULT: "#8b5cf6",
            light: "#a78bfa",
            dark: "#6d28d9",
            deep: "#4c1d95",
            glow: "rgba(139, 92, 246, 0.35)",
          },
          cyan: {
            DEFAULT: "#06b6d4",
            light: "#22d3ee",
            dark: "#0891b2",
            glow: "rgba(6, 182, 212, 0.35)",
          },
          emerald: {
            DEFAULT: "#10b981",
            light: "#34d399",
            dark: "#059669",
          },
          rose: {
            DEFAULT: "#f43f5e",
            light: "#fb7185",
            dark: "#e11d48",
          },
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.45)",
        "purple-glow": "0 0 25px rgba(139, 92, 246, 0.4)",
        "cyan-glow": "0 0 25px rgba(6, 182, 212, 0.4)",
        "pin-glow": "0 0 15px rgba(139, 92, 246, 0.6), 0 0 30px rgba(6, 182, 212, 0.3)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
