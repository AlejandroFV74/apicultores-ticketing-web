const statusStyles = {
  DRAFT: { label: "Borrador", bg: "bg-ink/5", text: "text-ink-soft", border: "border-ink/20" },
  ACTIVE: { label: "Activo", bg: "bg-stamp-green/10", text: "text-stamp-green", border: "border-stamp-green/30" },
  CANCELLED: { label: "Cancelado", bg: "bg-stamp-red/10", text: "text-stamp-red", border: "border-stamp-red/30" },
  FINISHED: { label: "Finalizado", bg: "bg-ink/5", text: "text-ink-soft", border: "border-ink/20" },
};

const formatDate = (value) => {
  if (!value) return "Sin fecha";
  const date = new Date(value);
  return date.toLocaleDateString("es-SV", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function EventCard({ event, showActions = false, onEdit, onDelete }) {
  const status = statusStyles[event.status] || statusStyles.DRAFT;

  return (
    <div className="ticket-card flex shadow-sm hover:shadow-md transition-shadow border border-ink/10 overflow-hidden">
      <div className="flex-1 p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display font-semibold text-xl text-ink leading-tight uppercase tracking-wide">
            {event.title}
          </h3>
          <span
            className={`shrink-0 text-xs font-semibold px-2 py-1 rounded border ${status.bg} ${status.text} ${status.border} uppercase tracking-wider`}
          >
            {status.label}
          </span>
        </div>

        <p className="text-sm text-ink-soft flex items-center gap-1.5 mb-1">
          <span className="font-medium">Lugar:</span> {event.venue}
        </p>

        <p className="text-sm text-ink-soft mb-3">
          {formatDate(event.startDate)} — {formatDate(event.endDate)}
        </p>

        {event.description && (
          <p className="text-sm text-ink-soft/80 line-clamp-2 mb-3">{event.description}</p>
        )}

        {event.maxTicketsPerUser != null && (
          <p className="text-xs text-ink-soft/70 uppercase tracking-wide">
            Máx. {event.maxTicketsPerUser} boletos por persona
          </p>
        )}
      </div>

      {showActions && (
        <div className="perforated flex flex-col justify-center gap-2 px-4 bg-paper-dark/40 min-w-[110px]">
          <button
            onClick={() => onEdit?.(event)}
            className="text-xs font-semibold uppercase tracking-wide text-ink bg-stub-light/40 hover:bg-stub-light/70 border border-stub/40 rounded px-3 py-2 transition-colors"
          >
            Modificar
          </button>
          <button
            onClick={() => onDelete?.(event)}
            className="text-xs font-semibold uppercase tracking-wide text-stamp-red bg-stamp-red/5 hover:bg-stamp-red/15 border border-stamp-red/30 rounded px-3 py-2 transition-colors"
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}

export default EventCard;
