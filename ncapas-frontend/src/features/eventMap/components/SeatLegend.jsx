export default function SeatLegend() {
  return (
    <div className="flex gap-8 justify-center pt-8 border-t border-border">
      <div className="flex items-center gap-3">
        <div className="seat seat-available" />
        <span className="text-sm text-foreground">
          Available
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