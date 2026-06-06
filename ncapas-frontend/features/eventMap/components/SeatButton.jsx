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
        seat.status === "booked" &&
          "opacity-50"
      )}
      aria-label={`Seat ${seat.row}${seat.number} - ${seat.status}`}
      title={`Seat ${seat.row}${seat.number} - $${seat.price}`}
    />
  );
}