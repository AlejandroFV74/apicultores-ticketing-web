import PurchasedEventCard from "./components/PurchasedEventCard";
import EmptyEventsState from "./components/EmptyEventsState";
import QRModal from "./components/QRModal";
import { useState } from "react";

const purchasedEvents = [
  {
    id: 1,
    title: "Electric Dreams Festival",
    category: "Music Festival",
    date: "15 Junio 2026",
    location: "San Salvador",
    tickets: 3,
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=600&fit=crop",
      qrValue: "https://www.apicultores.com/tickets/1",
  },
  {
    id: 2,
    title: "Neon Nights Concert",
    category: "Live Concert",
    date: "22 Junio 2026",
    location: "Santa Ana",
    tickets: 2,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=600&fit=crop",
    qrValue: "https://www.apicultores.com/tickets/2",
  },
];

export default function MyTicketsPage() {
      
  const [showQR, setShowQR] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
    const handleViewQR = (event) => {
    setSelectedEvent(event);
    setShowQR(true);
    };

    const handleCloseQR = () => {
        setShowQR(false);
        setSelectedEvent(null)
    }

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-black">
            Mis Entradas
          </h1>

          <p className="text-foreground/60 mt-2">
            Consulta todos los eventos para los
            que has comprado entradas.
          </p>
        </div>

        {purchasedEvents.length === 0 ? (
          <EmptyEventsState />
        ) : (
          <div className="space-y-6">
            {purchasedEvents.map((event) => (
              <PurchasedEventCard
                key={event.id}
                event={event}
                onViewQR={handleViewQR}
              />
            ))}
          </div>
        )}
        <QRModal
            isOpen={showQR}
            onClose={handleCloseQR}
            event={selectedEvent}
        ></QRModal>
      </div>
    </div>
  );
}