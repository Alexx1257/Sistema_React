import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import SummaryWidgets from './Components/SummaryWidgets';
import NotesSection from './Components/NotesSection';
import CPUSection from './Sections/CPU/CPUSection'; // Importa tu nueva sección

const Dashboard = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                
                {/* Área principal de contenido con Rutas Anidadas */}
                <main className="flex-1 overflow-y-auto w-full h-full p-6">
                    <Routes>
                        {/* Ruta por defecto: /dashboard */}
                        <Route index element={
                            <div className="animate-fade-in">
                                <SummaryWidgets />
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                                    <NotesSection />
                                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                        <h2 className="text-xl font-bold text-gray-800 mb-6">Actividad Reciente</h2>
                                        {/* ... tu contenido de actividad ... */}
                                    </div>
                                </div>
                            </div>
                        } />

                        {/* Ruta para CPU: /dashboard/cpu */}
                        <Route path="cpu" element={<CPUSection />} />

                        {/* Rutas para secciones futuras */}
                        <Route path="monitores" element={<div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 text-center">Sección de Monitores en desarrollo</div>} />
                        <Route path="impresoras" element={<div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 text-center">Sección de Impresoras en desarrollo</div>} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;