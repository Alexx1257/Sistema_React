import React, { useState, useMemo } from 'react';
import { exportToExcel, exportToPDF } from '../Common/ExportUtils';
import InventoryLayout from '../Common/InventoryLayout';
import InventoryTable from '../Common/InventoryTable';
import EmployeeForm from './Components/EmployeeForm';

const EmployeeSection = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ area: '' });
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [employees] = useState([
        { id: 1, nombreCompleto: 'Ana López', correoElectronico: 'alopez@empresa.com', cisco: '1234', area: 'Finanzas', subarea: 'Contabilidad', status: 'Activo' },
        { id: 2, nombreCompleto: 'Carlos Ruíz', correoElectronico: 'cruiz@empresa.com', cisco: '5678', area: 'Informática', subarea: 'Soporte', status: 'Activo' }
    ]);

    const filterOptions = {
        areas: [...new Set(employees.map(e => e.area))]
    };

    const filteredData = useMemo(() => {
        return employees.filter(item => {
            const matchesSearch = searchTerm === '' || 
                [item.nombreCompleto, item.correoElectronico, item.cisco]
                .some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesArea = filters.area === '' || item.area === filters.area;
            return matchesSearch && matchesArea;
        });
    }, [searchTerm, filters, employees]);

    const columns = [
        { 
            header: 'Empleado', 
            render: (item) => (
                <div className="text-xs-table font-bold text-ui-primary">{item.nombreCompleto}</div>
            )
        },
        { 
            header: 'Contacto', 
            render: (item) => (
                <div className="text-xxs">
                    <p className="font-bold text-slate-700">{item.correoElectronico}</p>
                    <p className="text-ui-accent font-mono">Cisco: {item.cisco}</p>
                </div>
            )
        },
        { 
            header: 'Ubicación', 
            render: (item) => (
                <div className="text-xxs">
                    <p className="font-bold text-slate-700">{item.area}</p>
                    <p className="text-slate-400">{item.subarea}</p>
                </div>
            )
        },
        { 
            header: 'Status', 
            center: true,
            render: (item) => (
                <span className={`px-2 py-1 rounded-lg text-xxs font-bold ${item.status === 'Activo' ? 'bg-green-500 text-white' : 'bg-slate-400 text-white'}`}>
                    {item.status}
                </span>
            )
        }
    ];

    return (
        <InventoryLayout 
            title="Directorio de Empleados"
            subtitle="Gestión y consulta de personal de la empresa."
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filters={filters}
            setFilters={setFilters}
            filterOptions={filterOptions}
            onExportExcel={() => exportToExcel(filteredData, 'Directorio_Empleados')}
            onExportPDF={() => exportToPDF(filteredData, 'Directorio de Empleados')}
            onAdd={() => setIsFormOpen(true)}
        >
            {isFormOpen && (
                <EmployeeForm onClose={() => setIsFormOpen(false)} onSave={(newData) => console.log("Guardando:", newData)} />
            )}

            <InventoryTable columns={columns} data={filteredData} />
        </InventoryLayout>
    );
};

export default EmployeeSection;