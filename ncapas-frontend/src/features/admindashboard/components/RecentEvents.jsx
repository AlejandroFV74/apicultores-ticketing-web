import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecentEvents = ({ events = [] }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha por confirmar';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Fecha inválida';
      return date.toLocaleDateString('es-SV', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return 'Fecha por confirmar';
    }
  };

  const handleEventClick = (event) => {
    const eventId = event?.eventId ?? event?.id;
    if (eventId) {
      navigate(`/events/${eventId}`);
    }
  };

  if (events.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Eventos Recientes</h2>
          <button
            onClick={() => navigate('/organizer/events')}
            className="text-sm text-neon-blue hover:text-neon-blue/80 font-medium"
          >
            Ver todos →
          </button>
        </div>
        <p className="text-gray-400 text-center py-8">No hay eventos recientes</p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Eventos Recientes</h2>
          <button
            onClick={() => navigate('/organizer/events')}
            className="text-sm text-neon-blue hover:text-neon-blue/80 font-medium"
          >
            Ver todos →
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Evento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ubicación</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {events.map((event) => {
              const eventId = event?.eventId ?? event?.id;
              return (
                <tr
                  key={eventId}
                  className="hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => handleEventClick(event)}
                >
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
                    {event.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {formatDate(event.date || event.startDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {event.location || event.venue || 'Sin ubicación'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      event.status === 'ACTIVE' || event.status === 'ACTIVO' 
                        ? 'bg-green-500/20 text-green-400' 
                        : event.status === 'DRAFT' || event.status === 'BORRADOR'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : event.status === 'CANCELLED' || event.status === 'CANCELADO'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {event.status || 'Pendiente'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentEvents;