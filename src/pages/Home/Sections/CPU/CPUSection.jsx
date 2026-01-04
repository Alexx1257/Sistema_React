import React, { useState, useMemo } from 'react';
import InventoryLayout from '../Common/InventoryLayout';
import InventoryTable from '../Common/InventoryTable';
import Icon from '../../../../Components/Common/Icon';

const CPUSection = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        marca: '',
        area: '',
        sigtig: ''
    });

    const [cpus] = useState([
        { 
            id: 1, expediente: 'EXP-101', serie: 'SN-001-HP', marca: 'HP', modelo: 'EliteDesk', 
            tipo: 'CPU', ip: '192.168.1.10', hostname: 'PC-CONTABILIDAD', correoOffice: 'cont@empresa.com', 
            usuario: 'Ana López', area: 'Finanzas', subarea: 'Contabilidad', empresa: 'Empresa A',
            sitio: 'Torre Administrativa - Piso 2', status: 'Activo', sigtig: true, 
            monitor: 'Dell 24"', accesorios: 'Teclado/Mouse HP' 
        },
        { 
            id: 2, expediente: 'EXP-102', serie: 'SN-992-DELL', marca: 'Dell', modelo: 'Latitude', 
            tipo: 'LAPTOP', ip: '192.168.1.15', hostname: 'LAP-SOPORTE', correoOffice: 'soporte@empresa.com', 
            usuario: 'Carlos Ruíz', area: 'Informática', subarea: 'Soporte', empresa: 'Empresa B',
            sitio: 'Planta Industrial - SITE', status: 'Mantenimiento', sigtig: false, 
            monitor: 'HP 22"', accesorios: 'Mouse Genius' 
        }
    ]);

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
            header: 'Rel.', 
            render: (item) => (
                <div className="flex gap-1.5">
                    <div title={`Monitor: ${item.monitor}`} className="p-1.5 bg-slate-50 text-slate-400 hover:text-ui-accent hover:bg-white hover:shadow-sm rounded-lg transition-all cursor-help border border-slate-100">
                        <Icon name="computer" className="w-4 h-4" />
                    </div>
                    <div title={`Accesorios: ${item.accesorios}`} className="p-1.5 bg-slate-50 text-slate-400 hover:text-ui-accent hover:bg-white hover:shadow-sm rounded-lg transition-all cursor-help border border-slate-100">
                        <Icon name="settings" className="w-4 h-4" />
                    </div>
                </div>
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
            onExportExcel={() => console.log("Exportando Excel...")}
            onExportPDF={() => console.log("Generando PDF...")}
        >
            <InventoryTable 
                columns={columns} 
                data={filteredData} 
                renderMobileCard={renderCPUMobile} 
            />
        </InventoryLayout>
    );
};

export default CPUSection;