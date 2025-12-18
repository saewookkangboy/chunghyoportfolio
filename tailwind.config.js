/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans KR"', '"IBM Plex Sans"', '"Noto Sans KR"', '"Noto Sans JP"', 'sans-serif'],
      },
      colors: {
        primary: '#2563eb',
        secondary: '#475569',
        background: '#f8fafc',
      }
    },
  },
  plugins: [],
}

