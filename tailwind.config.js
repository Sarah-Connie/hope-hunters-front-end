/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'blue': '#05548B',
        'yellow': '#D99900',
        'orange': '#D94E00',
        'amber': '#D97B00',
    },
    fontFamily: {
      main: ['"Public Sans"', 'sans-serif'],
    },
  },
  plugins: [],
  },
}