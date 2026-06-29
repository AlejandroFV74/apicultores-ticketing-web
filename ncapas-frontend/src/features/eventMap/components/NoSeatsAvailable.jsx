export default function NoSeatsAvailable({
  onSubscribe,
  loading = false,
}) {
  return (
    <div className="glass-card p-6 border border-neon-purple/30">
      <div className="flex items-start gap-4">
        <div className="text-4xl">🔔</div>

        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">
            No hay asientos disponibles
          </h3>

          <p className="text-foreground/70 mb-6">
            Este evento se encuentra completamente agotado.
            Si algún usuario cancela su reserva o se liberan
            nuevos asientos, podemos avisarte inmediatamente.
          </p>

          <button
            onClick={onSubscribe}
            disabled={loading}
            className="
              px-6
              py-3
              rounded-lg
              bg-gradient-to-r
              from-neon-blue
              to-neon-purple
              text-white
              font-semibold
              disabled:opacity-50
            "
          >
            {loading
              ? "Suscribiendo..."
              : "Notificarme cuando haya asientos"}
          </button>
        </div>
      </div>
    </div>
  );
}