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

               
            </div>
        </header>
    );
};

export default Header;