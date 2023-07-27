/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'lightblue': '#3C83B6',
        'blue': '#05548B',
        'yellow': '#D99900',
        'orange': '#D94E00',
        'amber': '#D97B00',
    },
    fontFamily: {
      main: ['"Public Sans"', 'sans-serif'],
    },
    keyframes: {
      continuous: {
        '0%': {
        transform: 'translateX(100%)'},
        '100%': { 
        transform: 'translateX(-100%)'},
      } 
    },
    animation: {
      continuous: 'continuous 20s cubic-bezier(1, 1, 1, 1) infinite',
    },
  },
  plugins: [],
  },
}