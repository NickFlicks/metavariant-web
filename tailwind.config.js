/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Matches the real logo exactly: the icon's rounded-square background
        // is #4F46E5 (this scale's 600/DEFAULT), sampled directly from the
        // logo file rather than picked separately.
        brand: {
          DEFAULT: "#4F46E5",
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },
        // The logo's third (center) circle, used sparingly as a secondary
        // accent so the variety-of-variants motif shows up off the icon too.
        accent: {
          DEFAULT: "#F97316",
          100: "#FFEDD5",
          300: "#FDBA74",
          500: "#F97316",
          600: "#EA580C",
        },
        ink: {
          DEFAULT: "#082834",
          secondary: "#284755",
          muted: "#425E70",
        },
        night: {
          950: "#020D10",
          900: "#071A1E",
          800: "#0B2429",
          700: "#123339",
          600: "#1B4750",
          border: "rgba(163,194,193,0.14)",
          text: "#EDF6F5",
          secondary: "#B9D4D2",
          muted: "#6E9A98",
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
        glow: "0 0 0 1px rgba(77,119,123,0.10), 0 8px 30px rgba(77,119,123,0.20)",
        glass: "0 8px 32px rgba(8, 40, 52, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
        glassLg: "0 20px 60px rgba(8, 40, 52, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
        glassDark: "0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
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
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradientPan: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        tiltIn: {
          "0%": { opacity: "0", transform: "perspective(800px) rotateX(6deg) translateY(16px)" },
          "100%": { opacity: "1", transform: "perspective(800px) rotateX(0deg) translateY(0)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(24px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
        pop: "pop 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        float: "float 9s ease-in-out infinite",
        floatSlow: "floatSlow 14s ease-in-out infinite",
        pulseDot: "pulseDot 1.8s ease-in-out infinite",
        shimmer: "shimmer 2.8s linear infinite",
        gradientPan: "gradientPan 8s ease-in-out infinite",
        tiltIn: "tiltIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        rise: "rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};
