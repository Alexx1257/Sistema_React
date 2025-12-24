/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nombres semánticos para identificar el uso de cada color
        ui: {
          primary: '#2563eb',       // Color principal (botones, iconos clave)
          primaryHover: '#1d4ed8',  // Color al pasar el mouse por elementos principales
          accent: '#60a5fa',        // Color de acento (bordes de foco, detalles)
          textMuted: '#60a5fa',     // Texto secundario o decorativo
        },
        sidebar: {
          backgroundStart: '#1e40af', // Inicio del degradado del menú lateral
          backgroundEnd: '#1e3a8a',   // Fin del degradado y fondos oscuros
        }
      },
    },
  },
  plugins: [],
}