function formatDateTime(date) {
  if (!date) return "Por confirmar";

  return new Date(date).toLocaleString("es-SV", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function EventInfoCard({ event }) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="md:flex">
        {/* Imagen */}
        <div className="md:w-64 h-56 md:h-auto">
          <img
            src="/event_background.jpg"
            alt={event.eventName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Información */}
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-neon-blue/20 border border-neon-blue/40 text-neon-blue">
              Información del evento
            </span>
          </div>

          <h3 className="text-2xl font-bold mb-4">
            {event.eventName}
          </h3>

          <div className="space-y-3 text-sm text-foreground/70">
            <p>
              📅 <span className="font-medium">Fecha:</span>{" "}
              {formatDateTime(event.eventDate)}
            </p>

            <p>
              📍 <span className="font-medium">Tipo de asiento:</span>{" "}
              {event.seatType}
            </p>

            <p>
              🎟️ <span className="font-medium">Asiento:</span>{" "}
              {event.seatNumber}
            </p>

            {event.location && (
              <p>
                📌 <span className="font-medium">Ubicación:</span>{" "}
                {event.location}
              </p>
            )}

            {event.description && (
              <p className="pt-2 text-foreground/60">
                {event.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}