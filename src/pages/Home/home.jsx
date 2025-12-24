import React, { useState, useEffect } from 'react';

// Componentes de Iconos
const Icon = ({ name, className = "w-5 h-5" }) => {
  const icons = {
    dashboard: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    computer: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    printer: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    ),
    projector: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    network: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    power: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    users: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-6.75a.75.75 0 00-1.5 0v2.25H15a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H21a.75.75 0 000-1.5h-2.25V9z" />
      </svg>
    ),
    services: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    documents: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    settings: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    notes: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    chevronDown: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    ),
    chevronRight: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
      </svg>
    ),
    bell: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    search: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    user: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    plus: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  };
  
  return icons[name] || null;
};

// Componente Sidebar
const Sidebar = ({ activeSection, setActiveSection, isSidebarOpen, setIsSidebarOpen }) => {
  const [expandedSections, setExpandedSections] = useState({
    bienes: false,
    servicios: false,
    documentos: false,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: 'dashboard',
    },
    {
      id: 'bienes',
      name: 'Bienes',
      icon: 'computer',
      subItems: [
        { id: 'computo', name: 'Equipos de cómputo' },
        { id: 'impresion', name: 'Equipos de impresión' },
        { id: 'proyeccion', name: 'Equipos de proyección' },
        { id: 'telecomunicaciones', name: 'Equipos de telecomunicaciones' },
        { id: 'energia', name: 'Equipos de energía' },
      ]
    },
    {
      id: 'empleados',
      name: 'Empleados',
      icon: 'users',
    },
    {
      id: 'servicios',
      name: 'Servicios',
      icon: 'services',
      subItems: [
        { id: 'hojas-servicio', name: 'Hojas de servicio' },
        { id: 'vales', name: 'Vales' },
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
    {
      id: 'notas',
      name: 'Notas Internas',
      icon: 'notes',
    },
    {
      id: 'sistema',
      name: 'Sistema',
      icon: 'settings',
    },
  ];

  return (
    <>
      {/* Overlay para móvil */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:flex lg:flex-col
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg">
              <Icon name="computer" className="w-8 h-8 text-blue-700" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Gestión de Bienes</h1>
              <p className="text-blue-200 text-sm">Área de Informática</p>
            </div>
          </div>
        </div>

        {/* Menú de navegación */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleSection(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors hover:bg-blue-700 ${
                        activeSection === item.id ? 'bg-blue-700' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={item.icon} />
                        <span>{item.name}</span>
                      </div>
                      <Icon 
                        name={expandedSections[item.id] ? 'chevronDown' : 'chevronRight'} 
                        className="w-4 h-4" 
                      />
                    </button>
                    
                    {expandedSections[item.id] && (
                      <ul className="mt-1 ml-8 space-y-1">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.id}>
                            <button
                              onClick={() => setActiveSection(subItem.id)}
                              className={`w-full text-left px-4 py-2 rounded-lg transition-colors hover:bg-blue-700 ${
                                activeSection === subItem.id ? 'bg-blue-700' : ''
                              }`}
                            >
                              <span className="text-sm">{subItem.name}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors hover:bg-blue-700 ${
                      activeSection === item.id ? 'bg-blue-700' : ''
                    }`}
                  >
                    <Icon name={item.icon} />
                    <span>{item.name}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Información de usuario */}
        <div className="p-4 border-t border-blue-700">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-full">
              <Icon name="user" className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Admin Sistema</p>
              <p className="text-blue-200 text-sm">Departamento de Informática</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

// Componente Header
const Header = ({ isSidebarOpen, setIsSidebarOpen, activeSection }) => {
  const sectionTitles = {
    'dashboard': 'Dashboard Principal',
    'computo': 'Equipos de Cómputo',
    'impresion': 'Equipos de Impresión',
    'proyeccion': 'Equipos de Proyección',
    'telecomunicaciones': 'Equipos de Telecomunicaciones',
    'energia': 'Equipos de Energía',
    'empleados': 'Directorio de Empleados',
    'hojas-servicio': 'Hojas de Servicio',
    'vales': 'Gestión de Vales',
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
          {/* Botón para abrir/cerrar sidebar en móvil */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Título de sección */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {sectionTitles[activeSection] || 'Dashboard'}
            </h1>
            <p className="text-gray-600 text-sm">
              Sistema de Gestión de Bienes - Área de Informática
            </p>
          </div>
        </div>

        {/* Barra de búsqueda y notificaciones */}
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
              <p className="text-sm text-gray-600">Departamento de Informática</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Componente para Notas Internas
const NotesSection = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Mantenimiento programado', date: '2024-03-15', priority: 'alta', content: 'Realizar mantenimiento preventivo a los servidores principales este fin de semana.' },
    { id: 2, title: 'Inventario pendiente', date: '2024-03-14', priority: 'media', content: 'Completar el inventario de equipos en el edificio B.' },
    { id: 3, title: 'Nuevos equipos', date: '2024-03-12', priority: 'baja', content: 'Recepcionar 10 nuevas laptops para el área de desarrollo.' },
  ]);

  const [newNote, setNewNote] = useState({ title: '', content: '', priority: 'media' });
  const [showForm, setShowForm] = useState(false);

  const handleAddNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;
    
    const note = {
      id: notes.length + 1,
      title: newNote.title,
      date: new Date().toISOString().split('T')[0],
      priority: newNote.priority,
      content: newNote.content,
    };
    
    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '', priority: 'media' });
    setShowForm(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'alta': return 'bg-red-500';
      case 'media': return 'bg-yellow-500';
      case 'baja': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Notas Internas</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Icon name="plus" className="w-4 h-4" />
          <span>Nueva Nota</span>
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                value={newNote.title}
                onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Título de la nota"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
              <select
                value={newNote.priority}
                onChange={(e) => setNewNote({...newNote, priority: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="baja">Baja (Verde)</option>
                <option value="media">Media (Amarillo)</option>
                <option value="alta">Alta (Rojo)</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
            <textarea
              value={newNote.content}
              onChange={(e) => setNewNote({...newNote, content: e.target.value})}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descripción de la nota..."
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddNote}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Guardar Nota
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getPriorityColor(note.priority)}`}></div>
                <h3 className="font-semibold text-gray-800">{note.title}</h3>
              </div>
              <span className="text-sm text-gray-500">{note.date}</span>
            </div>
            <p className="text-gray-600">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente para Widgets de Resumen
const SummaryWidgets = () => {
  const widgets = [
    { title: 'Total de Equipos', value: '245', color: 'bg-blue-500', icon: 'computer', change: '+12 este mes' },
    { title: 'Empleados Activos', value: '89', color: 'bg-green-500', icon: 'users', change: '+2 este mes' },
    { title: 'Servicios Pendientes', value: '15', color: 'bg-yellow-500', icon: 'services', change: '-3 esta semana' },
    { title: 'Vales Activos', value: '42', color: 'bg-purple-500', icon: 'documents', change: '+5 este mes' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {widgets.map((widget, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">{widget.title}</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{widget.value}</p>
              <p className="text-gray-600 text-sm mt-1">{widget.change}</p>
            </div>
            <div className={`${widget.color} p-3 rounded-lg`}>
              <Icon name={widget.icon} className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Componente principal del Dashboard
const DashboardContent = ({ activeSection }) => {
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div>
            <SummaryWidgets />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <NotesSection />
              
              {/* Widget adicional */}
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

      case 'computo':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Equipos de Cómputo</h2>
            <p>Contenido de gestión de equipos de cómputo...</p>
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
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h2>
            <p>Contenido de la sección seleccionada...</p>
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      {renderSectionContent()}
    </div>
  );
};

// Componente principal
const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Cerrar sidebar en móvil al cambiar de sección
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
        
        <div className="flex-1 flex flex-col lg:ml-0 overflow-hidden">
          <Header 
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            activeSection={activeSection}
          />
          
          <main className="flex-1 overflow-y-auto w-full h-full">
            <DashboardContent activeSection={activeSection} />
          </main>

          {/* Footer */}
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