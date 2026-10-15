/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#050b14',
        amberGlow: '#f59e0b',
        electricCyan: '#38bdf8',
      },
    },
  },
  plugins: [],
}