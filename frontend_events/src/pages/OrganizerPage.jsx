import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMyEvents } from "../hooks/useMyEvents";
import EventCard from "../components/EventCard";

function OrganizerPage() {
  const { events, loading, error, removeEvent } = useMyEvents();
  const navigate = useNavigate();
  const [pendingDelete, setPendingDelete] = useState(null);

  const handleDelete = async () => {
    if (!pendingDelete) return;
    try {
      await removeEvent(pendingDelete.eventId);
      toast.success("Evento eliminado");
    } catch (err) {
      toast.error(err.message || "No se pudo eliminar el evento");
    } finally {
      setPendingDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-paper px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-ink">
              Mis eventos
            </h1>
            <p className="text-ink-soft text-sm mt-1">Gestiona los eventos que has creado.</p>
          </div>

          <button
            onClick={() => navigate("/organizer/create")}
            className="bg-stub hover:bg-stub-dark text-white px-5 py-2.5 rounded font-display font-semibold uppercase tracking-wide text-sm transition-colors"
          >
            + Crear evento
          </button>
        </div>

        {loading && <p className="text-center text-ink-soft">Cargando tus eventos...</p>}

        {error && (
          <p className="text-center text-stamp-red font-medium">
            No se pudo cargar la información. Intenta nuevamente más tarde.
          </p>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="text-center py-16">
            <p className="text-ink-soft mb-4">Todavía no has creado ningún evento.</p>
            <button
              onClick={() => navigate("/organizer/create")}
              className="bg-stub hover:bg-stub-dark text-white px-5 py-2.5 rounded font-semibold uppercase text-sm tracking-wide transition-colors"
            >
              Crear mi primer evento
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.eventId}
              event={event}
              showActions
              onEdit={(e) => navigate(`/organizer/edit/${e.eventId}`)}
              onDelete={(e) => setPendingDelete(e)}
            />
          ))}
        </div>
      </div>

      {pendingDelete && (
        <div className="fixed inset-0 bg-ink/50 flex items-center justify-center px-6 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg">
            <h2 className="font-display font-semibold text-lg text-ink mb-2">¿Eliminar evento?</h2>
            <p className="text-sm text-ink-soft mb-6">
              Esta acción eliminará <span className="font-semibold">{pendingDelete.title}</span> de
              forma permanente.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setPendingDelete(null)}
                className="flex-1 border border-ink/20 text-ink-soft py-2 rounded hover:bg-ink/5 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-stamp-red hover:bg-stamp-red/90 text-white py-2 rounded font-semibold transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrganizerPage;
