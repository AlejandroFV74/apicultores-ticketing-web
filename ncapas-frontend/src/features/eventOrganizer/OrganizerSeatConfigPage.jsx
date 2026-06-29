import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../landingPage/components/Header";
import Footer from "../landingPage/components/Footer";
import { getSeatsByEvent, updateSeat } from "../../services/seat.service";
import { getEventById } from "../../services/event.service";
import { isOrganizer } from "../../services/auth.service";

export default function OrganizerSeatConfigPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  // Group seats by type for configuration
  const seatsByType = seats.reduce((acc, seat) => {
    const type = seat.seatType || seat.tier?.toUpperCase();
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(seat);
    return acc;
  }, {});

  // Calculate statistics
  const stats = {
    total: seats.length,
    available: seats.filter(s => s.status === "AVAILABLE").length,
    reserved: seats.filter(s => s.status === "RESERVED").length,
    sold: seats.filter(s => s.status === "SOLD").length,
  };

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

  const updateSeatPrice = async (seatId, newPrice) => {
    setUpdating(true);
    try {
      await updateSeat(seatId, { price: newPrice });
      // Refresh seats
      const seatsData = await getSeatsByEvent(eventId);
      setSeats(seatsData);
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const formatStatus = (status) => {
    const map = {
      AVAILABLE: { label: "Disponible", color: "text-green-400" },
      RESERVED: { label: "Reservado", color: "text-yellow-400" },
      SOLD: { label: "Vendido", color: "text-red-400" },
    };
    return map[status] || { label: status, color: "text-gray-400" };
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <section className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-neon-blue">
              Organizador
            </p>
            <h1 className="mb-4 text-4xl font-black text-white md:text-5xl">
              Configurar Asientos
            </h1>
            <p className="text-foreground/60">
              {event?.title || "Cargando evento..."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/organizer/events")}
            className="rounded-lg border border-neon-blue/40 px-4 py-2 font-semibold text-neon-blue transition-colors hover:bg-neon-blue/10"
          >
            Volver a eventos
          </button>
        </section>

        {/* Statistics */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-foreground/60">Total</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{stats.available}</p>
            <p className="text-sm text-foreground/60">Disponibles</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">{stats.reserved}</p>
            <p className="text-sm text-foreground/60">Reservados</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-red-400">{stats.sold}</p>
            <p className="text-sm text-foreground/60">Vendidos</p>
          </div>
        </div>

        {loading ? (
          <div className="glass-card p-8 text-center text-foreground/70">
            Cargando asientos...
          </div>
        ) : error ? (
          <div className="glass-card p-8 text-center text-destructive">
            {error}
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(seatsByType).map(([type, typeSeats]) => (
              <div key={type} className="glass-card p-6">
                <h2 className="text-xl font-bold mb-4">{type}</h2>
                <p className="text-sm text-foreground/60 mb-4">
                  {typeSeats.length} asientos | Precio: ${typeSeats[0]?.price}
                </p>
                <div className="grid grid-cols-8 gap-2">
                  {typeSeats.map((seat) => {
                    const statusInfo = formatStatus(seat.status);
                    return (
                      <div
                        key={seat.id}
                        className={`p-2 text-xs text-center rounded ${
                          seat.status === "AVAILABLE"
                            ? "bg-green-500/20 border border-green-500/40"
                            : seat.status === "RESERVED"
                            ? "bg-yellow-500/20 border border-yellow-500/40"
                            : "bg-red-500/20 border border-red-500/40"
                        }`}
                      >
                        <p className="font-semibold">{seat.seatNumber}</p>
                        <p className={statusInfo.color}>{statusInfo.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
