import React, { useState } from 'react';
import { DeviceInfoFields, AssignmentFields } from '../Common/CommonFields';
import Icon from '../../../../Components/Common/Icon';

const MonitorForm = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        expediente: '',
        serie: '',
        marca: '',
        modelo: '',
        pulgadas: '', // Campo único de monitores
        usuario: '',
        area: '',
        empresa: '',
        status: 'Activo',
        sigtig: false
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
                <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-ui-accent/10 rounded-lg text-ui-accent">
                            <Icon name="plus" className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-ui-primary tracking-tight">Nuevo Monitor</h3>
                            <p className="text-xxs text-slate-400 font-bold uppercase tracking-widest">Inventario de Periféricos</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full text-slate-400 transition-all">✕</button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <DeviceInfoFields formData={formData} handleChange={handleChange} />
                        
                        {/* Campo único: Pulgadas */}
                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-accent uppercase tracking-wider pl-1">Pulgadas</label>
                            <input 
                                name="pulgadas"
                                value={formData.pulgadas}
                                onChange={handleChange}
                                className="w-full p-2.5 bg-slate-50 border border-ui-accent/20 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none"
                                placeholder='Ej: 24"'
                            />
                        </div>

                        <AssignmentFields formData={formData} handleChange={handleChange} />

                        <div className="flex items-center gap-3 pt-6 pl-1">
                            {/* Corrección: Se agregó el símbolo < antes de label */}
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="sigtig" checked={formData.sigtig} onChange={handleChange} className="sr-only peer" />
                                <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                            </label>
                            <span className="text-form-label font-black text-slate-700 uppercase">SIGTIG</span>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-6 py-2.5 text-xs font-black text-slate-400 hover:text-slate-600">CANCELAR</button>
                        <button type="submit" className="px-8 py-2.5 bg-ui-primary text-white rounded-xl text-xs font-black shadow-lg shadow-ui-primary/20">GUARDAR MONITOR</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MonitorForm;