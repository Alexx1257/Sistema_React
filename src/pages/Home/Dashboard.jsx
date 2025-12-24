import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SummaryWidgets from './components/SummaryWidgets';
import NotesSection from './Components/NotesSection';
import Icon from '../../components/common/Icon';

const DashboardContent = ({ activeSection }) => {
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div>
            <SummaryWidgets />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <NotesSection />
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Actividad Reciente</h2>
                <div className="space-y-4">
                  {[
                    { action: 'Nuevo equipo registrado', user: 'Juan Pérez', time: 'Hace 2 horas' },
                    { action: 'Vale de salida generado', user: 'María García', time: 'Hace 4 horas' },
                    { action: 'Mantenimiento completado', user: 'Carlos Ruiz', time: 'Hace 1 día' },
                    { action: 'Actualización de inventario', user: 'Ana López', time: 'Hace 2 días' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Icon name="computer" className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{activity.action}</p>
                        <p className="text-sm text-gray-600">Por {activity.user} • {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'cpu':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Gestión de CPU</h2>
            <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
              <p className="text-blue-800 text-sm">Información: Cada CPU debe estar relacionada con el número de serie del monitor y los accesorios asignados.</p>
            </div>
            <p>Listado de CPUs y asignaciones...</p>
          </div>
        );

      case 'notas':
        return (
          <div>
            <SummaryWidgets />
            <NotesSection />
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace('-', ' ')}
            </h2>
            <p>Contenido de la sección seleccionada...</p>
          </div>
        );
    }
  };

  return <div className="p-6">{renderSectionContent()}</div>;
};

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [activeSection]);

  return (
    <div className="h-screen w-full flex overflow-hidden bg-gray-50">
      <div className="flex w-full h-full">
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            activeSection={activeSection}
          />
          
          <main className="flex-1 overflow-y-auto w-full h-full">
            <DashboardContent activeSection={activeSection} />
          </main>

          <footer className="bg-white border-t border-gray-200 px-6 py-4 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm">
                Sistema de Gestión de Bienes • Área de Informática • Versión 2.1.0
              </p>
              <p className="text-gray-500 text-sm mt-2 md:mt-0">
                &copy; {new Date().getFullYear()} Todos los derechos reservados
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;