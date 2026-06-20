import { useState, useCallback } from "react";

export function useSeatSelection(
  initialSeats,
  onSelectionChange
) {
  const [seats, setSeats] = useState(initialSeats);

  const [selectedSeats, setSelectedSeats] =
    useState([]);

  const handleSeatClick = useCallback(
    (seatId) => {
      setSeats((prevSeats) => {
        const updatedSeats = prevSeats.map(
          (seat) => {
            if (
              seat.id === seatId &&
              seat.status !== "booked"
            ) {
              return {
                ...seat,
                status:
                  seat.status === "selected"
                    ? "available"
                    : "selected",
              };
            }

            return seat;
          }
        );

        const selected = updatedSeats.filter(
          (seat) => seat.status === "selected"
        );

        setSelectedSeats(
          selected.map((seat) => seat.id)
        );

        if (onSelectionChange) {
          onSelectionChange(selected);
        }

        return updatedSeats;
      });
    },
    [onSelectionChange]
  );

  return {
    seats,
    selectedSeats,
    handleSeatClick,
  };
}