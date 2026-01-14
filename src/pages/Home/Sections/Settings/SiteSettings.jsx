import React, { useState } from 'react';
import { db } from '../../../../firebase/config';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useSiteCatalog } from '../../../../hooks/useDeviceCatalog';
import Icon from '../../../../Components/Common/Icon';

const SiteSettings = () => {
    const { sitios, loading } = useSiteCatalog();
    const [isEditing, setIsEditing] = useState(null); 
    const [formData, setFormData] = useState({ nombre: '', prefijoIp: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let valorValidado = value;

        if (name === 'nombre') {
            // Permite letras, números y guiones
            valorValidado = value.replace(/[^a-zA-Z0-9-]/g, '');
        }

        if (name === 'prefijoIp') {
            // 1. Solo permite números y puntos
            let input = value.replace(/[^0-9.]/g, '');
            
            // 2. Regex para capturar solo hasta el tercer punto (ej: 10.5.1.)
            // Esta expresión busca: (número).(número).(número).
            const match = input.match(/^(\d{1,3}\.){0,2}\d{0,3}\.?/);
            valorValidado = match ? match[0] : '';

            // 3. Bloqueo extra: Si ya tiene 3 puntos, no permitir más caracteres
            const puntos = (valorValidado.match(/\./g) || []).length;
            if (puntos === 3 && valorValidado.endsWith('.')) {
                // Ya tenemos el formato X.X.X. completo, no aceptamos nada más
                setFormData({ ...formData, [name]: valorValidado });
                return;
            }
        }

        setFormData({ ...formData, [name]: valorValidado });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validación final: El prefijo debe tener exactamente 3 puntos (ej: 10.5.1.)
        const puntos = (formData.prefijoIp.match(/\./g) || []).length;
        if (puntos !== 3 || !formData.prefijoIp.endsWith('.')) {
            alert("El formato debe ser de 3 octetos terminando en punto. Ej: 10.5.1.");
            return;
        }

        try {
            const dataAGuardar = {
                nombre: formData.nombre,
                prefijoIp: formData.prefijoIp,
                segmento: formData.prefijoIp // Para compatibilidad
            };

            if (isEditing) {
                const siteRef = doc(db, 'sites', isEditing);
                await updateDoc(siteRef, dataAGuardar);
                setIsEditing(null);
            } else {
                const existe = sitios.find(s => s.nombre.toLowerCase() === formData.nombre.toLowerCase());
                if (existe) {
                    alert("Este nombre de sitio ya existe.");
                    return;
                }
                await addDoc(collection(db, 'sites'), dataAGuardar);
            }
            setFormData({ nombre: '', prefijoIp: '' });
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    const handleEdit = (sitio) => {
        setIsEditing(sitio.id);
        setFormData({ 
            nombre: sitio.nombre, 
            prefijoIp: sitio.prefijoIp || sitio.segmento || ''
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Eliminar sitio?")) {
            try {
                await deleteDoc(doc(db, 'sites', id));
            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-ui-accent/10 rounded-2xl text-ui-accent">
                    <Icon name="settings" className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-ui-primary">Configuración de Red por Sitio</h2>
                    <p className="text-sm text-slate-500 font-medium">Define el segmento IP (Ejemplo: 10.5.1.)</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm mb-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="space-y-1">
                        <label className="text-xxs font-black text-ui-primary uppercase tracking-wider pl-1">Nombre del Sitio</label>
                        <input 
                            required
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Ej: CHS-01"
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-ui-accent/20"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xxs font-black text-ui-primary uppercase tracking-wider pl-1">Prefijo IP (3 Octetos)</label>
                        <input 
                            required
                            name="prefijoIp"
                            value={formData.prefijoIp}
                            onChange={handleChange}
                            placeholder="10.5.1."
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold outline-none focus:ring-2 focus:ring-ui-accent/20 text-ui-accent"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" className="flex-1 bg-ui-primary text-white p-3 rounded-xl text-xs font-black shadow-lg shadow-ui-primary/20">
                            {isEditing ? 'ACTUALIZAR' : 'GUARDAR SEGMENTO'}
                        </button>
                        {isEditing && (
                            <button type="button" onClick={() => { setIsEditing(null); setFormData({ nombre: '', prefijoIp: '' }); }} className="bg-slate-100 text-slate-500 p-3 rounded-xl text-xs font-black">
                                ✕
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-xxs font-black text-slate-400 uppercase tracking-widest">Sitio</th>
                            <th className="px-6 py-4 text-xxs font-black text-slate-400 uppercase tracking-widest">Segmento Autorizado</th>
                            <th className="px-6 py-4 text-xxs font-black text-slate-400 uppercase tracking-widest text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {!loading && sitios.map((sitio) => (
                            <tr key={sitio.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-ui-primary">{sitio.nombre}</td>
                                <td className="px-6 py-4">
                                    <span className="text-xs font-mono bg-blue-50 text-ui-accent px-2 py-1 rounded-md font-black">
                                        {sitio.prefijoIp || sitio.segmento}
                                    </span>
                                    <span className="text-xs font-mono text-slate-300 ml-1">xxx</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => handleEdit(sitio)} className="p-2 text-blue-500"><Icon name="edit" className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete(sitio.id)} className="p-2 text-red-500"><Icon name="trash" className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SiteSettings;