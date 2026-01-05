import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import SummaryWidgets from './Components/SummaryWidgets';
import NotesSection from './Components/NotesSection';
import CPUSection from './Sections/CPU/CPUSection';
import MonitorSection from './Sections/MONITOR/MonitorSection';
import EmployeeSection from './Sections/Employees/EmployeeSection';
// Código nuevo: Importación de la sección de administración de catálogos
import CatalogSection from './CatalogSection';
const Dashboard = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            <Sidebar 
                activeSection={activeSection} 
                setActiveSection={setActiveSection}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Header 
                    isSidebarOpen={isSidebarOpen} 
                    setIsSidebarOpen={setIsSidebarOpen}
                    activeSection={activeSection}
                />

                <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
                    <Routes>
                        {/* Ruta por defecto: /dashboard */}
                        <Route index element={
                            <div className="space-y-8 max-w-[1600px] mx-auto animate-fade-in">
                                <SummaryWidgets />
                                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                                    <div className="xl:col-span-2">
                                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200 p-8 min-h-[400px]">
                                            <h2 className="text-xl font-black text-ui-primary mb-6">Actividad Reciente</h2>
                                            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                                                <p className="text-sm font-medium">No hay actividad reciente para mostrar.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="xl:col-span-1">
                                        <NotesSection />
                                    </div>
                                </div>
                            </div>
                        } />

                        {/* Ruta para CPU: /dashboard/cpu */}
                        <Route path="cpu" element={<CPUSection />} />

                        {/* Ruta para Monitores: /dashboard/monitores */}
                        <Route path="monitores" element={<MonitorSection />} />

                        {/* Ruta para el directorio de empleados /dashboard/directorio */}
                        <Route path="directorio" element={<EmployeeSection />} />

                        {/* Código nuevo: Ruta para la administración de catálogos (Marcas/Modelos) */}
                        <Route path="catalogos" element={<CatalogSection />} />

                        {/* Rutas para secciones futuras en desarrollo */}
                        <Route path="impresoras" element={
                            <div className="p-12 bg-white rounded-3xl shadow-xl border border-slate-200 text-center">
                                <h2 className="text-2xl font-black text-ui-primary italic uppercase tracking-tighter">Sección de Impresoras</h2>
                                <p className="text-slate-400 font-bold mt-2">Módulo en proceso de desarrollo técnico.</p>
                            </div>
                        } />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;