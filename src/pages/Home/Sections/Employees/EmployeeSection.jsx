import React, { useState, useMemo, useEffect } from 'react';
import { db } from '../../../../firebase/config';
import { collection, addDoc, onSnapshot, query, orderBy, doc, deleteDoc, updateDoc } from "firebase/firestore";

// UI Modernas: Notificaciones y Diálogos de Confirmación
import { toast } from 'sonner';
// Nota: Se asume que el componente fue creado en src/components/ui/alert-dialog.jsx
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "../../../../components/ui/alert-dialog";

import { exportToExcel, exportToPDF } from '../Common/ExportUtils';
import InventoryLayout from '../Common/InventoryLayout';
import InventoryTable from '../Common/InventoryTable';
import EmployeeForm from './EmployeeForm';
import Icon from '../../../../Components/Common/Icon';

const EmployeeSection = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ 
        area: '', 
        subarea: '', 
        correo: '' 
    });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [employees, setEmployees] = useState([]);
    
    // Estados para el flujo de eliminación
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    // Listener de Firebase en tiempo real
    useEffect(() => {
        const q = query(collection(db, 'employees'), orderBy('nombreCompleto', 'asc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ id: doc.id, ...doc.data() });
            });
            setEmployees(docs);
        });
        return () => unsubscribe();
    }, []);

    const handleSaveEmployee = async (newData) => {
        const loadingId = toast.loading(editingEmployee ? "Actualizando empleado..." : "Registrando empleado...");
        try {
            if (editingEmployee) {
                const docRef = doc(db, 'employees', editingEmployee.id);
                await updateDoc(docRef, newData);
                toast.success("Empleado actualizado correctamente", { id: loadingId });
                setEditingEmployee(null);
            } else {
                await addDoc(collection(db, 'employees'), {
                    ...newData,
                    createdAt: new Date()
                });
                toast.success("Empleado registrado con éxito", { id: loadingId });
            }
            setIsFormOpen(false);
        } catch (error) {
            toast.error("Error al procesar la solicitud en la base de datos", { id: loadingId });
            console.error("Error al procesar empleado: ", error);
        }
    };

    // Función que se ejecuta al confirmar en el Dialog
    const confirmDelete = async () => {
        if (!employeeToDelete) return;
        const loadingId = toast.loading("Eliminando registro...");
        try {
            await deleteDoc(doc(db, 'employees', employeeToDelete.id));
            toast.success("El empleado ha sido eliminado permanentemente", { id: loadingId });
            setIsDeleteDialogOpen(false);
            setEmployeeToDelete(null);
        } catch (error) {
            toast.error("Ocurrió un error al intentar eliminar el registro", { id: loadingId });
            console.error("Error al eliminar: ", error);
        }
    };

    const handleEditClick = (employee) => {
        setEditingEmployee(employee);
        setIsFormOpen(true);
    };

    const filterOptions = {
        areas: [...new Set(employees.map(e => e.area).filter(Boolean))],
        subareas: [...new Set(employees.map(e => e.subarea).filter(Boolean))]
    };

    const filteredData = useMemo(() => {
        return employees.filter(item => {
            const matchesSearch = searchTerm === '' || 
                [item.nombreCompleto, item.correoElectronico, item.cisco]
                .some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()));
            
            const matchesArea = filters.area === '' || item.area === filters.area;
            const matchesSubarea = filters.subarea === '' || item.subarea === filters.subarea;
            const matchesCorreo = filters.correo === '' || item.correoElectronico?.toLowerCase().includes(filters.correo.toLowerCase());

            return matchesSearch && matchesArea && matchesSubarea && matchesCorreo;
        });
    }, [searchTerm, filters, employees]);

    const columns = [
        { 
            header: 'Empleado', 
            render: (item) => <div className="text-xs-table font-extrabold text-ui-primary tracking-tight">{item.nombreCompleto}</div>
        },
        { 
            header: 'Contacto', 
            render: (item) => (
                <div className="text-xxs">
                    <p className="font-semibold text-slate-700 leading-tight">{item.correoElectronico}</p>
                    <p className="text-ui-accent font-mono mt-0.5">Cisco: {item.cisco}</p>
                </div>
            )
        },
        { 
            header: 'Ubicación', 
            render: (item) => (
                <div className="text-xxs">
                    <p className="font-semibold text-slate-700 leading-tight">{item.area}</p>
                    <p className="text-slate-400 mt-0.5 italic">{item.subarea}</p>
                </div>
            )
        },
        { 
            header: 'Status', 
            center: true,
            render: (item) => (
                <span className={`px-2.5 py-1 rounded-full text-tiny font-black uppercase tracking-wider ${
                    item.status === 'Activo' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}>
                    {item.status}
                </span>
            )
        },
        {
            header: 'Acciones',
            center: true,
            render: (item) => (
                <div className="flex gap-2.5 justify-center">
                    <button 
                        onClick={() => handleEditClick(item)}
                        className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm border border-blue-100"
                        title="Editar Datos"
                    >
                        {/* Icono de Lápiz para Editar */}
                        <Icon name="edit" className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => {
                            setEmployeeToDelete(item);
                            setIsDeleteDialogOpen(true);
                        }}
                        className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm border border-red-100"
                        title="Eliminar Registro"
                    >
                        {/* Icono de Basura para Eliminar */}
                        <Icon name="trash" className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    const renderEmployeeMobile = (item, idx) => (
        <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className={`absolute left-0 top-0 h-full w-2 ${item.status === 'Activo' ? 'bg-green-500' : 'bg-slate-400'}`}></div>
            <div className="flex justify-between items-start mb-2 pl-2">
                <div className="flex flex-col">
                    <span className="text-xs-table font-black text-ui-primary leading-none">{item.nombreCompleto}</span>
                    <span className="text-xxs text-ui-accent font-mono mt-1">Cisco: {item.cisco}</span>
                </div>
                <div className="flex gap-1">
                    <button onClick={() => handleEditClick(item)} className="p-1 text-blue-600"><Icon name="edit" className="w-4 h-4" /></button>
                    <button onClick={() => {
                        setEmployeeToDelete(item);
                        setIsDeleteDialogOpen(true);
                    }} className="p-1 text-red-600"><Icon name="trash" className="w-4 h-4" /></button>
                </div>
            </div>
            <div className="pl-2 pt-2 border-t border-slate-50">
                <p className="text-xxs text-slate-600 font-bold">{item.area} • <span className="font-normal text-slate-400">{item.subarea}</span></p>
                <p className="text-xxs text-slate-400 italic mt-0.5">{item.correoElectronico}</p>
            </div>
        </div>
    );

    return (
        <InventoryLayout 
            title="Directorio de Empleados"
            subtitle="Gestión y consulta de personal de la empresa."
            addButtonText="Añadir Empleado"
            filterType="employees" 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filters={filters}
            setFilters={setFilters}
            filterOptions={filterOptions}
            onExportExcel={() => exportToExcel(filteredData, 'Directorio_Empleados')}
            onExportPDF={() => exportToPDF(filteredData, 'Directorio de Empleados')}
            onAdd={() => {
                setEditingEmployee(null);
                setIsFormOpen(true);
            }}
        >
            {isFormOpen && (
                <EmployeeForm 
                    onClose={() => {
                        setIsFormOpen(false);
                        setEditingEmployee(null);
                    }} 
                    onSave={handleSaveEmployee}
                    initialData={editingEmployee} 
                />
            )}

            <InventoryTable 
                columns={columns} 
                data={filteredData} 
                renderMobileCard={renderEmployeeMobile}
            />

            {/* Diálogo de confirmación Radix UI */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="rounded-[2rem] border-slate-200 shadow-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-ui-primary font-black text-xl tracking-tight">
                            ¿Confirmar eliminación?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500 font-medium text-sm">
                            Esta acción eliminará a <span className="text-ui-primary font-bold">{employeeToDelete?.nombreCompleto}</span> permanentemente del directorio. Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2">
                        <AlertDialogCancel className="rounded-xl border-slate-200 font-bold text-slate-500">
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={confirmDelete}
                            className="rounded-xl bg-red-600 hover:bg-red-700 text-white font-black shadow-lg shadow-red-200 transition-all active:scale-95"
                        >
                            Eliminar Registro
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </InventoryLayout>
    );
};

export default EmployeeSection;