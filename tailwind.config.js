/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores personalizados basados en tu diseño actual
        brand: {
          light: '#60a5fa',   // Equivalente a blue-400
          DEFAULT: '#2563eb', // Equivalente a blue-600 (Principal)
          dark: '#1d4ed8',    // Equivalente a blue-700
          navy: '#1e3a8a',    // Equivalente a blue-900 (Sidebar)
        },
        sidebar: {
          start: '#1e40af',   // blue-800
          end: '#1e3a8a',     // blue-900
        }
      },
    },
  },
  plugins: [],
}