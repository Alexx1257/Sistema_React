import React from 'react';

const BrandingPanel = () => {
    return (
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-900 p-16 flex-col justify-between text-white relative overflow-hidden">
            {/* Decoración sutil de fondo */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-10 backdrop-blur-md border border-white/30">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                </div>
                <h1 className="text-5xl font-black mb-6 leading-tight tracking-tight">
                    Sistema de <br /> Gestión Interna
                </h1>
                <div className="w-20 h-1.5 bg-blue-400 mb-8 rounded-full"></div>
                <p className="text-blue-100 text-xl leading-relaxed max-w-sm opacity-90 font-light">
                    Plataforma centralizada para el control operativo del Departamento de Informática.
                </p>
            </div>

            <div className="relative z-10 flex items-center gap-4 text-sm text-blue-200/80">
                <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Sistema Operativo
                </span>
                <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                <span>v2.1.0</span>
            </div>
        </div>
    );
};

export default BrandingPanel;