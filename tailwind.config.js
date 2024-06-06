module.exports = {
  content: [
    "./App.js",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**.{js,jsx,ts,tsx}", 
    "./navigation/**.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'color-blanco': '#E6FFFD', 
        'color-negro': '#121212', 
        'color-fondo': '#B799FF',
        'color-blue': '#ACBCFF',
        'color-light-blue': '#AEE2FF',
      },
    },
  },
  plugins: [],
};
