// Normalizes backend seat data so the SeatMap can mark them as booked.
// We accept multiple possible shapes to reduce coupling.

function normalizeBookedSeatId(seat) {
  // seat could be: { seatId }, { id }, { seatCode }, { seat: { id } }
  return (
    seat?.seatId ??
    seat?.id ??
    seat?.seatCode ??
    seat?.code ??
    seat?.seat?.id ??
    null
  );
}

export function applyBookedStatusToSeats(generatedSeats, backendSeats) {
  const bookedIds = new Set(
    (backendSeats ?? [])
      .map(normalizeBookedSeatId)
      .filter(Boolean)
  );

  // If backend includes explicit status, respect it.
  const statusById = new Map();
  for (const s of backendSeats ?? []) {
    const seatId = normalizeBookedSeatId(s);
    if (!seatId) continue;
    const status = s?.status;
    if (status) statusById.set(seatId, status);
  }

  return generatedSeats.map((seat) => {
    if (!bookedIds.has(seat.id)) return seat;

    const backendStatus = statusById.get(seat.id);
    return {
      ...seat,
      status:
        backendStatus === "available" ? "available" : "booked",
    };
  });
}

