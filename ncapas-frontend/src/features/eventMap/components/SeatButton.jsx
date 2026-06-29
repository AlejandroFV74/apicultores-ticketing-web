import { cn } from "../../../libs/utils";

export default function SeatButton({
  seat,
  onClick,
}) {
  const getSeatStatusClass = (status) => {
    switch (status) {
      case "selected":
        return "seat-selected";

      case "booked":
        return "seat-booked";

      default:
        return "seat-available";
    }
  };

  return (
    <button
      onClick={() => onClick(seat.id)}
      disabled={seat.status === "booked"}
      className={cn(
        "seat",
        getSeatStatusClass(seat.status),
        seat.status === "booked" && "opacity-50",
        seat.tier === "vip" && "relative"
      )}
      aria-label={`Seat ${seat.row}${seat.number} - ${seat.status}`}
      title={`Seat ${seat.row}${seat.number} - $${seat.price}`}
    >
      {seat.tier === "vip" ? (
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            color: "#808000", // Olive color for VIP
            fontWeight: 900,
            fontSize: "0.75rem",
            lineHeight: 1,
            textShadow: "0 0 8px rgba(251, 191, 36, 0.35)",
            pointerEvents: "none",
          }}
        >
          V
        </span>
      ) : null}
    </button>
  );
}