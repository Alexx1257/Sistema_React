import React, { useState } from 'react';
import Icon from '../../../Components/Common/Icon';

const NotesSection = () => {
    // Estado para almacenar la lista de notas
    const [notes, setNotes] = useState([
        {
            id: 1,
            title: 'Mantenimiento programado',
            date: '2024-03-15',
            priority: 'alta',
            content: 'Realizar mantenimiento preventivo a los servidores principales este fin de semana.'
        },
        {
            id: 2,
            title: 'Inventario pendiente',
            date: '2024-03-14',
            priority: 'media',
            content: 'Completar el inventario de equipos en el edificio B.'
        },
        {
            id: 3,
            title: 'Nuevos equipos',
            date: '2024-03-12',
            priority: 'baja',
            content: 'Recepcionar 10 nuevas laptops para el área de desarrollo.'
        },
    ]);

    // Estados para manejar el formulario de nueva nota
    const [newNote, setNewNote] = useState({ title: '', content: '', priority: 'media' });
    const [showForm, setShowForm] = useState(false);

    // Función para agregar una nueva nota
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

    // Función auxiliar para los colores de prioridad
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'alta': return 'bg-red-500';
            case 'media': return 'bg-yellow-500';
            case 'baja': return 'bg-green-500';
            default: return 'bg-gray-400';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Notas Internas</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center space-x-2 bg-ui-primary hover:bg-ui-primaryHover text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
                >
                    <Icon name="plus" className="w-4 h-4" />
                    <span>{showForm ? 'Cancelar' : 'Nueva Nota'}</span>
                </button>
            </div>

            {/* Formulario para agregar notas */}
            {showForm && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 tracking-tight">Título</label>
                            <input
                                type="text"
                                value={newNote.title}
                                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ui-primary focus:ring-2 focus:ring-ui-accent transition-all"
                                placeholder="Título de la nota"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 tracking-tight">Prioridad</label>
                            <select
                                value={newNote.priority}
                                onChange={(e) => setNewNote({ ...newNote, priority: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ui-primary focus:ring-2 focus:ring-ui-accent transition-all"
                            >
                                <option value="baja">Baja (Verde)</option>
                                <option value="media">Media (Amarillo)</option>
                                <option value="alta">Alta (Rojo)</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1 tracking-tight">Contenido</label>
                        <textarea
                            value={newNote.content}
                            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ui-primary focus:ring-2 focus:ring-ui-accent transition-all"
                            placeholder="Descripción detallada de la nota..."
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={handleAddNote}
                            className="px-6 py-2 bg-ui-primary hover:bg-ui-primaryHover text-white rounded-lg transition-colors font-bold shadow-md"
                        >
                            Guardar Nota
                        </button>
                    </div>
                </div>
            )}

            {/* Listado de notas */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <div
                            key={note.id}
                            className="border border-gray-100 rounded-lg p-4 hover:border-ui-accent/50 hover:bg-gray-50/50 transition-all duration-200"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(note.priority)} shadow-sm`}></div>
                                    <h3 className="font-semibold text-gray-800 tracking-tight">{note.title}</h3>
                                </div>
                                <span className="text-xs text-gray-400 font-medium">{note.date}</span>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">{note.content}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400 py-10">No hay notas registradas.</p>
                )}
            </div>
        </div>
    );
};

export default NotesSection;