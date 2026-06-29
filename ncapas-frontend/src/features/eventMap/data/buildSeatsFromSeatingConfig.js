export function buildSeatsFromSeatingConfig(seatingConfig) {
  // seatingConfig example:
  // { vipSeats, vipPrice, generalSeats, generalPrice }
  const vipSeats = seatingConfig?.vipSeats ?? 0;
  const vipPrice = seatingConfig?.vipPrice ?? 0;
  const generalSeats = seatingConfig?.generalSeats ?? 0;
  const generalPrice = seatingConfig?.generalPrice ?? 0;

  const totalSeats = vipSeats + generalSeats;

  const seatsPerRow = 28;
  const rows = Math.ceil(totalSeats / seatsPerRow);

  const seats = [];
  let globalIndex = 0;

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const rowLetter = String.fromCharCode(65 + rowIndex); 

    for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
      if (globalIndex >= totalSeats) break;

      const isVip = globalIndex < vipSeats;
      const id = `${rowLetter}${seatNum}`;

      seats.push({
        id,
        row: rowLetter,
        number: seatNum,
        status: "available",
        price: isVip ? vipPrice : generalPrice,
        tier: isVip ? "vip" : "general",
      });

      globalIndex++;
    }
  }

  return seats;
}

