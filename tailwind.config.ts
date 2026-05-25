import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-elevated": "var(--bg-elevated)",
        "text-main": "var(--text-main)",
        "text-muted": "var(--text-muted)",
        "brand-gold": "var(--brand-gold)",
        "brand-teal": "var(--brand-teal)",
        hairline: "var(--hairline)",
      },
      fontFamily: {
        display: ["var(--font-el-messiri)", "var(--font-heebo)", "sans-serif"],
        body: ["var(--font-assistant)", "var(--font-inter)", "sans-serif"],
      },
      spacing: {
        section: "clamp(6rem, 14vw, 16rem)",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "logo-scroll": "logo-scroll 50s linear infinite",
        "scroll-line": "scroll-line 2s cubic-bezier(0.16, 1, 0.3, 1) infinite",
      },
      keyframes: {
        "logo-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scroll-line": {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "50%": { transform: "scaleY(1)", transformOrigin: "top" },
          "51%": { transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
      },
    },
  },
};

export default config;
