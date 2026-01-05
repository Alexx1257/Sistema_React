import React, { useState, useEffect } from 'react';
import Icon from '../../../../Components/Common/Icon';

const EmployeeForm = ({ onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        correoElectronico: '',
        cisco: '',
        area: '',
        subarea: '',
        status: 'Activo'
    });

    // Código nuevo: Carga los datos iniciales si se recibe la prop initialData (Modo Edición)
    useEffect(() => {
        if (initialData) {
            setFormData({
                nombreCompleto: initialData.nombreCompleto || '',
                correoElectronico: initialData.correoElectronico || '',
                cisco: initialData.cisco || '',
                area: initialData.area || '',
                subarea: initialData.subarea || '',
                status: initialData.status || 'Activo'
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Regla: Nombre, Área y Subárea solo letras y espacios, máx 50 caracteres
        if (['nombreCompleto', 'area', 'subarea'].includes(name)) {
            const onlyLetters = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
            if (onlyLetters.length <= 50) {
                setFormData(prev => ({ ...prev, [name]: onlyLetters }));
            }
            return;
        }

        // Regla: Extensión Cisco solo números
        if (name === 'cisco') {
            const onlyNumbers = value.replace(/\D/g, '');
            setFormData(prev => ({ ...prev, [name]: onlyNumbers }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación de formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.correoElectronico)) {
            alert("Por favor, ingrese un correo electrónico válido.");
            return;
        }

        // Validación de campos obligatorios básicos
        if (!formData.nombreCompleto || !formData.area) {
            alert("Por favor, complete los campos obligatorios.");
            return;
        }

        if (onSave) onSave(formData);
        onClose();
    };

    return (
        <div className="animate-in slide-in-from-top-4 duration-300 mb-8">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-100 overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${initialData ? 'bg-blue-50 text-blue-600' : 'bg-ui-accent/10 text-ui-accent'}`}>
                            {/* Código modificado: Icono cambia según el modo */}
                            <Icon name={initialData ? "settings" : "plus"} className="w-5 h-5" />
                        </div>
                        <div>
                            {/* Código modificado: Título dinámico */}
                            <h3 className="text-lg font-black text-ui-primary tracking-tight">
                                {initialData ? 'Editar Empleado' : 'Nuevo Empleado'}
                            </h3>
                            <p className="text-xxs text-slate-400 font-bold uppercase tracking-widest">Directorio de Personal</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full text-slate-400 transition-all">✕</button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Nombre Completo</label>
                            <input 
                                name="nombreCompleto" 
                                value={formData.nombreCompleto} 
                                onChange={handleChange} 
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none" 
                                placeholder="Solo letras (máx 50)" 
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Correo Electrónico</label>
                            <input 
                                type="email"
                                name="correoElectronico" 
                                value={formData.correoElectronico} 
                                onChange={handleChange} 
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none" 
                                placeholder="ejemplo@empresa.com" 
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-accent uppercase tracking-wider pl-1">Extensión Cisco</label>
                            <input 
                                name="cisco" 
                                value={formData.cisco} 
                                onChange={handleChange} 
                                className="w-full p-2.5 bg-slate-50 border border-ui-accent/20 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none font-mono" 
                                placeholder="Solo números" 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Área</label>
                            <input 
                                name="area" 
                                value={formData.area} 
                                onChange={handleChange} 
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none" 
                                placeholder="Solo letras (máx 50)" 
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Sub-área</label>
                            <input 
                                name="subarea" 
                                value={formData.subarea} 
                                onChange={handleChange} 
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none" 
                                placeholder="Solo letras (máx 50)" 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none">
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-6 py-2.5 text-xs font-black text-slate-400 hover:text-slate-600 transition-colors">CANCELAR</button>
                        <button type="submit" className="px-8 py-2.5 bg-ui-primary text-white rounded-xl text-xs font-black shadow-lg shadow-ui-primary/20 hover:shadow-ui-primary/40 active:scale-95 transition-all">
                            {/* Código modificado: Texto del botón dinámico */}
                            {initialData ? 'ACTUALIZAR DATOS' : 'GUARDAR EMPLEADO'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeForm;