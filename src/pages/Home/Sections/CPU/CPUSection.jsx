import React, { useState, useMemo, useEffect } from 'react';
// Importaciones de Firebase corregidas para incluir updateDoc y deleteDoc
import { db } from '../../../../firebase/config';
import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';

import { exportToExcel, exportToPDF } from '../Common/ExportUtils';
import InventoryLayout from '../Common/InventoryLayout';
import InventoryTable from '../Common/InventoryTable';
import TableActions from '../Common/TableActions'; // Importación de componente común
import CPUForm from './CPUForm';
import { toast } from 'sonner'; // Feedback moderno

// Importación de componentes de alerta (shadcn / Radix)
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../../../../Components/ui/alert-dialog";
import { Form, Import } from 'lucide-react';

const CPUSection = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        marca: '',
        area: '',
        sigtig: ''
    });

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCpu, setEditingCpu] = useState(null); // Estado para equipo en edición
    
    // Estados para el manejo del diálogo de eliminación
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const [cpus, setCpus] = useState([]);

    // Listener en tiempo real para la colección 'cpus'
    useEffect(() => {
        const q = query(collection(db, 'cpus'), orderBy('hostname', 'asc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ id: doc.id, ...doc.data() });
            });
            setCpus(docs);
        });
        return () => unsubscribe();
    }, []);

    // Función unificada para Guardar o Actualizar con Sonner
    const handleSaveCPU = async (newData) => {
        const toastId = toast.loading(editingCpu ? "Actualizando equipo..." : "Registrando equipo...");
        try {
            if (editingCpu) {
                // Actualizar equipo existente
                const cpuRef = doc(db, 'cpus', editingCpu.id);
                await updateDoc(cpuRef, {
                    ...newData,
                    updatedAt: new Date()
                });
                toast.success("Equipo actualizado correctamente", { id: toastId });
            } else {
                // Agregar nuevo equipo
                await addDoc(collection(db, 'cpus'), {
                    ...newData,
                    createdAt: new Date()
                });
                toast.success("Equipo registrado con éxito", { id: toastId });
            }
            setIsFormOpen(false);
            setEditingCpu(null);
        } catch (error) {
            console.error("Error al persistir en Firebase: ", error);
            toast.error("Ocurrió un error al guardar", { id: toastId });
        }
    };

    // Funciones funcionales para las acciones de la tabla
    const handleEdit = (item) => {
        setEditingCpu(item);
        setIsFormOpen(true);
    };

    const handleDeleteRequest = (item) => {
        setItemToDelete(item);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        const toastId = toast.loading("Eliminando equipo...");
        try {
            await deleteDoc(doc(db, 'cpus', itemToDelete.id));
            toast.success("Equipo eliminado correctamente", { id: toastId });
            setIsDeleteDialogOpen(false);
            setItemToDelete(null);
        } catch (error) {
            toast.error("No se pudo eliminar el equipo", { id: toastId });
        }
    };

    const handleObservation = (item) => {
        toast.info(`Notas de ${item.hostname}`, {
            description: item.observaciones || "Sin observaciones registradas.",
            duration: 5000
        });
    };

    const filterOptions = {
        marcas: [...new Set(cpus.map(c => c.marca))],
        areas: [...new Set(cpus.map(c => c.area))]
    };

    const filteredData = useMemo(() => {
        return cpus.filter(item => {
            const matchesSearch = searchTerm === '' || 
                [item.expediente, item.serie, item.usuario, item.hostname, item.ip, item.empresa]
                .some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesMarca = filters.marca === '' || item.marca === filters.marca;
            const matchesArea = filters.area === '' || item.area === filters.area;
            const matchesSigtig = filters.sigtig === '' || item.sigtig === filters.sigtig;

            return matchesSearch && matchesMarca && matchesArea && matchesSigtig;
        });
    }, [searchTerm, filters, cpus]);

    const columns = [
        { 
            header: 'Expediente / Serie', 
            render: (item) => (
                <div>
                    <div className="font-bold text-ui-primary text-sm">{item.expediente}</div>
                    <div className="text-[10px] text-ui-textMuted font-mono uppercase tracking-tighter">{item.serie}</div>
                </div>
            )
        },
        { 
            header: 'Tipo / Equipo', 
            render: (item) => (
                <div className="text-xs">
                    <p className="font-black text-ui-accent text-[9px] uppercase">{item.tipo}</p>
                    <p className="font-bold text-slate-700">{item.marca} <span className="font-normal text-slate-400">{item.modelo}</span></p>
                </div>
            )
        },
        { 
            header: 'Red (IP/Host)', 
            render: (item) => (
                <div className="font-mono">
                    <div className="text-xs text-ui-accent font-bold">{item.ip}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-tighter">{item.hostname}</div>
                </div>
            )
        },
        { 
            header: 'Usuario / Office', 
            render: (item) => (
                <div className="text-xs">
                    <p className="font-bold text-slate-700">{item.usuario}</p>
                    <p className="text-ui-textMuted italic text-[10px] truncate w-32">{item.correoOffice}</p>
                </div>
            )
        },
        { 
            header: 'Ubicación / Área', 
            render: (item) => (
                <div className="text-xs">
                    <p className="font-bold text-slate-700">{item.area} <span className="font-normal text-slate-300">|</span> <span className="text-slate-500">{item.subarea}</span></p>
                    <p className="text-[10px] text-slate-400 italic truncate w-32" title={item.sitio}>{item.sitio}</p>
                </div>
            )
        },
        { 
            header: 'Empresa / SIGTIG', 
            center: true,
            render: (item) => (
                <div className="flex flex-col items-center gap-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.empresa}</span>
                    <span className={`px-3 py-0.5 rounded-full text-[10px] font-black tracking-tighter ${item.sigtig ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {item.sigtig ? 'SIGTIG' : 'NO'}
                    </span>
                </div>
            )
        },
        { 
            header: 'Status', 
            center: true,
            render: (item) => (
                <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${item.status === 'Activo' ? 'bg-green-500 text-white shadow-sm shadow-green-200' : 'bg-amber-500 text-white shadow-sm shadow-amber-200'}`}>
                    {item.status}
                </span>
            )
        },
        { 
            header: 'Acciones', 
            center: true,
            render: (item) => (
                <TableActions 
                    item={item}
                    onEdit={handleEdit}
                    onDelete={handleDeleteRequest}
                    onObserve={handleObservation}
                />
            )
        }
    ];

    const renderCPUMobile = (item, idx) => (
        <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className={`absolute left-0 top-0 h-full w-2 ${item.sigtig ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <div className="flex justify-between items-start mb-4 pl-2">
                <div className="flex flex-col">
                    <span className="text-[9px] font-black text-ui-accent uppercase">{item.tipo}</span>
                    <span className="text-sm font-black text-ui-primary leading-none">{item.expediente}</span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">{item.serie}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.empresa}</span>
                   <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${item.status === 'Activo' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}`}>{item.status}</span>
                </div>
            </div>
            <div className="pl-2 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Usuario</p>
                        <p className="text-xs font-bold text-slate-800">{item.usuario}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">IP de Red</p>
                        <p className="text-xs font-bold text-ui-accent font-mono">{item.ip}</p>
                    </div>
                </div>
                <div className="pt-2 border-t border-slate-50">
                    <p className="text-[11px] text-slate-600 font-bold">{item.area} <span className="font-normal text-slate-400">• {item.subarea}</span></p>
                    <p className="text-[10px] text-slate-400 italic mt-0.5">{item.sitio}</p>
                </div>
                <div className="pt-3 border-t border-slate-50 flex justify-end">
                    <TableActions 
                        item={item}
                        onEdit={handleEdit}
                        onDelete={handleDeleteRequest}
                        onObserve={handleObservation}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <InventoryLayout 
            title="Inventario de CPU"
            subtitle="Gestión técnica y administrativa de equipos de cómputo."
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filters={filters}
            setFilters={setFilters}
            filterOptions={filterOptions}
            onExportExcel={() => exportToExcel(filteredData, 'Inventario_CPU')}
            onExportPDF={() => exportToPDF(filteredData, 'Inventario de CPU')}
            onAdd={() => { setEditingCpu(null); setIsFormOpen(true); }}
        >
            {isFormOpen && (
                <CPUForm 
                    onClose={() => { setIsFormOpen(false); setEditingCpu(null); }} 
                    onSave={handleSaveCPU}
                    initialData={editingCpu} 
                    cpusExistentes={cpus}
                />
            )}

            <InventoryTable 
                columns={columns} 
                data={filteredData} 
                renderMobileCard={renderCPUMobile} 
            />

            {/* Diálogo de Confirmación de Eliminación */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="rounded-[2rem] border-none shadow-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-black text-ui-primary">
                            ¿Eliminar este equipo?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500 font-medium">
                            Estás a punto de eliminar el equipo <span className="font-bold text-ui-accent">{itemToDelete?.hostname}</span>. Esta acción no se puede deshacer y el equipo desaparecerá del inventario.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-3 pt-4">
                        <AlertDialogCancel className="rounded-xl font-bold border-slate-200 text-slate-500 hover:bg-slate-50">
                            CANCELAR
                        </AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={confirmDelete}
                            className="rounded-xl font-bold bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-200"
                        >
                            ELIMINAR AHORA
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </InventoryLayout>
    );
};

export default CPUSection;