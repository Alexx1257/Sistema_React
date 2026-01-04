/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nueva paleta Azul Marino Profesional
        ui: {
          primary: '#0f172a',       // Azul marino muy oscuro (Slate-900) para textos y botones base
          primaryHover: '#1e293b',  // Un tono ligeramente más claro para hover
          accent: '#3b82f6',        // Azul brillante para detalles que deban resaltar
          textMuted: '#64748b',     // Gris azulado para textos secundarios
        },
        sidebar: {
          backgroundStart: '#1e293b', // Slate-800 para el inicio del degradado
          backgroundEnd: '#0f172a',   // Slate-900 para el final (Azul profundo)
          itemActive: '#334155',      // Color de fondo para ítems activos en el menú
        }
      },
      // Añadimos una animación suave para que el cambio de colores se vea premium
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}