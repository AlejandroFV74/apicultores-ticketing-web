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

export default function PurchasedEventCard({
  event,
  onViewQR,
  onTransfer,
}) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="md:flex">
        {/* Imagen */}
        <div className="md:w-64 h-56 md:h-auto">
          <img
            src={"/event_background.jpg"}
            alt={event.eventName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Información */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-neon-purple/20 border border-neon-purple/40 text-neon-purple">
                Evento activo
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-3">
              {event.eventName}
            </h3>

            <div className="space-y-2 text-sm text-foreground/70">
              <p>
                📅 {formatDateTime(event.eventDate)}
              </p>

              <p>
                📍 {event.seatType}
              </p>

              <p>
                🎟️ {event.seatNumber} entrada(s)
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => onViewQR(event)}
              className="
                flex-1
                px-6
                py-3
                rounded-lg
                font-semibold
                bg-gradient-to-r
                from-neon-blue
                to-neon-purple
                text-white
                transition-all
                hover:shadow-lg
                hover:shadow-neon-blue/50
              "
            >
              Ver QR
            </button>

            <button
              onClick={() => onTransfer(event)}
              className="
                flex-1
                px-6
                py-3
                rounded-lg
                font-semibold
                border
                border-border
                hover:bg-white/10
                transition-colors
              "
            >
              Transferir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
