/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e3f2fd",
          100: "#bbdefb",
          200: "#90caf9",
          300: "#64b5f6",
          400: "#42a5f5",
          500: "#2196f3",
          600: "#1e88e5",
          700: "#1976d2",
          800: "#1565c0",
          900: "#0d47a1",
        },
        secondary: {
          500: "#0b74d1",
          600: "#0d5ba8",
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-out",
        slideDown: "slideDown 0.4s ease-out",
        slideInModal: "slideInModal 0.2s ease-out",
        ripple: "ripple 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInModal: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.6" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
      },
      boxShadow: {
        xs: "0 1px 2px rgba(0, 0, 0, 0.05)",
        sm: "0 2px 8px rgba(0, 0, 0, 0.08)",
        md: "0 4px 16px rgba(0, 0, 0, 0.12)",
        lg: "0 8px 32px rgba(0, 0, 0, 0.15)",
        xl: "0 20px 48px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
