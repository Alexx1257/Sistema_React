import React, { useState, useMemo } from 'react';
import InventoryLayout from '../Common/InventoryLayout';
import InventoryTable from '../Common/InventoryTable';
import MonitorForm from './MonitorForm';
import { exportToExcel, exportToPDF } from '../Common/ExportUtils';

const MonitorSection = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ marca: '', area: '' });
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [monitors] = useState([
        { id: 1, expediente: 'MON-101', serie: 'SN-V123', marca: 'Dell', modelo: 'UltraSharp', pulgadas: '24', usuario: 'Ana López', area: 'Finanzas', sigteg: true, status: 'Activo' },
        { id: 2, expediente: 'MON-102', serie: 'SN-X456', marca: 'HP', modelo: 'EliteDisplay', pulgadas: '27', usuario: 'Carlos Ruíz', area: 'Informática', sigteg: false, status: 'Mantenimiento' }
    ]);

    const filterOptions = {
        marcas: [...new Set(monitors.map(m => m.marca))],
        areas: [...new Set(monitors.map(m => m.area))]
    };

    const filteredData = useMemo(() => {
        return monitors.filter(item => {
            const matchesSearch = searchTerm === '' || 
                [item.expediente, item.serie, item.usuario, item.marca]
                .some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesMarca = filters.marca === '' || item.marca === filters.marca;
            const matchesArea = filters.area === '' || item.area === filters.area;
            return matchesSearch && matchesMarca && matchesArea;
        });
    }, [searchTerm, filters, monitors]);

    const columns = [
        { 
            header: 'Expediente / Serie', 
            render: (item) => (
                <div>
                    <div className="font-bold text-xs-table text-ui-primary">{item.expediente}</div>
                    <div className="text-xxs text-ui-textMuted uppercase font-mono">{item.serie}</div>
                </div>
            )
        },
        { 
            header: 'Marca / Modelo', 
            render: (item) => (
                <div className="text-xs-table">
                    <span className="font-bold">{item.marca}</span> <span className="text-slate-400">{item.modelo}</span>
                </div>
            )
        },
        { header: 'Pulgadas', key: 'pulgadas', render: (item) => <span className="text-xs-table font-mono">{item.pulgadas}"</span> },
        { header: 'Usuario / Área', render: (item) => (
            <div className="text-xxs">
                <p className="font-bold text-slate-700">{item.usuario}</p>
                <p className="text-slate-400">{item.area}</p>
            </div>
        )},
        { 
            header: 'Estado SIGTEG', 
            center: true,
            render: (item) => (
                <span className={`px-3 py-0.5 rounded-full text-tiny font-black ${item.sigteg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.sigteg ? 'SIGTEG' : 'NO'}
                </span>
            )
        }
    ];

    const renderMonitorMobile = (item, idx) => (
        <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className={`absolute left-0 top-0 h-full w-2 ${item.sigteg ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <div className="flex justify-between items-start pl-2">
                <div>
                    <p className="text-xxs font-black text-ui-accent uppercase tracking-widest">{item.marca}</p>
                    <p className="text-sm font-black text-ui-primary leading-none">{item.expediente}</p>
                </div>
                <span className="text-xs font-black bg-slate-100 px-2 py-1 rounded-lg">{item.pulgadas}"</span>
            </div>
        </div>
    );

    return (
        <InventoryLayout 
            title="Inventario de Monitores"
            subtitle="Gestión de pantallas y monitores asignados."
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filters={filters}
            setFilters={setFilters}
            filterOptions={filterOptions}
            onExportExcel={() => exportToExcel(filteredData, 'Inventario_Monitores')}
            onExportPDF={() => exportToPDF(filteredData, 'Inventario de Monitores')}
            onAdd={() => setIsFormOpen(true)}
        >
            {isFormOpen && (
                <MonitorForm onClose={() => setIsFormOpen(false)} onSave={(newData) => console.log("Guardando:", newData)} />
            )}

            <InventoryTable 
                columns={columns} 
                data={filteredData} 
                renderMobileCard={renderMonitorMobile} 
            />
        </InventoryLayout>
    );
};

export default MonitorSection;