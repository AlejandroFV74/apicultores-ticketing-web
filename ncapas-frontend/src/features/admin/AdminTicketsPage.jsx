import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../landingPage/components/Header";
import Footer from "../landingPage/components/Footer";
import Modal from "../purchaseTickets/components/Modal";
import { getAllTickets, refundTicket } from "../../services/ticket.service";
import { isAdmin } from "../../services/auth.service";

const TICKET_STATUS = ["PAID", "USED", "REFUNDED"];

export default function AdminTicketsPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [pendingRefunds, setPendingRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Refund modal state
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [refundReason, setRefundReason] = useState("");
  const [refunding, setRefunding] = useState(false);
  const [refundError, setRefundError] = useState("");
  const [refundSuccess, setRefundSuccess] = useState(false);

  const loadTickets = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllTickets();
      setTickets(data.data || data);
    } catch (err) {
      setError(err.message || "Error al cargar tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/");
      return;
    }
    loadTickets();
    // Load pending refunds from local storage
    try {
      const refunds = JSON.parse(localStorage.getItem("pendingRefunds") || "[]");
      setPendingRefunds(refunds);
    } catch (err) {
      console.error(err);
    }
  }, [navigate]);

  const openRefundModal = (ticket) => {
    setSelectedTicket(ticket);
    setRefundReason("");
    setRefundError("");
    setRefundSuccess(false);
    setShowRefundModal(true);
  };

  const handleRefund = async () => {
    if (!selectedTicket) return;

    setRefunding(true);
    setRefundError("");

    try {
      await refundTicket({
        ticketId: selectedTicket.ticketId || selectedTicket.id,
        reason: refundReason.trim() || "Customer requested refund",
      });

      setRefundSuccess(true);
      setTimeout(() => {
        setShowRefundModal(false);
        loadTickets();
        try {
          const refunds = JSON.parse(localStorage.getItem("pendingRefunds") || "[]");
          setPendingRefunds(refunds);
        } catch (err) {
          console.error(err);
        }
      }, 1500);
    } catch (err) {
      setRefundError(err.message || "Error al procesar reembolso");
    } finally {
      setRefunding(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString("es-SV", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const colors = {
      PAID: "bg-green-500/20 text-green-400 border-green-500/40",
      USED: "bg-blue-500/20 text-blue-400 border-blue-500/40",
      REFUNDED: "bg-red-500/20 text-red-400 border-red-500/40",
    };
    return colors[status] || colors.PAID;
  };

  const canRefund = (ticket) => {
    return ticket.ticketStatus === "PAID" || ticket.status === "PAID";
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-16">
{pendingRefunds.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Solicitudes de Reembolso Pendientes</h2>
          <div className="glass-card p-4 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-2 text-sm font-medium text-foreground/60">Ticket</th>
                  <th className="pb-2 text-sm font-medium text-foreground/60">Evento</th>
                  <th className="pb-2 text-sm font-medium text-foreground/60">Motivo</th>
                  <th className="pb-2 text-sm font-medium text-foreground/60">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {pendingRefunds.map((refund, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-2">{refund.seatNumber}</td>
                    <td className="py-2">{refund.eventName}</td>
                    <td className="py-2">{refund.reason}</td>
                    <td className="py-2 text-foreground/60">{new Date(refund.requestedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}


        <section className="mb-10">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-neon-blue">
              Administrador
            </p>
            <h1 className="mb-4 text-4xl font-black text-white md:text-5xl">
              Gestionar Tickets
            </h1>
            <p className="text-foreground/60">
              Visualiza y administra todos los tickets del sistema.
            </p>
          </div>
        </section>

        {loading ? (
          <div className="glass-card p-8 text-center text-foreground/70">
            Cargando tickets...
          </div>
        ) : error ? (
          <div className="glass-card p-8 text-center text-destructive">
            {error}
          </div>
        ) : tickets.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <h2 className="mb-2 text-2xl font-bold">
              No hay tickets
            </h2>
            <p className="text-foreground/60">
              No hay tickets en el sistema.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-4 pr-4 text-sm font-medium text-foreground/60">Ticket ID</th>
                  <th className="pb-4 pr-4 text-sm font-medium text-foreground/60">Evento</th>
                  <th className="pb-4 pr-4 text-sm font-medium text-foreground/60">Asiento</th>
                  <th className="pb-4 pr-4 text-sm font-medium text-foreground/60">Tipo</th>
                  <th className="pb-4 pr-4 text-sm font-medium text-foreground/60">Propietario</th>
                  <th className="pb-4 pr-4 text-sm font-medium text-foreground/60">Estado</th>
                  <th className="pb-4 text-sm font-medium text-foreground/60">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.ticketId || ticket.id} className="border-b border-border/50">
                    <td className="py-4 pr-4 text-sm font-mono">
                      {(ticket.ticketId || ticket.id)?.slice(0, 8)}...
                    </td>
                    <td className="py-4 pr-4">{ticket.eventName || ticket.event?.eventName}</td>
                    <td className="py-4 pr-4">{ticket.seatNumber}</td>
                    <td className="py-4 pr-4">{ticket.seatType}</td>
                    <td className="py-4 pr-4">
                      {ticket.ownerEmail || ticket.owner?.email || ticket.ownerName}
                    </td>
                    <td className="py-4 pr-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(ticket.ticketStatus || ticket.status)}`}>
                        {ticket.ticketStatus || ticket.status}
                      </span>
                    </td>
                    <td className="py-4">
                      {canRefund(ticket) && (
                        <button
                          onClick={() => openRefundModal(ticket)}
                          className="px-3 py-1 text-sm text-red-400 hover:underline"
                        >
                          Reembolsar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />


      {/* Refund Modal */}
      {showRefundModal && (
        <Modal isOpen={showRefundModal} onClose={() => !refunding && setShowRefundModal(false)}>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Reembolsar Ticket</h2>

            {refundSuccess ? (
              <div className="py-8">
                <div className="text-4xl mb-4">✓</div>
                <p className="text-neon-green text-lg font-semibold">
                  Reembolso procesado
                </p>
              </div>
            ) : (
              <>
                <div className="text-left space-y-4 mb-6">
                  <div>
                    <span className="text-sm text-foreground/60">Evento:</span>
                    <p className="font-medium">{selectedTicket?.eventName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-foreground/60">Asiento:</span>
                    <p className="font-medium">{selectedTicket?.seatNumber}</p>
                  </div>
                  <div>
                    <span className="text-sm text-foreground/60">Tipo:</span>
                    <p className="font-medium">{selectedTicket?.seatType}</p>
                  </div>
                  <div>
                    <span className="text-sm text-foreground/60">Propietario:</span>
                    <p className="font-medium">
                      {selectedTicket?.ownerEmail || selectedTicket?.owner?.email}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Razón (opcional)
                    </label>
                    <textarea
                      value={refundReason}
                      onChange={(e) => setRefundReason(e.target.value)}
                      placeholder="Cliente solicitante reembolso"
                      disabled={refunding}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border outline-none focus:border-neon-blue resize-none"
                    />
                  </div>

                  {refundError && (
                    <p className="text-red-500 text-sm">{refundError}</p>
                  )}

                  <p className="text-yellow-500 text-sm">
                    Esta acción no se puede deshacer.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowRefundModal(false)}
                    disabled={refunding}
                    className="flex-1 px-6 py-3 rounded-lg font-semibold border border-border hover:bg-white/10 disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleRefund}
                    disabled={refunding}
                    className="flex-1 px-6 py-3 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    {refunding ? "Procesando..." : "Confirmar Reembolso"}
                  </button>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
