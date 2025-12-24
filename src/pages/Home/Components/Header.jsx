import React from 'react';
import Icon from '../../../Components/Common/Icon';

const Header = ({ isSidebarOpen, setIsSidebarOpen, activeSection }) => {
    const sectionTitles = {
        'dashboard': 'Dashboard Principal',
        'cpu': 'Gestión de CPU',
        'monitores': 'Gestión de Monitores',
        'accesorios': 'Accesorios Asignados',
        'directorio': 'Directorio de Empleados',
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
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative hidden lg:block">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ui-primary focus:ring-2 focus:ring-ui-accent transition-all"
                        />
                        <Icon name="search" className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;