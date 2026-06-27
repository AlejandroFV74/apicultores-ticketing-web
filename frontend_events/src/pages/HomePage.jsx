import { useState } from "react";
import { useEvents } from "../hooks/useEvent";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";

function HomePage() {
  const { events, loading, error, reload } = useEvents();
  const [searching, setSearching] = useState(false);

  const handleSearch = (title) => {
    setSearching(true);
    reload(title);
  };

  const handleClear = () => {
    setSearching(false);
    reload();
  };

  return (
    <div className="min-h-screen bg-paper px-6 py-10">
      <div className="text-center mb-8">
        <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-ink mb-2">
          Próximos eventos
        </h1>
        <p className="text-ink-soft">Encuentra tu próxima experiencia y consigue tu boleto.</p>
      </div>

      <SearchBar onSearch={handleSearch} onClear={handleClear} />

      {loading && <p className="text-center text-ink-soft">Cargando eventos...</p>}

      {error && (
        <p className="text-center text-stamp-red font-medium">
          No se pudo cargar la información. Intenta nuevamente más tarde.
        </p>
      )}

      {!loading && !error && events.length === 0 && (
        <p className="text-center text-ink-soft">
          {searching ? "No hay eventos que coincidan con tu búsqueda." : "Todavía no hay eventos publicados."}
        </p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {events.map((event) => (
          <EventCard key={event.eventId} event={event} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
