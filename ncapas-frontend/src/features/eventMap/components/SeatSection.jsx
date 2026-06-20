import SeatRow from "./SeatRow";

export default function SeatSection({
  section,
  seats,
  onSeatClick,
}) {
  const groupedByRow = seats.reduce(
    (acc, seat) => {
      if (!acc[seat.row]) {
        acc[seat.row] = [];
      }

      acc[seat.row].push(seat);

      return acc;
    },
    {}
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-foreground mb-1">
          Event Place
        </h3>

        <p className="text-sm text-foreground/60">
          {
            seats.filter(
              (s) => s.status === "available"
            ).length
          }{" "}
          available seats
        </p>
      </div>

      <div className="space-y-3 pl-4">
        {Object.entries(groupedByRow)
          .sort(([a], [b]) =>
            a.localeCompare(b)
          )
          .map(([row, rowSeats]) => (
            <SeatRow
              key={row}
              row={row}
              seats={rowSeats}
              onSeatClick={onSeatClick}
            />
          ))}
      </div>
    </div>
  );
}