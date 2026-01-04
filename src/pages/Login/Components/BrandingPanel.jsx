import React from 'react';

const BrandingPanel = () => {
  return (
    <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-sidebar-backgroundStart to-sidebar-backgroundEnd p-16 flex-col justify-between text-white relative overflow-hidden">
      
      {/* Elementos decorativos de fondo (Luces) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-ui-accent/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-ui-primary/30 rounded-full blur-[80px]"></div>

      {/* Contenedor Superior: Logo y Títulos */}
      <div className="relative z-10">
        {/* Logo Principal con Efecto Glassmorphism */}
        <div className="bg-white/10 w-24 h-24 rounded-3xl flex items-center justify-center mb-12 backdrop-blur-xl border border-white/20 shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <svg className="w-14 h-14 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>

        {/* Textos de Bienvenida */}
        <div className="space-y-4">
          <h1 className="text-6xl font-black leading-none tracking-tighter">
            Sistema Integral <br /> <span className="text-ui-accent">del Área de Informatica</span>
          </h1>
          <div className="w-24 h-2 bg-gradient-to-r from-ui-accent to-transparent rounded-full"></div>
          
        </div>
      </div>

      {/* Contenedor Inferior: Información del Sistema */}
      <div className="relative z-10">
        <div className="flex items-center space-x-6 text-sm font-semibold tracking-wide text-blue-200/60 uppercase">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span>Servidor Activo</span>
          </div>
          <div className="w-1 h-1 bg-white/20 rounded-full"></div>
          <span>Versión 2.1.0</span>
        </div>
      </div>
    </div>
  );
};

export default BrandingPanel;