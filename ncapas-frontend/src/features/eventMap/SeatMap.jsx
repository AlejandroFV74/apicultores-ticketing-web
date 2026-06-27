import { useEffect, useMemo, useState } from "react";
import { useSeatSelection } from "../../hooks/useSeatSelection";
import Stage from "./components/Stage";
import SeatLegend from "./components/SeatLegend";
import PurchaseSummary from "./components/PurchaseSummary";
import SeatRow from "./components/SeatRow";
import { buildSeatsFromSeatingConfig } from "./data/buildSeatsFromSeatingConfig";
import { applyBookedStatusToSeats } from "./data/normalizeEventSeats";
import { getSeatsByEvent } from "../../services/seat.service";

import { useNavigate, useParams } from "react-router-dom";

const SESSION_KEY_TIMER_END_AT = "reservation_timer_end_at";
const DEFAULT_TIMEOUT_SECONDS = 15 * 60;

function formatMMSS(totalSeconds) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const mm = Math.floor(safe / 60);
  const ss = safe % 60;
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

const DEFAULT_SEATING_CONFIG = {
  vipSeats: 140,
  vipPrice: 150,
  generalSeats: 420,
  generalPrice: 75,
  maxTicketsPerUser: 4,
};

export function SeatMap({
  eventId,
  seatingConfig,
  onSelectionChange,
}) {
  const params = useParams();
  const navigate = useNavigate();
  const effectiveEventId = eventId ?? params?.eventId;

  

  const effectiveSeatingConfig =
    seatingConfig ?? DEFAULT_SEATING_CONFIG;

  const baseSeats = useMemo(
    () =>
      buildSeatsFromSeatingConfig(effectiveSeatingConfig || {}),
    [effectiveSeatingConfig]
  );
  console.log("baseSeats recalculado");

  const [initialSeats, setInitialSeats] = useState(baseSeats);

  // Reservation timer
  const [remainingSeconds, setRemainingSeconds] = useState(DEFAULT_TIMEOUT_SECONDS);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const rawEndAt = sessionStorage.getItem(SESSION_KEY_TIMER_END_AT);

    const endAtMs = rawEndAt
      ? Number(rawEndAt)
      : Date.now() + DEFAULT_TIMEOUT_SECONDS * 1000;

    if (!rawEndAt) {
      sessionStorage.setItem(
        SESSION_KEY_TIMER_END_AT,
        String(endAtMs)
      );
    }

    const tick = () => {
      const msLeft = endAtMs - Date.now();
      const secondsLeft = Math.ceil(msLeft / 1000);

      console.log({
        msLeft,
        secondsLeft,
        expired
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

  useEffect(() => {
    console.log("loadSeats ejecutado");
    let cancelled = false;

    async function loadSeats() {
      try {
        if (!effectiveEventId) {
          setInitialSeats(baseSeats);
          return;
        }

        const backendSeats = await getSeatsByEvent(effectiveEventId);
        const merged = applyBookedStatusToSeats(
          baseSeats,
          backendSeats
        );

        if (!cancelled) setInitialSeats(merged);
      } catch (e) {
        // fallback to generated seats if backend call fails
        if (!cancelled) setInitialSeats(baseSeats);
        console.error(e);
      }
    }

    loadSeats();

    return () => {
      cancelled = true;
    };
  }, [eventId, baseSeats]);

  const {
    seats,
    selectedSeats,
    handleSeatClick,
  } = useSeatSelection(initialSeats, onSelectionChange);

  const groupedByRow = seats.reduce(
    (acc, seat) => {
      if (!acc[seat.row]) {
        acc[seat.row] = [];
      }

      acc[seat.row].push(seat);

      return acc;
    },
    {}
  );

  return (
    <div className="grid lg:grid-cols-[320px_1fr] gap-8">
      <div className="hidden lg:block w-80 flex-shrink-0">
        <PurchaseSummary
          selectedSeats={selectedSeats}
          selectedTotalPrice={seats
            .filter((s) => selectedSeats.includes(s.id))
            .reduce((acc, s) => acc + Number(s?.price ?? 0), 0)}
          maxSeatsPerUser={effectiveSeatingConfig?.maxTicketsPerUser ?? null}
        />
      </div>

      <div className ="lg:hidden">
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
            <h3 className="text-xl font-bold">
              Asientos
            </h3>
          </div>

          <div
            className={
              expired
                ? "text-yellow-400 font-bold"
                : "text-foreground/60"
            }
          >
            {expired ? "El tiempo se acabó" : `Tiempo restante: ${formatMMSS(remainingSeconds)}`}
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
