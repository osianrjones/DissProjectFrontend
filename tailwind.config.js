/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        pulse: "pulse 2s infinite ease-in-out",
      },
      minHeight: {
        '1/2': '50vh',
      }
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
      pulse: {
        "0%": { transform: "scale(1)" },
        "50%": { transform: "scale(1.2)" },
        "100%": { transform: "scale(1)" },
      }
    },
  },
  plugins: [],
}

