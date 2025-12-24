import React from 'react';
import Icon from '../../../Components/Common/Icon';

const SummaryWidgets = () => {
    const widgets = [
        { title: 'Total de Equipos', value: '245', color: 'bg-ui-primary', icon: 'computer' },
        { title: 'Empleados Activos', value: '89', color: 'bg-green-500', icon: 'users' },
        { title: 'Servicios Pendientes', value: '15', color: 'bg-yellow-500', icon: 'services' },
        { title: 'Vales Activos', value: '42', color: 'bg-purple-500', icon: 'documents' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {widgets.map((widget, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{widget.title}</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{widget.value}</p>
                        </div>
                        <div className={`${widget.color} p-3 rounded-lg shadow-sm`}>
                            <Icon name={widget.icon} className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SummaryWidgets;