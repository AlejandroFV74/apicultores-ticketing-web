/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F5F0E6",
          dark: "#EAE2D2",
        },
        ink: {
          DEFAULT: "#1C1A17",
          soft: "#4A453D",
        },
        stub: {
          DEFAULT: "#D9782A",
          dark: "#B85F1B",
          light: "#F0A769",
        },
        stamp: {
          green: "#3F6B4F",
          red: "#A33B2E",
        },
      },
      fontFamily: {
        display: ["'Oswald'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        "ticket-notch":
          "radial-gradient(circle at 0 0, transparent 8px, #F5F0E6 8.5px)",
      },
    },
  },
  plugins: [],
};
