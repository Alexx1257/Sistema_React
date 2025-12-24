import React from 'react';
import Icon from '../../../components/common/Icon';

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

export default SummaryWidgets;