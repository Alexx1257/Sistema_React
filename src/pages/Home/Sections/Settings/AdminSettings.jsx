import React, { useState } from 'react';
import CatalogSection from './CatalogSection'; // Asegúrate de que la ruta coincida
import SiteSettings from './SiteSettings';       // Asegúrate de que la ruta coincida
import Icon from '../../../../Components/Common/Icon';

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState('catalog');

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Cabecera del Panel */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-ui-primary tracking-tight">Panel de Administración</h1>
                        <p className="text-slate-500 font-medium text-sm">Gestiona los parámetros globales del sistema de inventario</p>
                    </div>

                    {/* Selector de Pestañas */}
                    <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
                        <button
                            onClick={() => setActiveTab('catalog')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
                                activeTab === 'catalog' 
                                ? 'bg-ui-primary text-white shadow-lg shadow-ui-primary/20' 
                                : 'text-slate-500 hover:bg-slate-50'
                            }`}
                        >
                            <Icon name="device" className="w-4 h-4" />
                            CATÁLOGO
                        </button>
                        <button
                            onClick={() => setActiveTab('sites')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
                                activeTab === 'sites' 
                                ? 'bg-ui-primary text-white shadow-lg shadow-ui-primary/20' 
                                : 'text-slate-500 hover:bg-slate-50'
                            }`}
                        >
                            <Icon name="settings" className="w-4 h-4" />
                            SITIOS Y RED
                        </button>
                    </div>
                </div>

                {/* Contenedor Dinámico */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {activeTab === 'catalog' ? (
                        <div className="bg-transparent">
                            <CatalogSection />
                        </div>
                    ) : (
                        <div className="bg-transparent">
                            <SiteSettings />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;