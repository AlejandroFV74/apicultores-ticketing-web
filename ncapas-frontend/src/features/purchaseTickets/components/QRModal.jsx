import Modal from "./Modal";
import { QRCodeSVG } from 'qrcode.react';
import { useState } from "react";

function formatDateTime(date) {
  if (!date) return "Por confirmar";

  return new Date(date).toLocaleString("es-SV", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function QRModal({
    isOpen,
    onClose,
    event,
}) {
    
    const [showText,setShowText] = useState(false);
    if (!event) return null;

    const handleClose = () => {
        setShowText(false);
        onClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
        >
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">
                    {event.title}
                </h2>

                <p className="text-foreground/60 mb-6">
                    Presenta este código al ingresar.
                </p>

                <div
                    style={{
                        display: "inline-block",
                        borderRadius: "8px",
                        overflow: "hidden",
                    }}
                >
                    {showText ? (
                            <div className="max-w-xs break-all text-center text-white font-mono text-sm">
                                <span>{event.qrCode}</span> 
                            </div>
                    ) : (
                        <QRCodeSVG
                        value={event.qrCode}
                        size={200}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                    />
                    
                    )}
                </div>

                <div className="space-y-2 text-sm text-foreground/70">
                    <button
                    onClick = {() => setShowText(!showText)}
                     className="mt-4 px-5 py-2 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium hover:opacity-90 transition-all">
                        {showText ? "Mostrar QR" : "Mostrar texto"}
                    </button>
                    <p>
                        📅 {formatDateTime(event.eventDate)}
                    </p>

                    <p>
                        📍 {event.seatType}
                    </p>

                    <p>
                        🎟️ {event.seatNumber} entrada(s)
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="
            mt-6
            px-6
            py-3
            rounded-lg
            border
            border-neon-blue/40
            hover:bg-neon-blue/10
            transition-colors
          "
                >
                    Cerrar
                </button>
            </div>
        </Modal>
    );
}