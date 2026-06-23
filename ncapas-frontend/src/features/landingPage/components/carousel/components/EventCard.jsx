import EventVenueBadge from "./EventVenueBadge";
import EventDateBadge from "./EventDateBadge";
import PrimaryButton from "./PrimaryButton";


export default function EventCard({ event }) {
  return (
    <div className="flex-shrink-0 w-80 group cursor-pointer transition-transform duration-300 hover:scale-105">
      <div className="glass-card p-0 overflow-hidden h-full flex flex-col">
        {/* Imagen */}
        <div className="relative h-64 overflow-hidden bg-muted">
          <img
            src={"public/event_background.jpg"}
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

          <PrimaryButton>
            Reservar Asientos
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}