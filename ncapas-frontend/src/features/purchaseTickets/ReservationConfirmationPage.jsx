import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../landingPage/components/Header";
import { getEventById } from "../../services/event.service";
import {
  clearReservationFlowState,
  getReservationFlowState,
  setReservationFlowState,
} from "./purchaseFlowState";
import { deleteReservation } from "../../services/reservation.service";

const reservation = getReservationFlowState();

const reservationId = reservation?.id;

const expiresAt = reservation?.expiresAt;

const eventId = reservation?.eventId;

const seats = reservation?.seats ?? [];

function formatMMSS(totalSeconds) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const mm = Math.floor(safe / 60);
  const ss = safe % 60;
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

function useCountdown(expiresAt) {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!expiresAt) return;

    const endMs = new Date(expiresAt).getTime();
    if (!Number.isFinite(endMs)) return;

    const tick = () => {
      const msLeft = endMs - Date.now();
      const secondsLeft = Math.ceil(msLeft / 1000);
      if (secondsLeft <= 0) {
        setRemainingSeconds(0);
        setExpired(true);
        return;
      }
      setExpired(false);
      setRemainingSeconds(secondsLeft);
    };

    tick();
    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, [expiresAt]);

  return { remainingSeconds, expired };
}

export default function ReservationConfirmationPage() {
  const navigate = useNavigate();

  const [reservation, setReservation] = useState(() =>
    getReservationFlowState(),
  );

  const reservationId = reservation?.id;
  const expiresAt = reservation?.expiresAt;
  const eventId = reservation?.eventId;
  const seats = reservation?.seats ?? [];
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const { remainingSeconds, expired } = useCountdown(expiresAt);

  useEffect(() => {
    if (!expired) return;

    async function cancelDueToExpiry() {
      if (!reservationId) {
        clearReservationFlowState();
        navigate("/", { replace: true });
        return;
      }

      try {
        await deleteReservation(reservationId);
      } catch {
        // Even if delete fails, clear local state and redirect
      } finally {
        clearReservationFlowState();
        setReservation(null);
        navigate("/", { replace: true });
      }
    }

    cancelDueToExpiry();
  }, [expired, reservationId, navigate]);

  useEffect(() => {
    if (!eventId) return;

    async function loadEvent() {
      try {
        const data = await getEventById(eventId);
        setEvent(data);
      } catch (e) {
        console.error(e);
      }
    }

    loadEvent();
  }, [eventId]);

  const selectedSeatsDetailed = useMemo(() => {
    return seats;
  }, [seats]);

  const totalPrice = useMemo(() => {
    return selectedSeatsDetailed.reduce(
      (acc, s) => acc + Number(s?.price ?? 0),
      0,
    );
  }, [selectedSeatsDetailed]);

  const handleChooseDifferentSeats = async () => {
    setErrorMsg(null);

    if (!reservationId) {
      clearReservationFlowState();
      navigate(`/eventmap/${eventId}`, { replace: true });
      return;
    }

    setLoading(true);

    try {
      await deleteReservation(reservationId);

      clearReservationFlowState();
      setReservation(null);

      navigate(`/eventmap/${eventId}`, {
        replace: true,
      });
    } catch (e) {
      setErrorMsg(e?.message || "Could not cancel reservation");
    } finally {
      setLoading(false);
    }
  };

  const handleContinueToPayment = () => {
    if (!reservation) {
      navigate("/", { replace: true });
      return;
    }

    setReservationFlowState(reservation);

    navigate(`/payment/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <Header />

      <div className="max-w-4xl mx-auto pt-16">
        <div className="mb-10">
          <h1 className="text-4xl font-black">Confirmación de Reserva</h1>
          <p className="text-foreground/60 mt-2">
            Los asientos han sido reservados temporalmente.
          </p>
        </div>

        {errorMsg ? (
          <div className="mb-4 p-4 glass-card text-yellow-300 font-semibold">
            {errorMsg}
          </div>
        ) : null}

        <div className="glass-card p-6">
          <div className="flex flex-col gap-2 mb-6">
            <div>
              <span className="text-foreground/60">Evento:</span>{" "}
              <span className="font-bold">{event?.title}</span>
            </div>
            <div>
              <span className="text-foreground/60">Expires at:</span>{" "}
              <span className="font-bold">
                {expiresAt ? new Date(expiresAt).toLocaleString() : ""}
              </span>
            </div>

            <div>
              <span className="text-foreground/60">Tiempo restante:</span>{" "}
              <span className="font-bold">
                {expired ? "00:00" : formatMMSS(remainingSeconds)}
              </span>
            </div>
          </div>

          <div className="mb-4 flex justify-between items-center">
            <div className="font-bold text-lg">Asientos</div>
            <div className="text-neon-blue font-bold">
              {(reservation?.seats ?? []).length} asiento(s)
            </div>
          </div>

          <div className="space-y-2 mb-6">
            {selectedSeatsDetailed.length ? (
              selectedSeatsDetailed.map((seat) => (
                <div
                  key={seat.id}
                  className="flex justify-between glass-card p-3"
                >
                  <span>
                    Asiento {seat?.row ?? ""}
                    {seat?.seatNumber ?? ""}
                  </span>
                  <span className="font-bold">${Number(seat?.price ?? 0)}</span>
                </div>
              ))
            ) : (
              <div className="text-foreground/60">No seats selected.</div>
            )}
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="text-foreground/60">Total</span>
            <span className="font-bold text-xl">${totalPrice}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              disabled={loading}
              onClick={handleChooseDifferentSeats}
              className="
                py-3
                rounded-lg
                glass-card
                font-semibold
              "
            >
              {loading ? "Cancelando..." : "Choose Different Seats"}
            </button>

            <button
              disabled={loading}
              onClick={handleContinueToPayment}
              className="
                py-3
                rounded-lg
                bg-gradient-to-r
                from-neon-blue
                to-neon-purple
                text-white
                font-semibold
              "
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
