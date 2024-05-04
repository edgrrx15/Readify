module.exports = {
  content: [
    "./App.js", // Archivo principal
    "./components/**/*.{js,jsx,ts,tsx}", // Incluye todos los componentes
    "./screens/**/*.{js,jsx,ts,tsx}", // Incluye todas las pantallas
    "./navigation/**/*.{js,jsx,ts,tsx}", // Incluye todo el sistema de navegación
  ],
  theme: {
    extend: {
      colors: {
        'color-texto': '#faf9f6', // Tu color personalizado
      },
    },
  },
  plugins: [],
};
