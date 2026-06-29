import PurchasedEventCard from "./components/PurchasedEventCard";
import EmptyEventsState from "./components/EmptyEventsState";
import QRModal from "./components/QRModal";
import TransferTicketModal from "./components/TransferTicketModal";
import { useEffect, useState } from "react";
import { getUser } from "../../services/auth.service";
import { getMyTickets } from "../../services/ticket.service";
import Header from "../landingPage/components/Header";
import {useNavigate } from "react-router-dom";

export default function MyTicketsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [myEvents, setMyEvents] = useState([])
  const [loading, setLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const user = getUser();
  const navigate = useNavigate();

  const handleViewQR = (event) => {
    setSelectedEvent(event);
    setShowQR(true);
  };

  const handleCloseQR = () => {
    setShowQR(false);
    setSelectedEvent(null)
  }

  const handleTransfer = (ticket) => {
    setSelectedTicket(ticket);
    setShowTransferModal(true);
  };

  const handleCloseTransfer = () => {
    setShowTransferModal(false);
    setSelectedTicket(null);
  };

  const handleTransferSuccess = async () => {
    if (!user || !user.userId) return;

    try {
      const tickets = await getMyTickets(user.userId);
      setMyEvents(tickets);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if(!user || !user.userId){
      navigate("/login");
    }
  },[user,navigate])

  useEffect(() => {
    if (!user || !user.userId) return;

    const loadTickets = async () => {
      try {
        const tickets = await getMyTickets(user.userId);
        setMyEvents(tickets);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, [user?.userId]);

  return (
    
    <div className="min-h-screen bg-background py-12 px-6">
      <Header
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
      />
      <div className="max-w-6xl mx-auto pt-16">
        <div className="mb-10">
          <h1 className="text-4xl font-black">
            Mis Entradas
          </h1>

          <p className="text-foreground/60 mt-2">
            Consulta todos los eventos para los
            que has comprado entradas.
          </p>
        </div>

        {
          loading ? (
            <div className="flex justify-center items-center">
              <div className="loading loading-spinner"></div>
            </div>
          ) : null
        }
        {myEvents.length === 0 ? (
          <EmptyEventsState />
        ) : (
          <div className="space-y-6">
            {myEvents.map((event) => (
              <PurchasedEventCard
                key={event.ticketId}
                event={event}
                onViewQR={handleViewQR}
                onTransfer={handleTransfer}
              />
            ))}
          </div>
        )}
        <QRModal
          isOpen={showQR}
          onClose={handleCloseQR}
          event={selectedEvent}
        ></QRModal>
        <TransferTicketModal
          isOpen={showTransferModal}
          onClose={handleCloseTransfer}
          ticket={selectedTicket}
          onSuccess={handleTransferSuccess}
        />
      </div>
    </div>
  );
}
