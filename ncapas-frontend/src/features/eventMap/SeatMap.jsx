import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Stage from "./components/Stage";
import SeatLegend from "./components/SeatLegend";
import PurchaseSummary from "./components/PurchaseSummary";
import SeatRow from "./components/SeatRow";
import { getSeatsByEvent } from "../../services/seat.service";
import { getEventById } from "../../services/event.service";
import { useSeatSelection } from "../../hooks/useSeatSelection";
import { createReservation } from "../../services/reservation.service";
import {
  clearReservationFlowState,
  setReservationFlowState,
} from "../purchaseTickets/purchaseFlowState";
import NoSeatsAvailable from "./components/NoSeatsAvailable";

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



  const { seats, selectedSeats, handleSeatClick } = useSeatSelection(
    initialSeats,
    onSelectionChange,
  );

  const selectedTotalPrice = useMemo(() => {
    return seats
      .filter((s) => selectedSeats.includes(s.id))
      .reduce((acc, s) => acc + Number(s?.price ?? 0), 0);
  }, [seats, selectedSeats]);

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

        if (!cancelled) {
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
  const [submitting, setSubmitting] = useState(false);

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

  const maxSeatsPerUser = event?.maxTicketsPerUser ?? null;

  const selectedCount = selectedSeats.length;

  const canContinue =
    selectedCount > 0 &&
    (maxSeatsPerUser == null ||
      Number.isFinite(Number(maxSeatsPerUser))
      ? selectedCount <= Number(maxSeatsPerUser)
      : true);

  const handleContinue = async () => {
    if (!effectiveEventId) return;
    if (submitting) return;

    if (!selectedSeats?.length) {
      alert("Select at least one seat.");
      return;
    }

    if (
      maxSeatsPerUser != null &&
      Number.isFinite(Number(maxSeatsPerUser)) &&
      selectedSeats.length > Number(maxSeatsPerUser)
    ) {
      alert("You have selected more seats than allowed.");
      return;
    }

    setSubmitting(true);
    try {
      const reservation = await createReservation({
        eventId: effectiveEventId,
        seatsIds: selectedSeats,
      });

      // expected: { reservationId, expiresAt, seatsIds? }
      const reservationId =
        reservation?.reservationId ??
        reservation?.id ??
        reservation?.reservation?.id;
      const expiresAt =
        reservation?.expiresAt ?? reservation?.expires_at;

        console.log(reservation);

      setReservationFlowState(reservation);

      navigate(`/reservation/confirmation/${effectiveEventId}`);
    } catch (e) {
      console.error(e);
      alert(e?.message || "Could not create reservation");
    } finally {
      setSubmitting(false);
    }
  };

  const availableSeats = useMemo(() => {
  return seats.filter((seat) => seat.status === "available");
  }, [seats]);

  const noSeatsAvailable = seats.length > 0 && availableSeats.length === 0;

  return (
    <div className="grid lg:grid-cols-[320px_1fr] gap-8">
      <div className="hidden lg:block w-80 flex-shrink-0">
        <div className="glass-card p-6 sticky top-24">
          <PurchaseSummary
            selectedSeats={selectedSeats}
            selectedTotalPrice={selectedTotalPrice}
            maxSeatsPerUser={maxSeatsPerUser}
          />
          <button
            disabled={!canContinue || submitting}
            onClick={handleContinue}
            className="
              mt-4
              w-full
              py-3
              rounded-lg
              bg-gradient-to-r
              from-neon-blue
              to-neon-purple
              text-white
              font-semibold
              disabled:opacity-50
            "
          >
            {submitting ? "Creating..." : "Continue"}
          </button>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="relative">
          <PurchaseSummary
            selectedSeats={selectedSeats}
            selectedTotalPrice={selectedTotalPrice}
            mobile
            maxSeatsPerUser={maxSeatsPerUser}
          />
          <button
            disabled={!canContinue || submitting}
            onClick={handleContinue}
            className="
              fixed
              bottom-4
              right-4
              left-4
              z-50
              mt-20
              py-3
              rounded-lg
              bg-gradient-to-r
              from-neon-blue
              to-neon-purple
              text-white
              font-semibold
              disabled:opacity-50
            "
          >
            {submitting ? "Creating..." : "Continue to Reservation"}
          </button>
        </div>
      </div>

      <div className="space-y-12">
        <NoSeatsAvailable></NoSeatsAvailable>
        <Stage />

        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold">Asientos</h3>
          </div>

          <div className="text-foreground/60">
            {maxSeatsPerUser != null && Number.isFinite(Number(maxSeatsPerUser))
              ? `${selectedCount} / ${Number(maxSeatsPerUser)} selected`
              : `${selectedCount} selected`}
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
