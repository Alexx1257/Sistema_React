import React, { useState } from 'react';
import Icon from '../../../../Components/Common/Icon';

const InventoryLayout = ({ 
    title, 
    subtitle, 
    searchTerm = '', 
    setSearchTerm = () => {}, 
    filters = {},       
    setFilters = () => {}, 
    // Aseguramos que sitios esté inicializado para evitar errores de renderizado
    filterOptions = { marcas: [], areas: [], subareas: [], sitios: [] }, 
    onExportExcel, 
    onExportPDF, 
    onAdd,
    addButtonText = "Añadir Equipo",
    filterType = "inventory",
    children 
}) => {
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="animate-in fade-in duration-500 space-y-6">
            {/* Cabecera */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-ui-primary tracking-tight">{title}</h2>
                    <p className="text-ui-textMuted text-sm font-medium">{subtitle}</p>
                </div>

                {onAdd && (
                    <button 
                        onClick={onAdd}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-ui-accent hover:bg-opacity-90 text-white rounded-2xl text-sm font-black transition-all shadow-lg shadow-ui-accent/20 active:scale-95"
                    >
                        <Icon name="plus" className="w-5 h-5" /> 
                        <span>{addButtonText}</span>
                    </button>
                )}
            </div>

            {/* Barra de Herramientas */}
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200 overflow-hidden">
                <div className="p-5 flex flex-col md:flex-row gap-4 items-center justify-between bg-white">
                    <div className="relative w-full md:w-96 group">
                        <input
                            type="text"
                            placeholder="Búsqueda rápida..."
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-ui-accent focus:ring-4 focus:ring-ui-accent/10 transition-all text-sm font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Icon name="search" className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button 
                            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold transition-all border ${
                                isAdvancedOpen 
                                ? 'bg-ui-primary text-white border-ui-primary shadow-lg shadow-ui-primary/20' 
                                : 'bg-white text-ui-primary border-slate-200 hover:bg-slate-50'
                            }`}
                        >
                            <Icon name="settings" className="w-4 h-4" />
                            <span>Filtros</span>
                        </button>

                        <div className="h-8 w-px bg-slate-200 mx-1 hidden md:block"></div>

                        <button onClick={onExportExcel} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-green-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-green-200 active:scale-95 transition-all">
                            <Icon name="documents" className="w-4 h-4" /> <span>Excel</span>
                        </button>
                        
                        <button onClick={onExportPDF} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-red-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-red-200 active:scale-95 transition-all">
                            <Icon name="notes" className="w-4 h-4" /> <span>PDF</span>
                        </button>
                    </div>
                </div>

                {/* Panel Avanzado de Filtros */}
                <div className={`
                    grid grid-cols-1 ${filterType === "employees" ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-6 px-6 overflow-hidden transition-all duration-300 ease-in-out bg-slate-50/50
                    ${isAdvancedOpen ? 'py-6 border-t border-slate-100 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                    {filterType === "inventory" ? (
                        <>
                            {/* Filtros para Secciones de Inventario (CPU, Monitores) */}
                            <div className="space-y-2">
                                <label className="text-form-label font-black text-ui-primary uppercase tracking-widest pl-1">Marca</label>
                                <select 
                                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs-table font-medium outline-none focus:ring-2 focus:ring-ui-accent/20"
                                    value={filters?.marca || ''}
                                    onChange={(e) => handleFilterChange('marca', e.target.value)}
                                >
                                    <option value="">Todas las marcas</option>
                                    {filterOptions?.marcas?.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-form-label font-black text-ui-primary uppercase tracking-widest pl-1">Área</label>
                                <select 
                                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs-table font-medium outline-none focus:ring-2 focus:ring-ui-accent/20"
                                    value={filters?.area || ''}
                                    onChange={(e) => handleFilterChange('area', e.target.value)}
                                >
                                    <option value="">Todas las áreas</option>
                                    {filterOptions?.areas?.map(a => <option key={a} value={a}>{a}</option>)}
                                </select>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Filtros para la Sección de Empleados */}
                            <div className="space-y-2">
                                <label className="text-form-label font-black text-ui-primary uppercase tracking-widest pl-1">Área</label>
                                <select 
                                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs-table font-medium outline-none focus:ring-2 focus:ring-ui-accent/20"
                                    value={filters?.area || ''}
                                    onChange={(e) => handleFilterChange('area', e.target.value)}
                                >
                                    <option value="">Todas las áreas</option>
                                    {filterOptions?.areas?.map(a => <option key={a} value={a}>{a}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-form-label font-black text-ui-primary uppercase tracking-widest pl-1">Sub-Área</label>
                                <select 
                                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs-table font-medium outline-none focus:ring-2 focus:ring-ui-accent/20"
                                    value={filters?.subarea || ''}
                                    onChange={(e) => handleFilterChange('subarea', e.target.value)}
                                >
                                    <option value="">Todas las sub-áreas</option>
                                    {filterOptions?.subareas?.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-form-label font-black text-ui-primary uppercase tracking-widest pl-1">Sitio</label>
                                <select 
                                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs-table font-medium outline-none focus:ring-2 focus:ring-ui-accent/20"
                                    value={filters?.sitio || ''}
                                    onChange={(e) => handleFilterChange('sitio', e.target.value)}
                                >
                                    <option value="">Todos los sitios</option>
                                    {/* Sincronización con la colección 'sites' de Firebase */}
                                    {filterOptions?.sitios?.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-form-label font-black text-ui-primary uppercase tracking-widest pl-1">Correo</label>
                                <input 
                                    type="text"
                                    placeholder="Dominio o usuario..."
                                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs-table font-medium outline-none focus:ring-2 focus:ring-ui-accent/20"
                                    value={filters?.correo || ''}
                                    onChange={(e) => handleFilterChange('correo', e.target.value)}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>

            {children}
        </div>
    );
};

export default InventoryLayout;