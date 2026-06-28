import { useEffect, useState } from "react";
import { useSeatSelection } from "../../hooks/useSeatSelection";
import Stage from "./components/Stage";
import SeatLegend from "./components/SeatLegend";
import PurchaseSummary from "./components/PurchaseSummary";
import SeatRow from "./components/SeatRow";
import { getSeatsByEvent } from "../../services/seat.service";

import { useNavigate, useParams } from "react-router-dom";
import { getEventById } from "../../services/event.service";

const SESSION_KEY_TIMER_END_AT = "reservation_timer_end_at";
const DEFAULT_TIMEOUT_SECONDS = 15 * 60;

function formatMMSS(totalSeconds) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const mm = Math.floor(safe / 60);
  const ss = safe % 60;
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

export function SeatMap({ eventId, seatingConfig, onSelectionChange }) {
  const params = useParams();
  const navigate = useNavigate();
  const effectiveEventId = eventId ?? params?.eventId;
  const SEATS_PER_ROW = 28;
  const [initialSeats, setInitialSeats] = useState([]);

  const normalizeBackendSeat = (seat, index) => {
    const status = seat.status === "AVAILABLE" ? "available" : "booked";

    return {
      id: seat.id,
      row: String.fromCharCode(65 + Math.floor(index / SEATS_PER_ROW)),
      number: (index % SEATS_PER_ROW) + 1,
      tier: seat.seatType === "VIP" ? "vip" : "general",
      price: Number(seat.price),
      status,
    };
  };

  // Reservation timer
  const [remainingSeconds, setRemainingSeconds] = useState(
    DEFAULT_TIMEOUT_SECONDS,
  );
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const rawEndAt = sessionStorage.getItem(SESSION_KEY_TIMER_END_AT);

    const endAtMs = rawEndAt
      ? Number(rawEndAt)
      : Date.now() + DEFAULT_TIMEOUT_SECONDS * 1000;

    if (!rawEndAt) {
      sessionStorage.setItem(SESSION_KEY_TIMER_END_AT, String(endAtMs));
    }

    const tick = () => {
      const msLeft = endAtMs - Date.now();
      const secondsLeft = Math.ceil(msLeft / 1000);

      console.log({
        msLeft,
        secondsLeft,
        expired,
      });

      if (secondsLeft <= 0) {
        console.log("ENTRÓ AL IF");
        setRemainingSeconds(0);
        setExpired(true);
        sessionStorage.removeItem(SESSION_KEY_TIMER_END_AT);
        navigate("/", { replace: true });
        console.log("DESPUÉS DEL NAVIGATE");
        return;
      }

      setRemainingSeconds(secondsLeft);
    };

    tick();
    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const { seats, selectedSeats, handleSeatClick } = useSeatSelection(
    initialSeats,
    onSelectionChange,
  );

  console.log("initialSeats:", initialSeats.length);
console.log("seats:", seats.length);

  useEffect(() => {
    let cancelled = false;

    async function loadSeats() {
      try {
        if (!effectiveEventId) {
          console.warn("SeatMap: missing effectiveEventId", {
            eventId,
            paramsEventId: params?.eventId,
          });
          return;
        }

        const backendSeats = await getSeatsByEvent(effectiveEventId);
        console.log("Respuesta:", backendSeats);
        console.log("Es arreglo:", Array.isArray(backendSeats));
        console.log("Cantidad:", backendSeats?.length);

        if (!cancelled) {
          console.log("backendSeats", backendSeats);
          setInitialSeats(
            backendSeats.map((seat, index) =>
              normalizeBackendSeat(seat, index),
            ),
          );
        }
      } catch (e) {
        console.error("SeatMap: loadSeats error", e);
      }
    }

    loadSeats();

    return () => {
      cancelled = true;
    };
  }, [effectiveEventId]);

  const groupedByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }

    acc[seat.row].push(seat);

    return acc;
  }, {});

  const [event, setEvent] = useState(null);

  useEffect(() => {
  let cancelled = false;

  async function loadEvent() {
    try {
      if (!effectiveEventId) return;

      const event = await getEventById(effectiveEventId);

      if (!cancelled) {
        setEvent(event);
      }
    } catch (e) {
      console.error("SeatMap: loadEvent error", e);
    }
  }

  loadEvent();

  return () => {
    cancelled = true;
  };
}, [effectiveEventId]);

  return (
    <div className="grid lg:grid-cols-[320px_1fr] gap-8">
      <div className="hidden lg:block w-80 flex-shrink-0">
        <PurchaseSummary
          selectedSeats={selectedSeats}
          selectedTotalPrice={seats
            .filter((s) => selectedSeats.includes(s.id))
            .reduce((acc, s) => acc + Number(s?.price ?? 0), 0)}
          maxSeatsPerUser={event?.maxTicketsPerUser ?? null}
        />
      </div>

      <div className="lg:hidden">
        <PurchaseSummary
          selectedSeats={selectedSeats}
          selectedTotalPrice={seats
            .filter((s) => selectedSeats.includes(s.id))
            .reduce((acc, s) => acc + Number(s?.price ?? 0), 0)}
          mobile
        />
      </div>

      <div className="space-y-12">
        <Stage />

        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold">Asientos</h3>
          </div>

          <div
            className={
              expired ? "text-yellow-400 font-bold" : "text-foreground/60"
            }
          >
            {expired
              ? "El tiempo se acabó"
              : `Tiempo restante: ${formatMMSS(remainingSeconds)}`}
          </div>
        </div>

        <div className="space-y-3 pl-4">
          {Object.entries(groupedByRow)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([row, rowSeats]) => (
              <SeatRow
                key={row}
                row={row}
                seats={rowSeats}
                onSeatClick={handleSeatClick}
              />
            ))}
        </div>

        <SeatLegend />
      </div>
    </div>
  );
}
