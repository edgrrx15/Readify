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
        'color-blanco': '#FFFFF0', 
        'color-negro': '#0B1215', 
        'input' : '#fffff7',
        'naranja': '#FFA500',
      },
    },
  },
  plugins: [],
};
