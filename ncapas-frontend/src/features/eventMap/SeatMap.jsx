import { useSeatSelection } from "../../hooks/useSeatSelection";
import { generateSeats } from "./data/tmp/generateSeats";
import Stage from "./components/Stage";
import SeatLegend from "./components/SeatLegend";
import SeatSection from "./components/SeatSection";
import PurchaseSummary from "./components/PurchaseSummary";
import SeatRow from "./components/SeatRow";


export function SeatMap({
  onSelectionChange,
}) {
  const {
    seats,
    selectedSeats,
    handleSeatClick,
  } = useSeatSelection(
    generateSeats(),
    onSelectionChange
  );

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
    <div className="grid lg:grid-cols-[320px_1fr] gap-8">
      
      <div className="hidden lg:block w-80 flex-shrink-0">
      <PurchaseSummary
        selectedSeats={selectedSeats}
      />
      </div>

      <div className ="lg:hidden">
            <PurchaseSummary
                selectedSeats={selectedSeats}
                mobile
            />
      </div>

      <div className="space-y-12">
        <Stage />

        <div>
          <h3 className="text-xl font-bold mb-1">
            Asientos
          </h3>

          <p className="text-sm text-foreground/60">
            {
              seats.filter(
                (seat) =>
                  seat.status === "available"
              ).length
            }{" "}
            disponibles
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
                onSeatClick={handleSeatClick}
              />
            ))}
        </div>

        <SeatLegend />
      </div>
    </div>
  );
}