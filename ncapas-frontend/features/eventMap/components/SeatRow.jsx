import SeatButton from "./SeatButton";

export default function SeatRow({
  row,
  seats,
  onSeatClick,
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-8 text-right">
        <span className="text-sm font-bold text-foreground/70">
          {row}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {seats
          .sort((a, b) => a.number - b.number)
          .map((seat) => (
            <SeatButton
              key={seat.id}
              seat={seat}
              onClick={onSeatClick}
            />
          ))}
      </div>

      <div className="w-8">
        <span className="text-sm font-bold text-foreground/70">
          {row}
        </span>
      </div>
    </div>
  );
}