/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {

    extend: {
      
      // 3. COLORS: Definición de la paleta de colores institucional
      colors: {
        ui: {
          primary: '#0f172a',       // Azul marino profundo (Slate-900) para textos y botones principales.
          primaryHover: '#1e293b',  // Color de interacción para botones (Slate-800).
          accent: '#3b82f6',        // Azul brillante (Blue-500) para resaltar enlaces, iconos o bordes.
          textMuted: '#64748b',     // Gris azulado (Slate-500) para textos secundarios o descripciones.
        },
        sidebar: {
          backgroundStart: '#1e293b', // Inicio del degradado del menú lateral.
          backgroundEnd: '#0f172a',   // Final del degradado del menú lateral.
          itemActive: '#334155',      // Fondo para el botón de la sección donde te encuentras.
        }
      },

      // 4. FONT SIZE: Control centralizado de los tamaños de letra
      fontSize: {
        'xs-table': ['14px', '18px'],    // Para el contenido de las tablas (Nombres de empleados, etc.).
        'xxs': ['14px', '15px'],        // Para datos técnicos como Cisco, Series o Hostnames.
        'tiny': ['10px', '13px'],       // Para badges pequeños (Status, Empresa, SIGTIG).
        'form-label': ['12px', '15px'], // Para los títulos de los campos en los formularios.
      },

      // 5. FONT WEIGHT: Pesos de fuente personalizados
      fontWeight: {
        'black': '900',
      },

      // 6. ANIMATION: Definición de movimientos suaves
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
      },

      // 7. KEYFRAMES: Los pasos técnicos de las animaciones
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },

  // 8. PLUGINS: Extensiones adicionales

  plugins: [],
}