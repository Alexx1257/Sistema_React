import React, { useState } from 'react';
// Rutas corregidas para la ubicación src/pages/Home/
import { db } from '../../firebase/config';
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useDeviceCatalog } from '../../hooks/useDeviceCatalog';
import Icon from '../../Components/Common/Icon';
import { toast } from 'sonner';

const CatalogSection = () => {
    const [selectedType, setSelectedType] = useState('CPU');
    const [newMarca, setNewMarca] = useState('');
    const [newModelo, setNewModelo] = useState('');
    const [marcaForModel, setMarcaForModel] = useState('');

    const { marcas, modelos, loading } = useDeviceCatalog(selectedType);

    const handleAddMarca = async () => {
        if (!newMarca.trim()) return;
        const loadingId = toast.loading("Agregando marca...");
        try {
            const docRef = doc(db, "catalog_devices", selectedType);
            await setDoc(docRef, {
                marcas: arrayUnion(newMarca.trim().toUpperCase())
            }, { merge: true });
            setNewMarca('');
            toast.success("Marca agregada", { id: loadingId });
        } catch (error) {
            toast.error("Error al agregar marca", { id: loadingId });
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
                <h2 className="text-2xl font-black text-ui-primary mb-2">Catálogo de Equipos</h2>
                <p className="text-slate-500 text-sm mb-6">Gestiona las marcas y modelos disponibles para los formularios.</p>

                <div className="flex gap-4 mb-8">
                    {['CPU', 'MONITOR', 'IMPRESORA'].map(type => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`px-6 py-2 rounded-xl font-bold transition-all ${selectedType === type ? 'bg-ui-accent text-white' : 'bg-slate-100 text-slate-500'}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="font-black text-ui-primary uppercase text-xs tracking-widest">Marcas de {selectedType}</h3>
                        <div className="flex gap-2">
                            <input 
                                value={newMarca} 
                                onChange={(e) => setNewMarca(e.target.value)}
                                className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                                placeholder="Nueva Marca..."
                            />
                            <button onClick={handleAddMarca} className="p-2.5 bg-ui-primary text-white rounded-xl">
                                <Icon name="plus" />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {marcas.map(m => (
                                <span key={m} className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 border border-slate-200">{m}</span>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-black text-ui-primary uppercase text-xs tracking-widest">Modelos por Marca</h3>
                        <div className="space-y-2">
                            <select 
                                value={marcaForModel} 
                                onChange={(e) => setMarcaForModel(e.target.value)}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                            >
                                <option value="">Seleccionar Marca...</option>
                                {marcas.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                            <div className="flex gap-2">
                                <input 
                                    value={newModelo} 
                                    onChange={(e) => setNewModelo(e.target.value)}
                                    className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                                    placeholder="Nuevo Modelo..."
                                    disabled={!marcaForModel}
                                />
                                <button onClick={handleAddModelo} disabled={!marcaForModel} className="p-2.5 bg-ui-accent text-white rounded-xl disabled:opacity-50">
                                    <Icon name="plus" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogSection;