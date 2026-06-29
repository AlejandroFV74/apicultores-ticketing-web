import { useState } from "react";
import Modal from "./Modal";

export default function RefundRequestModal({
  isOpen,
  onClose,
  ticket,
  onSuccess,
}) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    // Simulated - save to local storage (no backend call)
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save refund request to local storage
      const pendingRefunds = JSON.parse(localStorage.getItem("pendingRefunds") || "[]");
      pendingRefunds.push({
        ticketId: ticket.ticketId,
        eventName: ticket.eventName,
        seatNumber: ticket.seatNumber,
        seatType: ticket.seatType,
        reason: reason.trim() || "Sin motivo especificado",
        requestedAt: new Date().toISOString(),
        status: "PENDING"
      });
      localStorage.setItem("pendingRefunds", JSON.stringify(pendingRefunds));
      
      setSuccess(true);
      
      if (onSuccess) {
        onSuccess();
      }
      
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setReason("");
      setSuccess(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Solicitar Reembolso</h2>

        {success ? (
          <div className="py-8">
            <div className="text-4xl mb-4">✓</div>
            <p className="text-neon-green text-lg font-semibold">
              Solicitud de reembolso enviada
            </p>
            <p className="text-sm text-foreground/60 mt-2">
              Un administrador revisará tu solicitud
            </p>
          </div>
        ) : (
          <>
            <div className="text-left space-y-4 mb-6">
              <div>
                <span className="text-sm text-foreground/60">Evento:</span>
                <p className="font-medium">{ticket?.eventName}</p>
              </div>
              <div>
                <span className="text-sm text-foreground/60">Asiento:</span>
                <p className="font-medium">{ticket?.seatNumber}</p>
              </div>
              <div>
                <span className="text-sm text-foreground/60">Tipo:</span>
                <p className="font-medium">{ticket?.seatType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Motivo del reembolso
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Explica el motivo de tu solicitud..."
                  disabled={loading}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border outline-none focus:border-neon-blue resize-none"
                />
              </div>
              <p className="text-yellow-500 text-sm">
                Tu solicitud será revisada por un administrador.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleClose}
                disabled={loading}
                className="flex-1 px-6 py-3 rounded-lg font-semibold border border-border hover:bg-white/10 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 px-6 py-3 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Solicitar"}
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
