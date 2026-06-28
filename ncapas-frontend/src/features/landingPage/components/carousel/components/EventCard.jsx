import { useNavigate } from "react-router-dom";
import EventVenueBadge from "./EventVenueBadge";
import EventDateBadge from "./EventDateBadge";


export default function EventCard({ event }) {
  const navigate = useNavigate();
  const eventId = event?.id ?? event?.eventId;

  const handleOpenEvent = () => {
    if (!eventId) return;
    navigate(`/events/${eventId}`);
  };

  return (
    <button
      type="button"
      onClick={handleOpenEvent}
      disabled={!eventId}
      className="flex-shrink-0 w-80 group cursor-pointer transition-transform duration-300 hover:scale-105 text-left"
    >
      <div className="glass-card p-0 overflow-hidden h-full flex flex-col">
        <div className="relative h-64 overflow-hidden bg-muted">
          <img
            src={event?.image || "/event_background.jpg"}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <EventDateBadge date={event.startDate} />

          <EventVenueBadge
            category={event.venue}
          />
        </div>

        {/* Contenido */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <h3 className="text-xl font-bold text-foreground mb-4 line-clamp-2">
            {event.title}
          </h3>

          <span className="
            w-full mt-4 inline-flex justify-center
            bg-gradient-to-r
            from-neon-blue
            to-neon-purple
            text-white
            font-semibold
            py-3
            rounded-lg
            transition-all
            duration-300
            group-hover:shadow-lg
            group-hover:shadow-neon-blue/50
          ">
            Ver detalles
          </span>
        </div>
      </div>
    </button>
  );
}
