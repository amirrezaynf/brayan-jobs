/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: {
          DEFAULT: "#000000",
          dark: "#000000",
        },
        foreground: {
          DEFAULT: "#d1d5db",
        },
        border: {
          DEFAULT: "#374151",
        },
        input: {
          DEFAULT: "#2a2a2a",
        },
        ring: {
          DEFAULT: "#facc15",
        },
        yellow: {
          400: "#facc15",
          500: "#eab308",
        },
        gray: {
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      fontFamily: {
        sans: ["var(--font-Yekan)", "Tahoma", "sans-serif"],
        yekan: ["Yekan Bakh", "Tahoma", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
