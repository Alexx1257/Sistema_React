import React from 'react';

// Componente para información básica del dispositivo
export const DeviceInfoFields = ({ formData, handleChange }) => (
    <>
        <div className="space-y-1">
            <label className="text-[10px] font-black text-ui-primary uppercase tracking-wider pl-1">Expediente</label>
            <input 
                name="expediente"
                value={formData.expediente || ''}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-ui-accent/20 outline-none transition-all" 
                placeholder="Ej: EXP-101"
            />
        </div>
        <div className="space-y-1">
            <label className="text-[10px] font-black text-ui-primary uppercase tracking-wider pl-1">Serie / SN</label>
            <input 
                name="serie"
                value={formData.serie || ''}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-ui-accent/20 outline-none transition-all"
                placeholder="Número de serie"
            />
        </div>
        <div className="space-y-1">
            <label className="text-[10px] font-black text-ui-primary uppercase tracking-wider pl-1">Marca</label>
            <input 
                name="marca"
                value={formData.marca || ''}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-ui-accent/20 outline-none transition-all"
                placeholder="Ej: HP, Dell..."
            />
        </div>
        <div className="space-y-1">
            <label className="text-[10px] font-black text-ui-primary uppercase tracking-wider pl-1">Modelo</label>
            <input 
                name="modelo"
                value={formData.modelo || ''}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-ui-accent/20 outline-none transition-all"
                placeholder="Nombre del modelo"
            />
        </div>
    </>
);

// Componente para datos de asignación
export const AssignmentFields = ({ formData, handleChange }) => (
    <>
        <div className="space-y-1">
            <label className="text-[10px] font-black text-ui-primary uppercase tracking-wider pl-1">Usuario</label>
            <input 
                name="usuario"
                value={formData.usuario || ''}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-ui-accent/20 outline-none transition-all"
                placeholder="Nombre del empleado"
            />
        </div>
        <div className="space-y-1">
            <label className="text-[10px] font-black text-ui-primary uppercase tracking-wider pl-1">Área</label>
            <input 
                name="area"
                value={formData.area || ''}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-ui-accent/20 outline-none transition-all"
                placeholder="Departamento"
            />
        </div>
        <div className="space-y-1">
            <label className="text-[10px] font-black text-ui-primary uppercase tracking-wider pl-1">Empresa</label>
            <select 
                name="empresa"
                value={formData.empresa || ''}
                onChange={handleChange}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-ui-accent/20 outline-none transition-all"
            >
                <option value="">Seleccionar empresa</option>
                <option value="Empresa A">Empresa A</option>
                <option value="Empresa B">Empresa B</option>
            </select>
        </div>
    </>
);