import React, { useState } from 'react';
import InventoryTable from '../Common/InventoryTable';

const MonitorSection = () => {
  const columns = [
    { 
      header: 'Expediente / Serie', 
      render: (item) => (
        <div className="font-bold text-sm">{item.expediente}</div>
      )
    },
    { header: 'Marca / Modelo', key: 'marca' },
    { header: 'Pulgadas', key: 'pulgadas' }, // Campo único de monitores
    { header: 'Usuario', key: 'usuario' },
    { 
        header: 'Estado SIGTEG', 
        center: true,
        render: (item) => (
            <span className={item.sigteg ? 'text-green-600' : 'text-red-600'}>
                {item.sigteg ? 'Activo' : 'Inactivo'}
            </span>
        )
    }
  ];

  const renderMonitorMobile = (item, idx) => (
    <div key={idx} className="bg-white p-4 rounded-xl border">
      <p className="font-bold">{item.marca} - {item.pulgadas}"</p>
      <p className="text-xs text-gray-400">{item.serie}</p>
    </div>
  );

  return (
    <InventoryTable 
      columns={columns} 
      data={[]} 
      renderMobileCard={renderMonitorMobile} 
    />
  );
};