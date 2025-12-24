import React, { useState } from 'react';
import Icon from '../../../components/common/Icon';

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
                                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Título de la nota"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                            <select
                                value={newNote.priority}
                                onChange={(e) => setNewNote({ ...newNote, priority: e.target.value })}
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
                            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
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

export default NotesSection;