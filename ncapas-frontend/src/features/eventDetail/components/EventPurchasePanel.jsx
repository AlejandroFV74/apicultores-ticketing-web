import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../../services/auth.service";

const RESERVATION_TIMEOUT_SECONDS = 15 * 60;
const SESSION_KEY_TIMER_END_AT = "reservation_timer_end_at";

export default function EventPurchasePanel({ event }) {
  const navigate = useNavigate();
  const eventId = event?.id ?? event?.eventId;

  const handleBuyNow = () => {
    if (!isAuthenticated()) {
      navigate("/login", {
        state: {
          redirectTo: `/eventmap/${eventId}`,
        },
      });
      return;
    }

    const endAt = Date.now() + RESERVATION_TIMEOUT_SECONDS * 1000;
    sessionStorage.setItem(SESSION_KEY_TIMER_END_AT, String(endAt));
    navigate(`/eventmap/${eventId}`);
  };

  return (
    <aside className="glass-card p-6 lg:sticky lg:top-28">
      <p className="text-sm uppercase tracking-[0.2em] text-neon-blue mb-3">
        Entrada al evento
      </p>

      <h2 className="text-2xl font-bold mb-3">
        {event?.title}
      </h2>

      <p className="text-foreground/60 mb-6">
        Selecciona tus asientos y completa tu compra de forma segura.
      </p>

      {event?.maxTicketsPerUser ? (
        <div className="mb-6 rounded-lg border border-neon-purple/40 bg-neon-purple/10 p-4">
          <p className="text-sm text-foreground/60">
            Límite por usuario
          </p>
          <p className="text-lg font-semibold text-neon-purple">
            {event.maxTicketsPerUser} boleto(s)
          </p>
        </div>
      ) : null}

      <button
        type="button"
        onClick={handleBuyNow}
        className="
          w-full
          bg-gradient-to-r
          from-neon-blue
          to-neon-purple
          text-white
          font-semibold
          py-3
          rounded-lg
          transition-all
          duration-300
          hover:shadow-lg
          hover:shadow-neon-blue/50
          active:scale-95
        "
      >
        Comprar ahora
      </button>
    </aside>
  );
}
