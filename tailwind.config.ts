/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables dark mode via class
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#ffffff",
        gray: {
          900: "#121212",
          800: "#1e1e1e",
          700: "#2e2e2e",
          600: "#3e3e3e",
          500: "#525252",
          400: "#737373",
          300: "#a3a3a3",
          200: "#d4d4d4",
          100: "#e5e5e5",
          50: "#f5f5f5",
        },
      },
    },
  },
  plugins: [],
};
