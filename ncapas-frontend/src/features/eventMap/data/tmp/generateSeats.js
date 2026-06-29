export const generateSeats = () => {
  const seats = [];

  const rows = 20;
  const seatsPerRow = 28;
  const price = 45;

  for (let row = 1; row <= rows; row++) {
    const rowLetter = String.fromCharCode(64 + row);

    for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
      const isBooked = Math.random() > 0.65;

      seats.push({
        id: `${rowLetter}${seatNum}`,
        row: rowLetter,
        number: seatNum,
        status: isBooked ? "booked" : "available",
        price,
      });
    }
  }

  return seats;
};