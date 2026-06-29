import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../landingPage/components/Header";
import Footer from "../landingPage/components/Footer";
import EventForm from "./components/EventForm";
import { getEventById, updateEvent } from "../../services/event.service";

export default function EditEventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadEvent() {
      try {
        setLoading(true);
        setError("");
        const data = await getEventById(eventId);

        if (!cancelled) {
          setEvent(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "No se pudo cargar el evento.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadEvent();

    return () => {
      cancelled = true;
    };
  }, [eventId]);

  const handleUpdate = async (data) => {
    try {
      setIsSubmitting(true);
      setError("");
      await updateEvent(eventId, data);
      navigate("/organizer");
    } catch (err) {
      setError(err.message || "No se pudo actualizar el evento.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-neon-blue">
              Organizador
            </p>
            <h1 className="text-4xl font-black text-white">
              Modificar evento
            </h1>
          </div>

          <button
            type="button"
            onClick={() => navigate("/organizer")}
            className="rounded-lg border border-neon-blue/40 px-4 py-2 font-semibold text-neon-blue transition-colors hover:bg-neon-blue/10"
          >
            Volver al panel
          </button>
        </div>

        {loading ? (
          <div className="glass-card mx-auto max-w-3xl p-8 text-center text-foreground/70">
            Cargando evento...
          </div>
        ) : error ? (
          <div className="glass-card mx-auto max-w-3xl p-8 text-center text-destructive">
            {error}
          </div>
        ) : (
          <EventForm
            initialData={event}
            onSubmit={handleUpdate}
            submitLabel="Guardar cambios"
            isEditMode
            isSubmitting={isSubmitting}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
