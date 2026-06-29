import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'create',
      title: 'Crear Evento',
      icon: '➕',
      onClick: () => navigate('/organizer/create')
    },
    {
      id: 'events',
      title: 'Mis Eventos',
      icon: '📋',
      onClick: () => navigate('/organizer/events')
    },
    {
      id: 'tickets',
      title: 'Mis Entradas',
      icon: '🎟️',
      onClick: () => navigate('/mytickets')
    },
    {
      id: 'explore',
      title: 'Explorar',
      icon: '🔍',
      onClick: () => navigate('/')
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="mt-2 text-sm font-medium text-white">{action.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;