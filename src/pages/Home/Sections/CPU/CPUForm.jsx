import React, { useState } from 'react';
import { DeviceInfoFields, AssignmentFields } from '../Common/CommonFields';
import Icon from '../../../../Components/Common/Icon';

const CPUForm = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        expediente: '',
        serie: '',
        marca: '',
        modelo: '',
        tipo: 'CPU', // Se mantiene por defecto, pero ahora es editable
        ip: '',
        hostname: '',
        correoOffice: '', // Nuevo campo
        usuario: '',
        area: '',
        subarea: '',    // Nuevo campo
        empresa: '',
        sitio: '',      // Nuevo campo
        status: 'Activo',
        sigtig: false   // Nuevo campo (boolean)
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSave) onSave(formData);
        onClose();
    };

    return (
        <div className="animate-in slide-in-from-top-4 duration-300 mb-8">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-100 overflow-hidden">
                {/* Header del Panel */}
                <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-ui-accent/10 rounded-lg text-ui-accent">
                            <Icon name="plus" className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-ui-primary tracking-tight">Nuevo Registro</h3>
                            <p className="text-xxs text-slate-400 font-bold uppercase tracking-widest">Información Técnica de CPU</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full text-slate-400 transition-all"
                    >
                        ✕
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* Campos Base (Expediente, Serie, Marca, Modelo) */}
                        <DeviceInfoFields formData={formData} handleChange={handleChange} />

                        {/* Nuevo Campo: Tipo de Equipo */}
                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Tipo</label>
                            <select 
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleChange}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none"
                            >
                                <option value="CPU">CPU</option>
                                <option value="LAPTOP">LAPTOP</option>
                                <option value="SERVIDOR">SERVIDOR</option>
                            </select>
                        </div>
                        
                        {/* Red e Identificación Técnica */}
                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-accent uppercase tracking-wider pl-1">Dirección IP</label>
                            <input 
                                name="ip"
                                value={formData.ip}
                                onChange={handleChange}
                                className="w-full p-2.5 bg-slate-50 border border-ui-accent/20 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none font-mono"
                                placeholder="0.0.0.0"
                            />
                        </div>
                        
                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-accent uppercase tracking-wider pl-1">Hostname</label>
                            <input 
                                name="hostname"
                                value={formData.hostname}
                                onChange={handleChange}
                                className="w-full p-2.5 bg-slate-50 border border-ui-accent/20 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none font-mono uppercase"
                                placeholder="PC-HOST"
                            />
                        </div>

                        {/* Nuevo Campo: Correo Office */}
                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Correo Office</label>
                            <input 
                                name="correoOffice"
                                value={formData.correoOffice}
                                onChange={handleChange}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none"
                                placeholder="usuario@empresa.com"
                            />
                        </div>

                        {/* Asignación (Usuario, Área, Empresa) */}
                        <AssignmentFields formData={formData} handleChange={handleChange} />

                        {/* Nuevo Campo: Sub-área */}
                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Sub-área</label>
                            <input 
                                name="subarea"
                                value={formData.subarea}
                                onChange={handleChange}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none"
                                placeholder="Depto. Específico"
                            />
                        </div>

                        {/* Nuevo Campo: Sitio / Ubicación Física */}
                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Sitio</label>
                            <input 
                                name="sitio"
                                value={formData.sitio}
                                onChange={handleChange}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none"
                                placeholder="Edificio / Piso"
                            />
                        </div>

                        {/* Nuevo Campo: Status */}
                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Status</label>
                            <select 
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none"
                            >
                                <option value="Activo">Activo</option>
                                <option value="Mantenimiento">Mantenimiento</option>
                                <option value="Baja">Baja</option>
                                <option value="Stock">Stock</option>
                            </select>
                        </div>

                        {/* Nuevo Campo: Switch SIGTIG */}
                        <div className="flex items-center gap-3 pt-6 pl-1">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    name="sigtig"
                                    checked={formData.sigtig}
                                    onChange={handleChange}
                                    className="sr-only peer" 
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                            <span className="text-form-label font-black text-slate-700 uppercase">SIGTIG</span>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end items-center gap-4">
                        <span className="text-xxs text-slate-400 italic">Todos los campos son obligatorios para el registro administrativo.</span>
                        <div className="flex gap-3">
                            <button 
                                type="button"
                                onClick={onClose} 
                                className="px-6 py-2.5 text-xs font-black text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                CANCELAR
                            </button>
                            <button 
                                type="submit"
                                className="px-8 py-2.5 bg-ui-primary text-white rounded-xl text-xs font-black shadow-lg shadow-ui-primary/20 hover:shadow-ui-primary/40 active:scale-95 transition-all"
                            >
                                GUARDAR EQUIPO
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CPUForm;