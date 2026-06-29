import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../landingPage/components/Header";
import { getEventById } from "../../services/event.service";
import {
  confirmCheckout,
  createPayment,
  redirectToStripeCheckout,
  createStripeSession,
} from "../../services/payment.service";
import { deleteReservation } from "../../services/reservation.service";
import {
  clearReservationFlowState,
  getReservationFlowState,
  setReservationFlowState,
} from "./purchaseFlowState";

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

export default function PaymentSelectionPage() {
  const [reservation, setReservation] = useState(() =>
    getReservationFlowState(),
  );
  const navigate = useNavigate();
  const params = useParams();
  const eventIdFromRoute = params?.eventId;
  const reservationId = reservation?.id;

  //const [flowState, setFlowState] = useState(() => getReservationFlowState());

  //const reservation = flowState?.reservation;
  const reservation_id = reservation?.id;
  const expiresAt = reservation?.expiresAt ?? reservation?.expires_at;
  const eventId = reservation?.eventId;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const { remainingSeconds, expired } = useCountdown(expiresAt);

  useEffect(() => {
    const effectiveEventId = eventId ?? eventIdFromRoute;

    if (!effectiveEventId) {
      navigate("/", { replace: true });
      return;
    }

    async function load() {
      try {
        const ev = await getEventById(effectiveEventId);
        setEvent(ev);
      } catch (e) {
        setErrorMsg(e?.message || "Could not load payment details");
      }
    }

    load();
  }, [eventId, eventIdFromRoute, navigate]);

  useEffect(() => {
    if (!expired) return;

    async function cancelDueToExpiry() {
      try {
        if (!reservationId) {
          clearReservationFlowState();
          navigate("/", { replace: true });
          return;
        }
      } catch {
        // ignore
      } finally {
        clearReservationFlowState();
        setFlowState(null);
        navigate("/", { replace: true });
      }
    }

    cancelDueToExpiry();
  }, [expired, reservation_id, navigate]);

  const selectedSeatsDetailed = useMemo(() => {
    return (reservation?.seats ?? []).map((seat) => ({
      ...seat,
      // normalize naming differences
      seatNumber: seat.seatNumber,
      seatType: seat.seatType,
    }));
  }, [reservation]);

  const totalPrice = useMemo(() => {
    return selectedSeatsDetailed.reduce(
      (acc, s) => acc + Number(s?.price ?? 0),
      0,
    );
  }, [selectedSeatsDetailed]);

  const handleBasicPayment = async () => {
    console.log("Basic payment");
    if (!reservation_id) return;

    setErrorMsg(null);
    setLoading(true);
    try {
      console.log("Creating payment");
      const payment = await createPayment(reservationId, {
        paymentMethod: "BASIC",
      });
      console.log(payment);

      const paymentId =
        payment?.paymentId ?? payment?.id ?? payment?.payment?.id;

      if (!paymentId) throw new Error("Missing paymentId");

      await confirmCheckout(paymentId);
     
    } catch (e) {
      if (e?.message?.includes("ya fue completada")) {
        clearReservationFlowState();
        navigate("/mytickets");
        return;
      }

      setErrorMsg(e?.message || "Payment failed");
    }
  };

  const handleStripeCheckout = async () => {
    if (!reservation_id) return;

    setErrorMsg(null);
    setLoading(true);
    try {
      // Create payment with STRIPE method
      const payment = await createPayment(reservationId, {
        paymentMethod: "STRIPE",
      });
      const paymentId =
        payment?.paymentId ?? payment?.id ?? payment?.payment?.id;

      if (!paymentId) throw new Error("Missing paymentId");

      // Create Stripe checkout session (buyer only)
      const session = await createStripeSession(paymentId);
      
      // Get checkout URL from response
      const checkoutUrl = session?.data?.checkoutUrl;
      if (!checkoutUrl) throw new Error("Missing checkout URL");

      // Redirect to the Stripe URL returned in result.data.checkoutUrl
      redirectToStripeCheckout(checkoutUrl);
    } catch (e) {
      setErrorMsg(e?.message || "Stripe checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <Header />

      <div className="max-w-4xl mx-auto pt-16">
        <div className="mb-10">
          <h1 className="text-4xl font-black">Pago</h1>
          <p className="text-foreground/60 mt-2">
            Selecciona un método de pago.
          </p>
        </div>

        {errorMsg ? (
          <div className="mb-4 p-4 glass-card text-yellow-300 font-semibold">
            {errorMsg}
          </div>
        ) : null}

        <div className="glass-card p-6 mb-6">
          <div className="flex flex-col gap-2 mb-6">
            <div>
              <span className="text-foreground/60">Evento:</span>{" "}
              <span className="font-bold">
                {event?.title ?? event?.name ?? ""}
              </span>
            </div>

            <div>
              <span className="text-foreground/60">Tiempo restante:</span>{" "}
              <span className="font-bold">
                {expired ? "00:00" : formatMMSS(remainingSeconds)}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-lg">Total</div>
            <div className="font-bold text-xl">${totalPrice}</div>
          </div>

          <div className="text-foreground/60">
            Asientos seleccionados: {selectedSeatsDetailed.length}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            disabled={loading || expired}
            onClick={handleBasicPayment}
            className="
              glass-card
              p-5
              rounded-lg
              font-semibold
              bg-gradient-to-r
              from-neon-blue
              to-neon-purple
              text-white
              disabled:opacity-50
            "
          >
            Basic Payment
          </button>

          <button
            disabled={loading || expired}
            onClick={handleStripeCheckout}
            className="
              glass-card
              p-5
              rounded-lg
              font-semibold
              text-white
              bg-background/20
              border
              border-white/20
              disabled:opacity-50
            "
          >
            Stripe Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
