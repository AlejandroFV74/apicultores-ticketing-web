import { useEffect, useRef, useState } from "react";

export default function QrCameraScanner({
  onDetected,
  paused = false,
}) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const frameRef = useRef(null);
  const lastValueRef = useRef("");
  const pausedRef = useRef(paused);
  const [cameraError, setCameraError] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    let cancelled = false;

    async function startCamera() {
      if (!("BarcodeDetector" in window)) {
        setCameraError(
          "Tu navegador no soporta escaneo QR desde cámara. Usa la validación manual."
        );
        return;
      }

      try {
        const detector = new window.BarcodeDetector({
          formats: ["qr_code"],
        });

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setIsReady(true);
        }

        const scan = async () => {
          if (cancelled || !videoRef.current) return;

          try {
            if (!pausedRef.current && videoRef.current.readyState >= 2) {
              const codes = await detector.detect(videoRef.current);
              const value = codes?.[0]?.rawValue;

              if (value && value !== lastValueRef.current) {
                lastValueRef.current = value;
                onDetected(value);
              }
            }
          } catch (error) {
            console.error(error);
          }

          frameRef.current = requestAnimationFrame(scan);
        };

        frameRef.current = requestAnimationFrame(scan);
      } catch (error) {
        console.error(error);
        setCameraError(
          "No se pudo acceder a la cámara. Revisa los permisos o usa la validación manual."
        );
      }
    }

    startCamera();

    return () => {
      cancelled = true;

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [onDetected]);

  return (
    <div className="glass-card overflow-hidden">
      <div className="relative aspect-[4/3] bg-muted">
        <video
          ref={videoRef}
          muted
          playsInline
          className="h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-48 w-48 rounded-lg border-2 border-neon-blue shadow-[0_0_30px_rgba(59,130,246,0.35)]" />
        </div>

        {!isReady && !cameraError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 text-foreground/70">
            Activando cámara...
          </div>
        ) : null}
      </div>

      {cameraError ? (
        <div className="border-t border-neon-blue/20 p-4 text-sm text-foreground/70">
          {cameraError}
        </div>
      ) : (
        <div className="border-t border-neon-blue/20 p-4 text-sm text-foreground/60">
          Enfoca el QR dentro del recuadro para validar la entrada.
        </div>
      )}
    </div>
  );
}
