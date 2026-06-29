export default function SeatLegend() {
  return (
    <div className="flex gap-8 justify-center pt-8 border-t border-border">
      <div className="flex items-center gap-3">
        <div className="seat seat-available" />
        <span className="text-sm text-foreground">
          General Available
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="seat seat-available relative">
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              color: "#808000",
              fontWeight: 900,
              fontSize: "0.75rem",
              lineHeight: 1,
              textShadow:
                "0 0 8px rgba(251, 191, 36, 0.35)",
              pointerEvents: "none",
            }}
          >
            V
          </span>
        </div>
        <span className="text-sm text-foreground">
          VIP Available
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="seat seat-selected" />
        <span className="text-sm text-foreground">
          Selected
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="seat seat-booked" />
        <span className="text-sm text-foreground">
          Unavailable
        </span>
      </div>
    </div>
  );
}