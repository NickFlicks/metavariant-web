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
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
