/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#288DFF",
          50: "#EFF6FF",
          100: "#DCEBFF",
          200: "#B7D7FF",
          300: "#85BBFF",
          400: "#559EFF",
          500: "#288DFF",
          600: "#1C6FE0",
          700: "#1655B3",
          800: "#123F82",
          900: "#0F2E5C",
        },
        ink: {
          DEFAULT: "#0B1220",
          secondary: "#4B5563",
          muted: "#6B7280",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        serif: ["Fraunces", "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16, 24, 40, 0.06)",
        card: "0 4px 20px rgba(16, 24, 40, 0.08)",
        glow: "0 0 0 1px rgba(40,141,255,0.08), 0 8px 30px rgba(40,141,255,0.16)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      maxWidth: {
        content: "1180px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pop: {
          "0%": { opacity: "0.4", transform: "scale(0.97) translateY(4px)" },
          "60%": { opacity: "1", transform: "scale(1.01) translateY(0)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "33%": { transform: "translate(18px, -22px) rotate(6deg)" },
          "66%": { transform: "translate(-14px, 14px) rotate(-4deg)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-20px, 20px) scale(1.05)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.3)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
        pop: "pop 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        float: "float 9s ease-in-out infinite",
        floatSlow: "floatSlow 14s ease-in-out infinite",
        pulseDot: "pulseDot 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
