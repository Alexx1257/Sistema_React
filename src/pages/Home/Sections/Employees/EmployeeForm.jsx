import React, { useState, useEffect } from 'react';
// Importación del hook de sitios y componentes de feedback
import { useSiteCatalog } from '../../../../hooks/useDeviceCatalog';
import Icon from '../../../../Components/Common/Icon';
import { toast } from 'sonner';

// Se añade la prop cpusExistentes para validación cruzada de IPs
const EmployeeForm = ({ onClose, onSave, initialData, existingEmployees = [], cpusExistentes = [] }) => {
    // Carga de sitios desde la colección de Firebase mediante el hook
    const { sitios, loading: loadingSitios } = useSiteCatalog();

    const [formData, setFormData] = useState({
        nombreCompleto: '',
        correoElectronico: '',
        cisco: '',
        ipCisco: '',
        sitio: '',
        area: '',
        subarea: '',
        status: 'Activo'
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                nombreCompleto: initialData.nombreCompleto || '',
                correoElectronico: initialData.correoElectronico || '',
                cisco: initialData.cisco || '',
                ipCisco: initialData.ipCisco || '',
                sitio: initialData.sitio || '',
                area: initialData.area || '',
                subarea: initialData.subarea || '',
                status: initialData.status || 'Activo'
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (['nombreCompleto', 'area', 'subarea'].includes(name)) {
            const onlyLetters = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
            if (onlyLetters.length <= 50) {
                setFormData(prev => ({ ...prev, [name]: onlyLetters }));
            }
            return;
        }

        if (name === 'cisco') {
            const onlyNumbers = value.replace(/\D/g, '');
            setFormData(prev => ({ ...prev, [name]: onlyNumbers }));
            return;
        }

        // Lógica de autocompletado de IP basada en el sitio
        setFormData(prev => {
            const nuevoEstado = { ...prev, [name]: value };

            if (name === 'sitio') {
                const sitioInfo = sitios.find(s => s.nombre === value);
                if (sitioInfo) {
                    const prefijo = sitioInfo.prefijoIp || sitioInfo.segmento || '';
                    nuevoEstado.ipCisco = prefijo.endsWith('.') ? prefijo : `${prefijo}.`;
                } else {
                    nuevoEstado.ipCisco = '';
                }
            }

            if (name === 'ipCisco' && prev.sitio) {
                const sitioInfo = sitios.find(s => s.nombre === prev.sitio);
                const prefijo = sitioInfo ? (sitioInfo.prefijoIp || sitioInfo.segmento || '') : '';
                const prefijoFinal = prefijo.endsWith('.') ? prefijo : `${prefijo}.`;

                if (!value.startsWith(prefijoFinal)) {
                    nuevoEstado.ipCisco = prefijoFinal;
                } else {
                    const sufijo = value.substring(prefijoFinal.length);
                    const sufijoLimpio = sufijo.replace(/[^0-9]/g, '').substring(0, 3);
                    nuevoEstado.ipCisco = prefijoFinal + sufijoLimpio;
                }
            }

            return nuevoEstado;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Validación de extensión Cisco única
        if (formData.cisco && formData.cisco !== '' && formData.cisco !== '0') {
            const isDuplicateCisco = existingEmployees.some(emp => 
                emp.cisco === formData.cisco && emp.id !== initialData?.id
            );
            if (isDuplicateCisco) {
                toast.error("Extensión duplicada", { 
                    description: `La extensión ${formData.cisco} ya está asignada a otro colaborador.` 
                });
                return;
            }
        }

        // 2. Validación de IP Única (Contra Empleados y contra CPUs)
        if (formData.ipCisco && formData.ipCisco !== '') {
            // Revisar en otros teléfonos Cisco
            const duplicateInEmployees = existingEmployees.some(emp => 
                emp.ipCisco === formData.ipCisco && emp.id !== initialData?.id
            );

            // Revisar en inventario de CPUs (Validación cruzada solicitada)
            const duplicateInCpus = cpusExistentes.some(cpu => 
                cpu.ip === formData.ipCisco
            );

            if (duplicateInEmployees || duplicateInCpus) {
                toast.error("Conflicto de IP", { 
                    description: `La IP ${formData.ipCisco} ya está en uso por un ${duplicateInCpus ? 'equipo CPU' : 'teléfono Cisco'}.` 
                });
                return;
            }
        }

        let emailToSave = formData.correoElectronico.trim();
        const noEmailMarkers = ['S/N', 'SIN CORREO', 'N/A', 'NO TIENE', 'NO', 'SIN', 'S.N'];

        if (!emailToSave || noEmailMarkers.includes(emailToSave.toUpperCase())) {
            emailToSave = "SIN CORREO";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailToSave)) {
                toast.error("Formato inválido", { description: "Ingrese un correo válido o use 'N/A'." });
                return;
            }
        }

        if (!formData.nombreCompleto || !formData.area || !formData.sitio) {
            toast.error("Campos obligatorios", { description: "Complete Nombre, Área y Sitio." });
            return;
        }

        if (onSave) onSave({ ...formData, correoElectronico: emailToSave });
        onClose();
    };

    return (
        <div className="animate-in slide-in-from-top-4 duration-300 mb-8">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-100 overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${initialData ? 'bg-blue-50 text-blue-600' : 'bg-ui-accent/10 text-ui-accent'}`}>
                            <Icon name={initialData ? "edit" : "plus"} className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-ui-primary tracking-tight">
                                {initialData ? 'Editar Registro' : 'Nuevo Registro'}
                            </h3>
                            <p className="text-xxs text-slate-400 font-bold uppercase tracking-widest">Gestión de Personal y Red</p>
                        </div>
                    </div>
                    <button type="button" onClick={onClose} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full text-slate-400">✕</button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* FILA 1: Nombre, Correo, Cisco */}
                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Nombre Completo *</label>
                            <input 
                                name="nombreCompleto" 
                                value={formData.nombreCompleto} 
                                onChange={handleChange} 
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none" 
                                placeholder="Ej: Manuel Álvarez" 
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Correo Electrónico</label>
                            <input 
                                name="correoElectronico" 
                                value={formData.correoElectronico} 
                                onChange={handleChange} 
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none" 
                                placeholder="Ej: m.alvarez@empresa.com" 
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-accent uppercase tracking-wider pl-1">Extensión Cisco</label>
                            <input 
                                name="cisco" 
                                value={formData.cisco} 
                                onChange={handleChange} 
                                className="w-full p-2.5 bg-slate-50 border border-ui-accent/20 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none font-mono" 
                                placeholder="Ej: 5501" 
                            />
                        </div>

                        {/* FILA 2: Sitio, IP, Área */}
                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Sitio / Ubicación *</label>
                            <select 
                                name="sitio" 
                                value={formData.sitio} 
                                onChange={handleChange} 
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none"
                                required
                                disabled={loadingSitios}
                            >
                                <option value="">--- Seleccionar Sitio ---</option>
                                {sitios.map(s => <option key={s.id} value={s.nombre}>{s.nombre}</option>)}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-accent uppercase tracking-wider pl-1">IP Cisco (Voz)</label>
                            <input 
                                name="ipCisco" 
                                value={formData.ipCisco} 
                                onChange={handleChange} 
                                className={`w-full p-2.5 border rounded-xl text-xs-table outline-none font-mono font-bold ${formData.sitio ? 'bg-white border-ui-accent/40 focus:ring-2 focus:ring-ui-accent/20' : 'bg-slate-100 border-slate-200 cursor-not-allowed'}`} 
                                placeholder="0.0.0.0" 
                                disabled={!formData.sitio}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Área *</label>
                            <input 
                                name="area" 
                                value={formData.area} 
                                onChange={handleChange} 
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none" 
                                placeholder="Ej: Sistemas / IT" 
                                required
                            />
                        </div>

                        {/* FILA 3: Sub-área, Status */}
                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Sub-área</label>
                            <input 
                                name="subarea" 
                                value={formData.subarea} 
                                onChange={handleChange} 
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none" 
                                placeholder="Ej: Soporte Técnico" 
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
                            {initialData ? 'ACTUALIZAR REGISTRO' : 'GUARDAR COLABORADOR'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeForm;