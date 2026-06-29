import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../landingPage/components/Header";
import Footer from "../landingPage/components/Footer";
import { getSeatsByEvent } from "../../services/seat.service";
import { getEventById } from "../../services/event.service";
import { isOrganizer } from "../../services/auth.service";

export default function OrganizerReportsPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOrganizer()) {
      navigate("/");
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        const [eventData, seatsData] = await Promise.all([
          getEventById(eventId),
          getSeatsByEvent(eventId),
        ]);
        setEvent(eventData);
        setSeats(seatsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      loadData();
    }
  }, [eventId, navigate]);

  const soldSeats = seats.filter(s => s.status === "SOLD");
  const totalRevenue = soldSeats.reduce((sum, seat) => sum + (Number(seat.price) || 0), 0);
  const stats = {
    totalSeats: seats.length,
    available: seats.filter(s => s.status === "AVAILABLE").length,
    reserved: seats.filter(s => s.status === "RESERVED").length,
    sold: soldSeats.length,
    occupancy: seats.length > 0 ? Math.round((soldSeats.length / seats.length) * 100) : 0,
    totalRevenue,
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString("es-SV", {
      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <section className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-neon-blue">Organizador</p>
            <h1 className="mb-4 text-4xl font-black text-white md:text-5xl">Reportes</h1>
            <p className="text-foreground/60">{event?.title || "Cargando evento..."}</p>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => navigate(`/organizer/events/${eventId}/seats`)} className="rounded-lg border border-neon-blue/40 px-4 py-2 font-semibold text-neon-blue">Ver Asientos</button>
            <button type="button" onClick={() => navigate("/organizer/events")} className="rounded-lg border border-neon-blue/40 px-4 py-2 font-semibold text-neon-blue">Volver</button>
          </div>
        </section>
        {event && (
          <div className="glass-card p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div><p className="text-sm text-foreground/60">Fecha inicio</p><p className="font-semibold">{formatDate(event.startDate)}</p></div>
              <div><p className="text-sm text-foreground/60">Fecha fin</p><p className="font-semibold">{formatDate(event.endDate)}</p></div>
              <div><p className="text-sm text-foreground/60">Lugar</p><p className="font-semibold">{event.venue}</p></div>
              <div><p className="text-sm text-foreground/60">Estado</p><p className="font-semibold">{event.status}</p></div>
            </div>
          </div>
        )}
        {loading ? (
          <div className="glass-card p-8 text-center text-foreground/70">Cargando reportes...</div>
        ) : error ? (
          <div className="glass-card p-8 text-center text-destructive">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="glass-card p-6 text-center"><p className="text-3xl font-bold text-neon-green">${stats.totalRevenue}</p><p className="text-sm text-foreground/60">Ingreso Total</p></div>
              <div className="glass-card p-6 text-center"><p className="text-3xl font-bold">{stats.occupancy}%</p><p className="text-sm text-foreground/60">Ocupación</p></div>
              <div className="glass-card p-6 text-center"><p className="text-3xl font-bold text-red-400">{stats.sold}</p><p className="text-sm text-foreground/60">Vendidos</p></div>
              <div className="glass-card p-6 text-center"><p className="text-3xl font-bold">{stats.totalSeats}</p><p className="text-sm text-foreground/60">Total Asientos</p></div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
