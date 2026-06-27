import { useEffect, useMemo, useState } from "react";
import { useSeatSelection } from "../../hooks/useSeatSelection";
import Stage from "./components/Stage";
import SeatLegend from "./components/SeatLegend";
import PurchaseSummary from "./components/PurchaseSummary";
import SeatRow from "./components/SeatRow";
import { buildSeatsFromSeatingConfig } from "./data/buildSeatsFromSeatingConfig";
import { applyBookedStatusToSeats } from "./data/normalizeEventSeats";
import { getSeatsByEvent } from "../../services/seat.service";

import { useParams } from "react-router-dom";

export function SeatMap({
  eventId,
  seatingConfig,
  onSelectionChange,
}) {
  const params = useParams();
  const effectiveEventId = eventId ?? params?.eventId;
  
  const effectiveSeatingConfig =
    seatingConfig || {
      vipSeats: 140,
      vipPrice: 150,
      generalSeats: 420,
      generalPrice: 75,
    };
  const baseSeats = useMemo(
    () =>
      buildSeatsFromSeatingConfig(effectiveSeatingConfig || {}),
    [effectiveSeatingConfig]
  );

  const [initialSeats, setInitialSeats] = useState(baseSeats);

  useEffect(() => {
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
      />
      </div>

      <div className ="lg:hidden">
            <PurchaseSummary
                selectedSeats={selectedSeats}
                mobile
            />
      </div>

      <div className="space-y-12">
        <Stage />

        <div>
          <h3 className="text-xl font-bold mb-1">
            Asientos
          </h3>

          <p className="text-sm text-foreground/60">
            {
              seats.filter(
                (seat) =>
                  seat.status === "available"
              ).length
            }{" "}
            disponibles
          </p>
        </div>

        <div className="space-y-3 pl-4">
          {Object.entries(groupedByRow)
            .sort(([a], [b]) =>
              a.localeCompare(b)
            )
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