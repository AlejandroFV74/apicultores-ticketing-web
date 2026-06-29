import { useState } from "react";
import Modal from "./Modal";
import { refundTicket } from "../../../services/ticket.service";

export default function RefundTicketModal({
  isOpen,
  onClose,
  ticket,
  onSuccess
}) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRefund = async () => {
    setError("");
    const finalReason = reason.trim() || "User requested refund";

    setLoading(true);

    try {
      await refundTicket({
        ticketId: ticket.ticketId,
        reason: finalReason
      });

      setSuccess(true);
      
      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || "Error al procesar la solicitud de reembolso");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setReason("");
      setError("");
      setSuccess(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">
          Solicitar Reembolso
        </h2>

        {success ? (
          <div className="py-8">
            <div className="text-4xl mb-4">✓</div>
            <p className="text-neon-green text-lg font-semibold">
              Solicitud de reembolso enviada
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
                  Razón (opcional)
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Usuario solicitante reembolso"
                  disabled={loading}
                  rows={3}
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-lg
                    bg-background/50
                    border
                    border-border
                    outline-none
                    focus:border-neon-blue
                    transition-colors
                    resize-none
                  "
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <p className="text-yellow-500 text-sm">
                Esta acción no se puede deshacer.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleClose}
                disabled={loading}
                className="
                  flex-1
                  px-6
                  py-3
                  rounded-lg
                  font-semibold
                  border
                  border-border
                  hover:bg-white/10
                  transition-colors
                  disabled:opacity-50
                "
              >
                Cancelar
              </button>

              <button
                onClick={handleRefund}
                disabled={loading}
                className="
                  flex-1
                  px-6
                  py-3
                  rounded-lg
                  font-semibold
                  bg-red-600
                  text-white
                  transition-all
                  hover:bg-red-700
                  hover:shadow-lg
                  hover:shadow-red-600/50
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {loading ? "Procesando..." : "Confirmar Reembolso"}
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
