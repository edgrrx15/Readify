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
        'color-blanco': '#faf6f9', 
        'color-negro': '#faf6f9', 
      },
    },
  },
  plugins: [],
};
