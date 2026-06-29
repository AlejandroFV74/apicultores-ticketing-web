const statusStyles = {
  DRAFT: {
    label: "Borrador",
    bg: "bg-foreground/5",
    text: "text-foreground/60",
    border: "border-foreground/15",
  },
  ACTIVE: {
    label: "Activo",
    bg: "bg-neon-blue/10",
    text: "text-neon-blue",
    border: "border-neon-blue/40",
  },
  CANCELLED: {
    label: "Cancelado",
    bg: "bg-destructive/10",
    text: "text-destructive",
    border: "border-destructive/40",
  },
  FINISHED: {
    label: "Finalizado",
    bg: "bg-neon-purple/10",
    text: "text-neon-purple",
    border: "border-neon-purple/40",
  },
};

const formatDate = (value) => {
  if (!value) return "Sin fecha";

  return new Date(value).toLocaleDateString("es-SV", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function EventCard({
  event,
  showActions = false,
  onEdit,
  onDelete,
}) {
  const status = statusStyles[event.status] || statusStyles.DRAFT;

  return (
    <article className="glass-card overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold leading-tight text-foreground">
            {event.title}
          </h3>

          <span
            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${status.bg} ${status.text} ${status.border}`}
          >
            {status.label}
          </span>
        </div>

        <p className="mb-1 text-sm text-foreground/60">
          <span className="font-medium">Lugar:</span> {event.venue}
        </p>

        <p className="mb-3 text-sm text-foreground/60">
          {formatDate(event.startDate)} - {formatDate(event.endDate)}
        </p>

        {event.description ? (
          <p className="mb-3 line-clamp-2 text-sm text-foreground/70">
            {event.description}
          </p>
        ) : null}

        {event.maxTicketsPerUser != null ? (
          <p className="text-xs uppercase tracking-wide text-foreground/50">
            Máx. {event.maxTicketsPerUser} boletos por persona
          </p>
        ) : null}
      </div>

      {showActions ? (
        <div className="flex gap-3 border-t border-neon-blue/20 bg-muted/20 p-4">
          <button
            type="button"
            onClick={() => onEdit?.(event)}
            className="flex-1 rounded-lg border border-neon-blue/40 bg-neon-blue/10 px-3 py-2 text-sm font-semibold text-neon-blue transition-colors hover:bg-neon-blue/20"
          >
            Modificar
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(event)}
            className="flex-1 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/20"
          >
            Eliminar
          </button>
        </div>
      ) : null}
    </article>
  );
}
