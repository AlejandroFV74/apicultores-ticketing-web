import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../landingPage/components/Header";
import Footer from "../landingPage/components/Footer";
import { isAuthenticated } from "../../services/auth.service";
import { validateTicket } from "../../services/ticket.service";
import QrCameraScanner from "./components/QrCameraScanner";
import ManualQrForm from "./components/ManualQrForm";
import ScannerResult from "./components/ScannerResult";

function resolveMessage(response) {
  if (!response) return "Ticket validado correctamente.";
  if (typeof response === "string") return response;
  return response.message || response.data || "Ticket validado correctamente.";
}

export default function TicketScannerPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    status: "",
    message: "",
  });

  const handleValidate = useCallback(
    async (qrCode) => {
      if (!isAuthenticated()) {
        navigate("/login", {
          state: { redirectTo: "/tickets/scan" },
        });
        return;
      }

      try {
        setLoading(true);
        setResult({ status: "", message: "" });
        const response = await validateTicket(qrCode);
        setResult({
          status: "success",
          message: resolveMessage(response),
        });
      } catch (error) {
        setResult({
          status: "error",
          message: error.message || "No se pudo validar el ticket.",
        });
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <section className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-neon-blue">
            Control de acceso
          </p>
          <h1 className="mb-4 text-4xl font-black text-white md:text-5xl">
            Escanear QR
          </h1>
          <p className="text-foreground/60">
            Valida entradas escaneando el código QR o ingresando el código manualmente.
          </p>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <QrCameraScanner
            onDetected={handleValidate}
            paused={loading}
          />

          <aside className="space-y-6">
            <div className="glass-card p-6">
              <h2 className="mb-4 text-2xl font-bold">
                Validación manual
              </h2>
              <ManualQrForm
                onSubmit={handleValidate}
                disabled={loading}
              />
            </div>

            <ScannerResult
              status={result.status}
              message={result.message}
            />

            {loading ? (
              <div className="glass-card p-4 text-sm text-foreground/70">
                Validando ticket...
              </div>
            ) : null}
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
