import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../landingPage/components/Header";
import Footer from "../landingPage/components/Footer";
import { getEventById } from "../../services/event.service";
import EventDetailHero from "./components/EventDetailHero";
import EventInfoItem from "./components/EventInfoItem";
import EventPurchasePanel from "./components/EventPurchasePanel";

function formatDateTime(date) {
  if (!date) return "Por confirmar";

  return new Date(date).toLocaleString("es-SV", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function EventDetailPage() {
  const { eventId } = useParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadEvent() {
      try {
        setLoading(true);
        setError("");
        const eventData = await getEventById(eventId);

        if (!cancelled) {
          setEvent(eventData);
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

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {loading ? (
        <main className="max-w-7xl mx-auto px-6 pt-36 pb-24">
          <div className="glass-card p-8 text-center">
            <p className="text-foreground/70">Cargando evento...</p>
          </div>
        </main>
      ) : error ? (
        <main className="max-w-7xl mx-auto px-6 pt-36 pb-24">
          <div className="glass-card p-8 text-center">
            <h1 className="text-2xl font-bold mb-3">
              No encontramos este evento
            </h1>
            <p className="text-foreground/60">{error}</p>
          </div>
        </main>
      ) : (
        <>
          <EventDetailHero event={event} />

          <main className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              <section className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    Información del evento
                  </h2>
                  <p className="text-foreground/60 leading-relaxed">
                    {event?.description ||
                      "Este evento aún no tiene una descripción detallada."}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <EventInfoItem
                    label="Inicio"
                    value={formatDateTime(event?.startDate)}
                  />
                  <EventInfoItem
                    label="Finalización"
                    value={formatDateTime(event?.endDate)}
                  />
                  <EventInfoItem
                    label="Lugar"
                    value={event?.venue || "Por confirmar"}
                  />
                  <EventInfoItem label="Boletos por persona">
                    {event?.maxTicketsPerUser
                      ? `${event.maxTicketsPerUser} máximo`
                      : "Sin límite configurado"}
                  </EventInfoItem>
                </div>
              </section>

              <EventPurchasePanel event={event} />
            </div>
          </main>
        </>
      )}

      <Footer />
    </div>
  );
}
