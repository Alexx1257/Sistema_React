import React from 'react';

const InventoryTable = ({ columns, data, renderMobileCard }) => {
    if (data.length === 0) {
        return (
            <div className="bg-white p-20 rounded-3xl border-2 border-dashed border-slate-200 text-center animate-fade-in">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p className="text-slate-500 font-semibold text-lg">No hay coincidencias</p>
                <p className="text-slate-400 text-sm">Intenta ajustar los términos de búsqueda.</p>
            </div>
        );
    }

    return (
        <div className="w-full animate-fade-in">
            {/* VISTA ESCRITORIO */}
            <div className="hidden lg:block bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-separate border-spacing-0">
                    <thead>
                        <tr>
                            {columns.map((col, idx) => (
                                <th 
                                    key={idx} 
                                    className={`
                                        bg-ui-primary p-5 text-[12px] font-bold text-slate-200 uppercase tracking-widest
                                        first:pl-8 last:pr-8 border-b border-slate-700
                                        ${col.center ? 'text-center' : ''}
                                    `}
                                >
                                    <span className="opacity-90">{col.header}</span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.map((item, rowIdx) => (
                            <tr 
                                key={rowIdx} 
                                className="group transition-all duration-200 hover:bg-slate-50/80 cursor-default"
                            >
                                {columns.map((col, colIdx) => (
                                    <td 
                                        key={colIdx} 
                                        className={`
                                            p-5 text-sm text-slate-600 transition-all
                                            group-hover:text-ui-primary first:pl-8 last:pr-8
                                            ${col.center ? 'text-center' : ''}
                                        `}
                                    >
                                        {col.render ? (
                                            <div className="relative z-10">{col.render(item)}</div>
                                        ) : (
                                            <span className="font-medium text-slate-700">{item[col.key]}</span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {/* Footer de la tabla para dar un acabado premium */}
                <div className="bg-slate-50/50 p-4 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400 font-bold uppercase tracking-tighter">
                    <span>Sistema de Inventario SIAI v2.0</span>
                    <span>Mostrando {data.length} registros encontrados</span>
                </div>
            </div>

            {/* VISTA MÓVIL: Las Cards ahora se verán más elegantes */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-5">
                {data.map((item, idx) => (
                    <div key={idx} className="transform transition-transform active:scale-[0.98]">
                        {renderMobileCard(item, idx)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InventoryTable;