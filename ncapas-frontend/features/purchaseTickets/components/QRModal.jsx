import Modal from "./Modal";
import { QRCodeSVG } from 'qrcode.react';

export default function QRModal({
    isOpen,
    onClose,
    event,
}) {
    if (!event) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
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
                    <QRCodeSVG
                        value={event.qrValue}
                        size={200}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                    />
                </div>


                <div className="space-y-2 text-sm text-foreground/70">
                    <p>
                        📅 {event.date}
                    </p>

                    <p>
                        📍 {event.location}
                    </p>

                    <p>
                        🎟️ {event.tickets} entrada(s)
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