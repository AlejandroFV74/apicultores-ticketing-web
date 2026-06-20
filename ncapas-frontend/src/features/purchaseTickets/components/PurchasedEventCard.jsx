export default function PurchasedEventCard({
  event,
  onViewQR,
}) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="md:flex">
        {/* Imagen */}
        <div className="md:w-64 h-56 md:h-auto">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Información */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-neon-purple/20 border border-neon-purple/40 text-neon-purple">
                {event.category}
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-3">
              {event.title}
            </h3>

            <div className="space-y-2 text-sm text-foreground/70">
              <p>
                📅 {event.date}
              </p>

              <p>
                📍 {event.location}
              </p>

              <p>
                🎟️ {event.tickets} entrada(s)
              </p>
            </div>
          </div>

          <button
            onClick={() => onViewQR(event)}
            className="
              mt-6
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
        </div>
      </div>
    </div>
  );
}