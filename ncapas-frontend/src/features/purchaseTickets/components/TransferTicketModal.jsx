import { useState } from "react";
import Modal from "./Modal";
import { transferTicket } from "../../../services/ticket.service";

export default function TransferTicketModal({
  isOpen,
  onClose,
  ticket,
  onSuccess
}) {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleTransfer = async () => {
    setError("");

    if (!recipientEmail.trim()) {
      setError("El correo del destinatario es requerido");
      return;
    }

    if (!validateEmail(recipientEmail)) {
      setError("Por favor ingresa un correo válido");
      return;
    }

    setLoading(true);

    try {
      await transferTicket({
        ticketId: ticket.ticketId,
        toUserEmail: recipientEmail
      });

      setSuccess(true);
      
      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || "Error al transferir la entrada");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setRecipientEmail("");
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
          Transferir Entrada
        </h2>

        {success ? (
          <div className="py-8">
            <div className="text-4xl mb-4">✓</div>
            <p className="text-neon-green text-lg font-semibold">
              Entrada transferida exitosamente
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
                  Correo del destinatario
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="destinatario@ejemplo.com"
                  disabled={loading}
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
                  "
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
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
                onClick={handleTransfer}
                disabled={loading}
                className="
                  flex-1
                  px-6
                  py-3
                  rounded-lg
                  font-semibold
                  bg-gradient-to-r
                  from-neon-blue
                  to-neon-purple
                  text-white
                  transition-all
                  hover:shadow-lg
                  hover:shadow-neon-blue/50
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {loading ? "Transferiendo..." : "Transferir Entrada"}
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
