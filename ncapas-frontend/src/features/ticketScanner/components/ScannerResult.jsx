export default function ScannerResult({ status, message }) {
  if (!message) return null;

  const isSuccess = status === "success";

  return (
    <div
      className={`rounded-lg border p-4 ${
        isSuccess
          ? "border-neon-blue/40 bg-neon-blue/10 text-neon-blue"
          : "border-destructive/40 bg-destructive/10 text-destructive"
      }`}
    >
      <p className="text-sm font-semibold">
        {isSuccess ? "Validación completada" : "No se pudo validar"}
      </p>
      <p className="mt-1 text-base text-foreground">
        {message}
      </p>
    </div>
  );
}
