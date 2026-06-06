import { EventCarousel } from "./carousel/event-carousel";


export default function EventsSection() {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Eventos Destacados
            </span>
          </h2>

          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Descubre los eventos más emocionantes del año.
            Reserva ahora y vive experiencias inolvidables.
          </p>
        </div>

        <div className="px-8">
          <EventCarousel />
        </div>
      </div>
    </section>
  );
}