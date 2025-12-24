import React from 'react';
import Icon from '../../../components/common/Icon';

const Header = ({ isSidebarOpen, setIsSidebarOpen, activeSection }) => {
    const sectionTitles = {
        'dashboard': 'Dashboard Principal',
        'cpu': 'Gestión de CPU',
        'monitores': 'Gestión de Monitores',
        'accesorios': 'Accesorios Asignados',
        'impresoras': 'Inventario de Impresoras',
        'escaneres': 'Escáneres',
        'plotters': 'Plotters',
        'proyectores': 'Equipos de Proyección',
        'switches': 'Switches de Red',
        'routers': 'Routers',
        'reguladores': 'Reguladores de Voltaje',
        'ups': 'Sistemas UPS',
        'directorio': 'Directorio de Empleados',
        'hoja-registro': 'Registro de Hoja de Servicio',
        'hoja-historial': 'Historial de Servicios',
        'vale-entrada': 'Vales de Entrada',
        'vale-salida': 'Vales de Salida',
        'generados': 'Documentos Generados',
        'recibidos': 'Documentos Recibidos',
        'sigmatic': 'Folios SIGTIC',
        'notas': 'Notas Internas',
        'sistema': 'Configuración del Sistema',
    };

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <Icon name="menu" className="w-6 h-6 text-gray-600" />
                    </button>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            {sectionTitles[activeSection] || 'Dashboard'}
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Sistema de Gestión de Bienes - Área de Informática
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative hidden lg:block">
                        <input
                            type="text"
                            placeholder="Buscar en el sistema..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Icon name="search" className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    </div>

                    <button className="relative p-2 rounded-lg hover:bg-gray-100">
                        <Icon name="bell" className="w-6 h-6 text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    <div className="hidden lg:flex items-center space-x-3">
                        <div className="text-right">
                            <p className="font-medium text-gray-800">Administrador</p>
                            <p className="text-sm text-gray-600">Área de TI</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;