import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpcomingEvents = ({ events = [] }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha por confirmar';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Fecha inválida';
      return date.toLocaleDateString('es-SV', {
        day: '2-digit',
        month: 'long',
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
        <h2 className="text-lg font-semibold text-white mb-4">Eventos Próximos</h2>
        <p className="text-gray-400 text-center py-8">No hay eventos próximos</p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">Eventos Próximos</h2>
      </div>
      <div className="divide-y divide-white/5">
        {events.map((event) => {
          const eventId = event?.eventId ?? event?.id;
          return (
            <div
              key={eventId}
              className="p-4 hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => handleEventClick(event)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-white">{event.title}</h3>
                  <p className="text-sm text-gray-400">
                    📍 {event.location || event.venue || 'Ubicación por confirmar'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-neon-blue">
                    📅 {formatDate(event.date || event.startDate)}
                  </p>
                  <p className="text-xs text-gray-400">
                    🎟️ {event.availableTickets ?? event.ticketsAvailable ?? 0} disponibles
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingEvents;