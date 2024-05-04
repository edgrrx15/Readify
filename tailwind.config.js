/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.js",  // Tu archivo principal
    "./components/**/*.{js,jsx,ts,tsx}",  // Incluye todos los archivos en components
    "./screens/Search.js/*.{js,jsx,ts,tsx}",  // Incluye todos los archivos en screens
    "./navigation/**/*.{js,jsx,ts,tsx}",  // Incluye todos los archivos en navigation
  ],
  theme: {
    extend: {
      colors: {
        'color-texto': '#faf9f6',
      }
    },
  },
  plugins: [],
}

