import React, { useState, useEffect } from 'react';
import { db } from '../../../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
// Importación de los hooks necesarios
import { useDeviceCatalog, useSiteCatalog } from '../../../../hooks/useDeviceCatalog'; 
import Icon from '../../../../Components/Common/Icon';
import { toast } from 'sonner'; // Añadido para feedback visual

const CPUForm = ({ onClose, onSave, cpusExistentes = [], initialData = null }) => {
    // Hook para marcas y modelos
    const { marcas, modelos, loading: loadingCatalog } = useDeviceCatalog('CPU');
    
    // Hook para obtener el catálogo global de empresas registradas
    const { marcas: empresasRegistradas, loading: loadingEmpresas } = useDeviceCatalog('EMPRESA');
    
    // Hook para obtener sitios e IPs (Independientes)
    const { sitios, loading: loadingSitios } = useSiteCatalog();
    
    const [empleados, setEmpleados] = useState([]);
    const [ipError, setIpError] = useState(''); // Manejar error de duplicados
    
    // Estado inicial adaptado para creación o edición
    const [formData, setFormData] = useState({
        expediente: '',
        serie: '',
        marca: '',
        modelo: '',
        tipo: 'CPU',
        ip: '',
        hostname: '',
        correoOffice: '',
        usuario: '',
        area: '',
        subarea: '',
        empresa: '',
        sitio: '',
        status: 'Activo',
        sigtig: false
    });

    // Código Nuevo: Efecto para cargar datos en modo edición
    // Esto asegura que si initialData cambia o llega tarde, el formulario se llene.
    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                // Aseguramos que campos opcionales no sean undefined para los inputs
                expediente: initialData.expediente || '',
                serie: initialData.serie || '',
                marca: initialData.marca || '',
                modelo: initialData.modelo || '',
                ip: initialData.ip || '',
                hostname: initialData.hostname || '',
                correoOffice: initialData.correoOffice || '',
                usuario: initialData.usuario || '',
                area: initialData.area || '',
                subarea: initialData.subarea || '',
                empresa: initialData.empresa || '',
                sitio: initialData.sitio || '',
            });
        }
    }, [initialData]);

    // Cargar empleados para el selector
    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'employees'));
                const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setEmpleados(docs);
            } catch (error) {
                console.error("Error al cargar empleados:", error);
            }
        };
        fetchEmpleados();
    }, []);

    const calcularHostname = (nombreFull, esLaptop) => {
        if (!nombreFull) return '';
        
        let hostname_base = "627";
        const partes = nombreFull.split(' ');
        const nombre = partes[0] || "X";
        const apePat = (partes[1] || "").replace(/Ñ/g, "N").toUpperCase();
        const apeMat = (partes[2] || "").replace(/Ñ/g, "N").toUpperCase();

        hostname_base += nombre[0].toUpperCase();
        let apellidos = "";
        if (apePat.length >= 7) {
            apellidos = apePat.substring(0, 7);
        } else {
            const faltantes = 7 - apePat.length;
            apellidos = (apePat + apeMat.substring(0, faltantes));
        }
        
        hostname_base += apellidos.substring(0, 7);
        hostname_base = hostname_base.substring(0, 11);

        if (esLaptop) hostname_base += "L";

        let contadorMaximo = 0;
        cpusExistentes.forEach(cpu => {
            // No contar el equipo actual si estamos editando para no saltar un número
            if (initialData && cpu.id === initialData.id) return;

            if (cpu.hostname && cpu.hostname.startsWith(hostname_base)) {
                const sufijoStr = cpu.hostname.slice(-2);
                const sufijo = parseInt(sufijoStr);
                if (!isNaN(sufijo)) {
                    contadorMaximo = Math.max(contadorMaximo, sufijo);
                }
            }
        });

        const nuevo_sufijo = String(contadorMaximo + 1).padStart(2, '0');
        return hostname_base + nuevo_sufijo;
    };

    const handleUsuarioChange = (e) => {
        const selectedId = e.target.value;
        const emp = empleados.find(item => item.id === selectedId);

        if (emp) {
            const nuevoHostname = calcularHostname(emp.nombreCompleto, formData.tipo === 'LAPTOP');
            setFormData(prev => ({
                ...prev,
                usuario: emp.nombreCompleto,
                area: emp.area || '',
                subarea: emp.subarea || '',
                correoOffice: emp.correoElectronico || '',
                hostname: nuevoHostname
            }));
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const valor = type === 'checkbox' ? checked : value;

        setFormData(prev => {
            const nuevoEstado = { ...prev, [name]: valor };
            
            if (name === 'marca') {
                nuevoEstado.modelo = '';
            }

            if (name === 'sitio') {
                const sitioInfo = sitios.find(s => s.nombre === valor);
                if (sitioInfo) {
                    const prefijo = sitioInfo.prefijoIp || sitioInfo.segmento || '';
                    nuevoEstado.ip = prefijo.endsWith('.') ? prefijo : `${prefijo}.`;
                } else {
                    nuevoEstado.ip = '';
                }
                setIpError('');
            }

            if (name === 'ip') {
                const sitioInfo = sitios.find(s => s.nombre === prev.sitio);
                const prefijo = sitioInfo ? (sitioInfo.prefijoIp || sitioInfo.segmento || '') : '';
                const prefijoFinal = prefijo.endsWith('.') ? prefijo : `${prefijo}.`;

                if (!valor.startsWith(prefijoFinal)) {
                    nuevoEstado.ip = prefijoFinal;
                } else {
                    const sufijo = valor.substring(prefijoFinal.length);
                    const sufijoLimpio = sufijo.replace(/[^0-9]/g, '').substring(0, 3);
                    nuevoEstado.ip = prefijoFinal + sufijoLimpio;
                }
                setIpError('');
            }

            if (name === 'tipo') {
                nuevoEstado.hostname = calcularHostname(prev.usuario, valor === 'LAPTOP');
            }
            return nuevoEstado;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación de IP Duplicada (excluyendo el equipo actual si es edición)
        const ipExiste = cpusExistentes.some(cpu => 
            cpu.ip === formData.ip && 
            cpu.status !== 'Baja' && 
            (!initialData || cpu.id !== initialData.id)
        );

        if (ipExiste) {
            const errorMsg = `La dirección IP ${formData.ip} ya está en uso.`;
            setIpError(errorMsg);
            toast.error(errorMsg);
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
                        <div className="p-2 bg-ui-accent/10 rounded-lg text-ui-accent">
                            <Icon name={initialData ? "edit" : "plus"} className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-ui-primary tracking-tight">
                                {initialData ? 'Editar Registro' : 'Nuevo Registro'}
                            </h3>
                            <p className="text-xxs text-slate-400 font-bold uppercase tracking-widest">Información Técnica de CPU</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full text-slate-400">✕</button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        
                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Expediente</label>
                            <input 
                                name="expediente" 
                                value={formData.expediente} 
                                onChange={handleChange} 
                                maxLength={30}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none" 
                                placeholder="Número de activo" 
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Número de Serie</label>
                            <input 
                                name="serie" 
                                value={formData.serie} 
                                onChange={handleChange} 
                                maxLength={30}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none" 
                                placeholder="S/N" 
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Marca</label>
                            <select name="marca" value={formData.marca} onChange={handleChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none" disabled={loadingCatalog}>
                                <option value="">--- Seleccionar ---</option>
                                {marcas.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Modelo</label>
                            <select name="modelo" value={formData.modelo} onChange={handleChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none" disabled={!formData.marca || loadingCatalog}>
                                <option value="">--- Seleccionar ---</option>
                                {(modelos[formData.marca] || []).map(mod => <option key={mod} value={mod}>{mod}</option>)}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Tipo</label>
                            <select name="tipo" value={formData.tipo} onChange={handleChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none">
                                <option value="CPU">CPU</option>
                                <option value="LAPTOP">LAPTOP</option>
                                <option value="SERVIDOR">SERVIDOR</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-accent uppercase tracking-wider pl-1">Seleccionar Usuario</label>
                            <select onChange={handleUsuarioChange} className="w-full p-2.5 bg-white border border-ui-accent/40 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none font-bold text-ui-primary">
                                <option value="">--- Buscar Empleado ---</option>
                                {empleados.map(emp => (
                                    <option key={emp.id} value={emp.id} selected={formData.usuario === emp.nombreCompleto}>
                                        {emp.nombreCompleto}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-accent uppercase tracking-wider pl-1">Hostname Sugerido</label>
                            <input name="hostname" value={formData.hostname} onChange={handleChange} className="w-full p-2.5 bg-blue-50 border border-ui-accent/30 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none font-mono font-bold text-ui-primary uppercase" placeholder="AUTO-GENERADO" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Empresa Propiedad</label>
                            <select name="empresa" value={formData.empresa} onChange={handleChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none" disabled={loadingEmpresas}>
                                <option value="">--- Seleccionar Empresa ---</option>
                                {empresasRegistradas.map(emp => <option key={emp} value={emp}>{emp}</option>)}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Sitio / Ubicación</label>
                            <select name="sitio" value={formData.sitio} onChange={handleChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none" disabled={loadingSitios}>
                                <option value="">--- Seleccionar Sitio ---</option>
                                {sitios.map(s => <option key={s.id} value={s.nombre}>{s.nombre}</option>)}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-accent uppercase tracking-wider pl-1">Dirección IP</label>
                            <input 
                                name="ip" 
                                value={formData.ip} 
                                onChange={handleChange} 
                                className={`w-full p-2.5 border rounded-xl text-xs-table outline-none font-mono font-bold ${ipError ? 'border-red-500 bg-red-50 ring-2 ring-red-200' : (formData.sitio ? 'bg-white border-ui-accent/40 focus:ring-2 focus:ring-ui-accent/20' : 'bg-slate-100 border-slate-200 cursor-not-allowed')}`} 
                                placeholder="0.0.0.0" 
                                disabled={!formData.sitio}
                            />
                            {ipError && <p className="text-[10px] text-red-500 font-bold mt-1 pl-1 animate-pulse">{ipError}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Correo Office</label>
                            <input name="correoOffice" value={formData.correoOffice} onChange={handleChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none" placeholder="Carga automática..." />
                        </div>

                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Área</label>
                            <input name="area" value={formData.area} readOnly className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs-table outline-none text-slate-500" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Sub-área</label>
                            <input name="subarea" value={formData.subarea} readOnly className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs-table outline-none text-slate-500" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-form-label font-black text-ui-primary uppercase tracking-wider pl-1">Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs-table focus:ring-2 focus:ring-ui-accent/20 outline-none">
                                <option value="Activo">Activo</option>
                                <option value="Mantenimiento">Mantenimiento</option>
                                <option value="Baja">Baja</option>
                                <option value="Stock">Stock</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-3 pt-6 pl-1">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="sigtig" checked={formData.sigtig} onChange={handleChange} className="sr-only peer" />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                            <span className="text-form-label font-black text-slate-700 uppercase">SIGTIG</span>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end items-center gap-4">
                        <span className="text-xxs text-slate-400 italic">La selección del usuario automatiza el hostname. El sitio define el segmento IP.</span>
                        <div className="flex gap-3">
                            <button type="button" onClick={onClose} className="px-6 py-2.5 text-xs font-black text-slate-400 hover:text-slate-600 transition-colors">CANCELAR</button>
                            <button type="submit" className="px-8 py-2.5 bg-ui-primary text-white rounded-xl text-xs font-black shadow-lg shadow-ui-primary/20 hover:shadow-ui-primary/40 active:scale-95 transition-all">
                                {initialData ? 'ACTUALIZAR EQUIPO' : 'GUARDAR EQUIPO'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CPUForm;