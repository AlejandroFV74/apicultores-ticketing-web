import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../landingPage/components/Header";
import Footer from "../landingPage/components/Footer";
import { useEvents } from "../../hooks/useEvents";
import { isAdmin } from "../../services/auth.service";
import EventCard from "./components/EventCard";
import SearchBar from "./components/SearchBar";

export default function OrganizerEventsPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  
  const admin = isAdmin();
  const { events, loading, error, removeEvent } = useEvents(admin);

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return events;
    return events.filter((event) => {
      const title = event.title?.toLowerCase() || "";
      const venue = event.venue?.toLowerCase() || "";
      return title.includes(normalizedQuery) || venue.includes(normalizedQuery);
    });
  }, [events, query]);

  const handleEdit = (event) => {
    const eventId = event.eventId ?? event.id;
    if (!eventId) return;
    navigate(`/organizer/events/${eventId}/edit`);
  };

  const handleDelete = (event) => {
    const eventId = event.eventId ?? event.id;
    if (!eventId) return;
    const confirmed = window.confirm(`¿Quieres eliminar el evento "${event.title}"?`);
    if (!confirmed) return;
    removeEvent(eventId);
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <section className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-neon-blue">
              {admin ? "Administrador" : "Organizador"}
            </p>
            <h1 className="mb-4 text-4xl font-black text-white md:text-5xl">
              {admin ? "Gestionar todos los eventos" : "Gestiona tus eventos"}
            </h1>
            <p className="text-foreground/60">
              {admin 
                ? "Administra todos los eventos de la plataforma." 
                : "Crea, publica y administra los eventos que aparecerán en la plataforma."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/organizer/events/create")}
            className="rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple px-5 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/50"
          >
            Crear evento
          </button>
        </section>

        <div className="mb-8 max-w-xl">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        {loading ? (
          <div className="glass-card p-8 text-center text-foreground/70">Cargando eventos...</div>
        ) : error ? (
          <div className="glass-card p-8 text-center text-destructive">{error}</div>
        ) : filteredEvents.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.eventId ?? event.id}
                event={event}
                showActions
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="glass-card p-8 text-center">
            <h2 className="mb-2 text-2xl font-bold">No hay eventos para mostrar</h2>
            <p className="text-foreground/60">
              {admin ? "No hay eventos en la plataforma." : "Crea tu primer evento o ajusta la búsqueda."}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}