import React from 'react';
import Icon from '../../../../Components/Common/Icon';

const TableActions = ({ onEdit, onDelete, onObserve, item }) => {
    return (
        <div className="flex gap-1.5 justify-center">
            {onEdit && (
                <button 
                    onClick={() => onEdit(item)}
                    title="Editar" 
                    className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all border border-blue-100"
                >
                    <Icon name="edit" className="w-4 h-4" />
                </button>
            )}
            {onDelete && (
                <button 
                    onClick={() => onDelete(item)}
                    title="Eliminar" 
                    className="p-1.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all border border-red-100"
                >
                    <Icon name="trash" className="w-4 h-4" />
                </button>
            )}
            {onObserve && (
                <button 
                    onClick={() => onObserve(item)}
                    title="Observaciones" 
                    className="p-1.5 bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white rounded-lg transition-all border border-amber-100"
                >
                    <Icon name="notes" className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

export default TableActions;