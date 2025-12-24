import React, { useState } from 'react';
import Icon from '../../../Components/Common/Icon';

const Sidebar = ({ activeSection, setActiveSection, isSidebarOpen, setIsSidebarOpen }) => {
    const [expandedSections, setExpandedSections] = useState({
        bienes: false,
        servicios: false,
        documentos: false,
        computo: false,
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const menuItems = [
        { id: 'dashboard', name: 'Dashboard', icon: 'dashboard' },
        {
            id: 'bienes',
            name: 'Bienes',
            icon: 'computer',
            subItems: [
                {
                    id: 'computo',
                    name: 'Equipos de cómputo',
                    subItems: [
                        { id: 'cpu', name: 'CPU' },
                        { id: 'monitores', name: 'Monitores' },
                        { id: 'accesorios', name: 'Accesorios (Teclado y Ratón)' },
                    ]
                },
                {
                    id: 'impresion',
                    name: 'Equipos de impresión',
                    subItems: [
                        { id: 'impresoras', name: 'Impresoras' },
                        { id: 'escaneres', name: 'Escáneres' },
                        { id: 'plotters', name: 'Plotters' },
                    ]
                },
                {
                    id: 'proyeccion',
                    name: 'Equipos de proyección',
                    subItems: [{ id: 'proyectores', name: 'Proyectores' }]
                },
                {
                    id: 'telecomunicaciones',
                    name: 'Equipos de telecomunicaciones',
                    subItems: [
                        { id: 'switches', name: 'Switches' },
                        { id: 'routers', name: 'Routers' },
                    ]
                },
                {
                    id: 'energia',
                    name: 'Equipos de energía',
                    subItems: [
                        { id: 'reguladores', name: 'Reguladores' },
                        { id: 'ups', name: 'UPS' },
                    ]
                },
            ]
        },
        {
            id: 'empleados',
            name: 'Empleados',
            icon: 'users',
            subItems: [{ id: 'directorio', name: 'Directorio de empleados' }]
        },
        {
            id: 'servicios',
            name: 'Servicios',
            icon: 'services',
            subItems: [
                {
                    id: 'hojas-servicio',
                    name: 'Hojas de servicio',
                    subItems: [
                        { id: 'hoja-registro', name: 'Registro' },
                        { id: 'hoja-historial', name: 'Historial' },
                    ]
                },
                {
                    id: 'vales',
                    name: 'Vales',
                    subItems: [
                        { id: 'vale-entrada', name: 'Vales de entrada' },
                        { id: 'vale-salida', name: 'Vales de salida' },
                    ]
                },
            ]
        },
        {
            id: 'documentos',
            name: 'Documentos',
            icon: 'documents',
            subItems: [
                { id: 'generados', name: 'Documentos generados' },
                { id: 'recibidos', name: 'Documentos recibidos' },
                { id: 'sigmatic', name: 'Folios SIGTIC' },
            ]
        },
        { id: 'notas', name: 'Notas Internas', icon: 'notes' },
        { id: 'sistema', name: 'Sistema', icon: 'settings' },
    ];

    return (
        <>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 bg-gradient-to-b from-sidebar-start to-sidebar-end text-white
        transform transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'}
        lg:flex lg:flex-col
      `}>
                <div className="p-4 border-b border-brand-dark flex items-center justify-between">
                    <div className={`flex items-center space-x-3 overflow-hidden ${!isSidebarOpen && 'lg:hidden'}`}>
                        <div className="bg-white p-2 rounded-lg shrink-0">
                            <Icon name="computer" className="w-6 h-6 text-brand" />
                        </div>
                        <div className="whitespace-nowrap">
                            <h1 className="text-lg font-bold">Gestión</h1>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-brand-dark rounded-lg hidden lg:block"
                    >
                        <Icon name="menu" className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 overflow-x-hidden">
                    <ul className="space-y-1 px-3">
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                {item.subItems ? (
                                    <>
                                        <button
                                            onClick={() => isSidebarOpen ? toggleSection(item.id) : setIsSidebarOpen(true)}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors hover:bg-brand-dark ${activeSection === item.id ? 'bg-brand-dark' : ''
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <Icon name={item.icon} />
                                                <span className={`${!isSidebarOpen && 'lg:hidden'}`}>{item.name}</span>
                                            </div>
                                            {isSidebarOpen && (
                                                <Icon
                                                    name={expandedSections[item.id] ? 'chevronDown' : 'chevronRight'}
                                                    className="w-4 h-4"
                                                />
                                            )}
                                        </button>

                                        {isSidebarOpen && expandedSections[item.id] && (
                                            <ul className="mt-1 ml-4 space-y-1 border-l border-brand-dark pl-2">
                                                {item.subItems.map((subItem) => (
                                                    <li key={subItem.id}>
                                                        {subItem.subItems ? (
                                                            <>
                                                                <button
                                                                    onClick={() => toggleSection(subItem.id)}
                                                                    className="w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors hover:bg-brand-dark"
                                                                >
                                                                    <span className="text-sm">{subItem.name}</span>
                                                                    <Icon
                                                                        name={expandedSections[subItem.id] ? 'chevronDown' : 'chevronRight'}
                                                                        className="w-3 h-3"
                                                                    />
                                                                </button>
                                                                {expandedSections[subItem.id] && (
                                                                    <ul className="mt-1 ml-4 space-y-1 border-l border-brand-light pl-2">
                                                                        {subItem.subItems.map((deepItem) => (
                                                                            <li key={deepItem.id}>
                                                                                <button
                                                                                    onClick={() => setActiveSection(deepItem.id)}
                                                                                    className={`w-full text-left px-4 py-1.5 rounded-lg transition-colors hover:bg-brand-dark ${activeSection === deepItem.id ? 'bg-brand-dark font-bold' : ''
                                                                                        }`}
                                                                                >
                                                                                    <span className="text-xs">{deepItem.name}</span>
                                                                                </button>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <button
                                                                onClick={() => setActiveSection(subItem.id)}
                                                                className={`w-full text-left px-4 py-2 rounded-lg transition-colors hover:bg-brand-dark ${activeSection === subItem.id ? 'bg-brand-dark' : ''
                                                                    }`}
                                                            >
                                                                <span className="text-sm">{subItem.name}</span>
                                                            </button>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setActiveSection(item.id)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors hover:bg-brand-dark ${activeSection === item.id ? 'bg-brand-dark' : ''
                                            }`}
                                    >
                                        <Icon name={item.icon} />
                                        <span className={`${!isSidebarOpen && 'lg:hidden'}`}>{item.name}</span>
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-4 border-t border-brand-dark">
                    <div className="flex items-center space-x-3">
                        <div className="bg-brand p-2 rounded-full shrink-0">
                            <Icon name="user" className="w-5 h-5" />
                        </div>
                        {isSidebarOpen && (
                            <div className="flex-1 overflow-hidden">
                                <p className="font-medium truncate">Admin Sistema</p>
                                <p className="text-brand-light text-sm truncate">Informática</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;