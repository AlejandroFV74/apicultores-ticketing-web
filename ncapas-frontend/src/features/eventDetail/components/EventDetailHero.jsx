function formatEventDate(date) {
  if (!date) return "Fecha por confirmar";

  return new Date(date).toLocaleDateString("es-SV", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function EventDetailHero({ event }) {
  const image = event?.image || "/event_background.jpg";

  return (
    <section className="relative min-h-[520px] overflow-hidden">
      <img
        src={image}
        alt={event?.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />

      <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-16">
        <div className="max-w-3xl">
          <div className="mb-6 flex flex-wrap gap-3">
            <span className="rounded-full border border-neon-purple/50 bg-neon-purple/20 px-4 py-2 text-sm font-medium text-neon-purple">
              {event?.venue || "Lugar por confirmar"}
            </span>
            <span className="rounded-lg border border-neon-blue/30 bg-background/70 px-4 py-2 text-sm font-semibold text-neon-blue backdrop-blur-sm">
              {formatEventDate(event?.startDate)}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
            {event?.title}
          </h1>

          {event?.description ? (
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
              {event.description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
