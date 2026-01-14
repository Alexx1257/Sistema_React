import React, { useState } from 'react';
// Rutas corregidas para la ubicación src/pages/Home/
import { db } from '../../../../firebase/config';
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useDeviceCatalog } from '../../../../hooks/useDeviceCatalog';
import Icon from '../../../../Components/Common/Icon';
import { toast } from 'sonner';

const CatalogSection = () => {
    // Se añade 'EMPRESA' a los tipos disponibles si es necesario
    const [selectedType, setSelectedType] = useState('CPU');
    const [newMarca, setNewMarca] = useState('');
    const [newModelo, setNewModelo] = useState('');
    const [marcaForModel, setMarcaForModel] = useState('');

    const { marcas, modelos, loading } = useDeviceCatalog(selectedType);

    const handleAddMarca = async () => {
        if (!newMarca.trim()) return;
        const loadingId = toast.loading(`Agregando ${selectedType === 'EMPRESA' ? 'empresa' : 'marca'}...`);
        try {
            const docRef = doc(db, "catalog_devices", selectedType);
            await setDoc(docRef, {
                marcas: arrayUnion(newMarca.trim().toUpperCase())
            }, { merge: true });
            setNewMarca('');
            toast.success(`${selectedType === 'EMPRESA' ? 'Empresa' : 'Marca'} agregada`, { id: loadingId });
        } catch (error) {
            toast.error("Error al procesar la solicitud", { id: loadingId });
        }
    };

    const handleAddModelo = async () => {
        if (!newModelo.trim() || !marcaForModel) return;
        const loadingId = toast.loading("Agregando modelo...");
        try {
            const docRef = doc(db, "catalog_devices", selectedType);
            const key = `modelos.${marcaForModel}`;
            await updateDoc(docRef, {
                [key]: arrayUnion(newModelo.trim())
            });
            setNewModelo('');
            toast.success("Modelo agregado", { id: loadingId });
        } catch (error) {
            toast.error("Error al agregar modelo", { id: loadingId });
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
                <h2 className="text-2xl font-black text-ui-primary mb-2">Catálogo del Sistema</h2>
                <p className="text-slate-500 text-sm mb-6">Gestiona marcas, modelos y empresas registradas.</p>

                <div className="flex flex-wrap gap-4 mb-8">
                    {/* Añadimos EMPRESA como una opción más del catálogo */}
                    {['CPU', 'MONITOR', 'IMPRESORA', 'EMPRESA'].map(type => (
                        <button
                            key={type}
                            onClick={() => {
                                setSelectedType(type);
                                setMarcaForModel(''); // Resetear selección al cambiar tipo
                            }}
                            className={`px-6 py-2 rounded-xl font-bold transition-all ${selectedType === type ? 'bg-ui-accent text-white shadow-lg shadow-ui-accent/20' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Sección de Marcas / Empresas */}
                    <div className="space-y-4">
                        <h3 className="font-black text-ui-primary uppercase text-xs tracking-widest">
                            {selectedType === 'EMPRESA' ? 'Empresas Registradas' : `Marcas de ${selectedType}`}
                        </h3>
                        <div className="flex gap-2">
                            <input 
                                value={newMarca} 
                                onChange={(e) => setNewMarca(e.target.value)}
                                className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-ui-primary/10"
                                placeholder={selectedType === 'EMPRESA' ? "Nombre de la Empresa..." : "Nueva Marca..."}
                            />
                            <button onClick={handleAddMarca} className="p-2.5 bg-ui-primary text-white rounded-xl hover:opacity-90 transition-opacity">
                                <Icon name="plus" />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {marcas.map(m => (
                                <span key={m} className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 border border-slate-200">
                                    {m}
                                </span>
                            ))}
                            {marcas.length === 0 && <p className="text-xxs font-bold text-slate-400 italic">No hay registros aún.</p>}
                        </div>
                    </div>

                    {/* Sección de Modelos (Se oculta si el tipo es EMPRESA ya que las empresas no suelen tener sub-modelos en este nivel) */}
                    {selectedType !== 'EMPRESA' && (
                        <div className="space-y-4">
                            <h3 className="font-black text-ui-primary uppercase text-xs tracking-widest">Modelos por Marca</h3>
                            <div className="space-y-2">
                                <select 
                                    value={marcaForModel} 
                                    onChange={(e) => setMarcaForModel(e.target.value)}
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-ui-primary/10"
                                >
                                    <option value="">Seleccionar Marca...</option>
                                    {marcas.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                                <div className="flex gap-2">
                                    <input 
                                        value={newModelo} 
                                        onChange={(e) => setNewModelo(e.target.value)}
                                        className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-ui-primary/10"
                                        placeholder="Nuevo Modelo..."
                                        disabled={!marcaForModel}
                                    />
                                    <button 
                                        onClick={handleAddModelo} 
                                        disabled={!marcaForModel} 
                                        className="p-2.5 bg-ui-accent text-white rounded-xl disabled:opacity-30 hover:opacity-90 transition-opacity"
                                    >
                                        <Icon name="plus" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Mensaje Informativo si es Empresa */}
                    {selectedType === 'EMPRESA' && (
                        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center p-8 text-center">
                            <div className="max-w-xs">
                                <Icon name="settings" className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                                <p className="text-xs font-bold text-slate-400">
                                    Las empresas registradas aparecerán automáticamente como opciones de propiedad o proveedor en los formularios de equipos.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CatalogSection;