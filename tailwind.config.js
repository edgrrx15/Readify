/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js", "./screens/HomeScreen.js", "./<custom directory>/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'color-texto': '#faf9f6',
      }
    },
  },
  plugins: [],
}

