import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../landingPage/components/Header";
import Footer from "../landingPage/components/Footer";
import EventForm from "./components/EventForm";
import { createEvent } from "../../services/event.service";
import { createDiscount } from "../../services/discount.service";

export default function CreateEventPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async (data) => {

  try {
    setIsSubmitting(true);
    setError("");

    const eventResponse = await createEvent(data);

    const eventId =
      eventResponse?.data?.eventId || eventResponse?.eventId;

    console.log("EVENT ID:", eventId);

    if (data.discounts && data.discounts.length > 0) {
      console.log("DISCOUNTS:", data.discounts);

      for (const discount of data.discounts) {
        await createDiscount({
          ...discount,
          eventId,
        });
      }
    }

      navigate("/organizer");
    } catch (err) {
      setError(err.message || "No se pudo crear el evento.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-neon-blue">
              Organizador
            </p>
            <h1 className="text-4xl font-black text-white">
              Crear evento
            </h1>
          </div>

          <button
            type="button"
            onClick={() => navigate("/organizer")}
            className="rounded-lg border border-neon-blue/40 px-4 py-2 font-semibold text-neon-blue transition-colors hover:bg-neon-blue/10"
          >
            Volver al panel
          </button>
        </div>

        {error ? (
          <div className="mx-auto mb-6 max-w-3xl rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-destructive">
            {error}
          </div>
        ) : null}

        <EventForm
          onSubmit={handleCreate}
          submitLabel="Crear evento"
          isSubmitting={isSubmitting}
        />
      </main>

      <Footer />
    </div>
  );
}
