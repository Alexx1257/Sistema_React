import React, { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import SummaryWidgets from './Components/SummaryWidgets';
import NotesSection from './Components/NotesSection';
import Icon from '../../Components/Common/Icon';

const DashboardContent = ({ activeSection }) => {
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="animate-fade-in">
            <SummaryWidgets />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <NotesSection />
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Actividad Reciente</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-ui-accent/20 p-2 rounded-lg text-ui-primary">
                      <Icon name="computer" className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-700 font-medium">Nuevo equipo registrado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">Sección en desarrollo</div>;
    }
  };

  return <div className="p-6">{renderSectionContent()}</div>;
};

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen w-full flex overflow-hidden bg-gray-50/50">
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
      </div>
    </div>
  );
};

export default Dashboard;