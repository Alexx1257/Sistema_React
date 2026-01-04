import React, { useState } from 'react';
import Icon from '../../../../Components/Common/Icon';

const InventoryLayout = ({ 
    title, 
    subtitle, 
    searchTerm = '', 
    setSearchTerm = () => {}, 
    filters = {},       // Valor por defecto para evitar error de undefined
    setFilters = () => {}, 
    filterOptions = { marcas: [], areas: [] }, 
    onExportExcel, 
    onExportPDF, 
    onAdd,              // Código nuevo: Propiedad para la acción de añadir
    children 
}) => {
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="animate-fade-in space-y-6">
            {/* Cabecera */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-ui-primary tracking-tight">{title}</h2>
                    <p className="text-ui-textMuted text-sm font-medium">{subtitle}</p>
                </div>

                {/* Código nuevo: Botón para añadir equipos */}
                {onAdd && (
                    <button 
                        onClick={onAdd}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-ui-accent hover:bg-opacity-90 text-white rounded-2xl text-sm font-black transition-all shadow-lg shadow-ui-accent/20 active:scale-95"
                    >
                        <Icon name="plus" className="w-5 h-5" /> 
                        <span>Añadir Equipo</span>
                    </button>
                )}
            </div>

            {/* Barra de Herramientas */}
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200 overflow-hidden">
                <div className="p-5 flex flex-col md:flex-row gap-4 items-center justify-between bg-white">
                    {/* Buscador */}
                    <div className="relative w-full md:w-96 group">
                        <input
                            type="text"
                            placeholder="Búsqueda rápida..."
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-ui-accent focus:ring-4 focus:ring-ui-accent/10 transition-all text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Icon name="search" className="absolute left-4 top-3.5 w-4 h-4 text-slate-400 transition-colors" />
                    </div>

                    {/* Acciones */}
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

                        <button 
                            onClick={onExportExcel}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-sm font-bold transition-all shadow-lg shadow-green-200 active:scale-95"
                        >
                            <Icon name="documents" className="w-4 h-4" /> <span>Excel</span>
                        </button>
                        
                        <button 
                            onClick={onExportPDF}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-sm font-bold transition-all shadow-lg shadow-red-200 active:scale-95"
                        >
                            <Icon name="notes" className="w-4 h-4" /> <span>PDF</span>
                        </button>
                    </div>
                </div>

                {/* Panel Avanzado */}
                <div className={`
                    grid grid-cols-1 md:grid-cols-3 gap-6 px-6 overflow-hidden transition-all duration-300 ease-in-out bg-slate-50/50
                    ${isAdvancedOpen ? 'py-6 border-t border-slate-100 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-ui-primary uppercase tracking-widest pl-1">Marca</label>
                        <select 
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-ui-accent/20"
                            value={filters?.marca || ''}
                            onChange={(e) => handleFilterChange('marca', e.target.value)}
                        >
                            <option value="">Todas las marcas</option>
                            {filterOptions?.marcas?.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-ui-primary uppercase tracking-widest pl-1">Área</label>
                        <select 
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-ui-accent/20"
                            value={filters?.area || ''}
                            onChange={(e) => handleFilterChange('area', e.target.value)}
                        >
                            <option value="">Todas las áreas</option>
                            {filterOptions?.areas?.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-ui-primary uppercase tracking-widest pl-1">SIGTEG</label>
                        <div className="flex gap-2">
                            {['Todos', 'SÍ', 'NO'].map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => handleFilterChange('sigteg', opt === 'Todos' ? '' : opt === 'SÍ')}
                                    className={`flex-1 py-2 rounded-xl text-[10px] font-bold border transition-all ${
                                        (filters?.sigteg === (opt === 'SÍ') && opt !== 'Todos') || (filters?.sigteg === '' && opt === 'Todos')
                                        ? 'bg-ui-accent text-white border-ui-accent'
                                        : 'bg-white text-slate-500 border-slate-200 hover:border-ui-accent'
                                    }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {children}
        </div>
    );
};

export default InventoryLayout;