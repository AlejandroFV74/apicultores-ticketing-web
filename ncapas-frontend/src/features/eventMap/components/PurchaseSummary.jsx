export default function PurchaseSummary({
  selectedSeats = [],
  selectedTotalPrice = 0,
  maxSeatsPerUser = null,
  mobile = false,
}) {
  const totalSeats = selectedSeats.length;

  const totalPrice = Number.isFinite(Number(selectedTotalPrice))
    ? Number(selectedTotalPrice)
    : 0;

  const limit =
    maxSeatsPerUser === null || maxSeatsPerUser === undefined
      ? null
      : Number(maxSeatsPerUser);

  const limitReached =
    limit !== null && Number.isFinite(limit)
      ? totalSeats >= limit
      : false;

  return (
    <div
      className={
        mobile
          ? `
            fixed
            bottom-4
            left-4
            right-4
            z-50
            glass-card
            p-4
            shadow-2xl
            backdrop-blur-xl
          `
          : `
            glass-card
            p-6
            sticky
            top-24
          `
      }
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">
          Resumen
        </h2>

        <span className="text-neon-blue font-bold">
          {Number.isFinite(totalSeats) ? totalSeats : 0} asiento(s)
        </span>
      </div>

      <div className="flex justify-between mb-2">
        <span>Total</span>

        <span className="font-bold text-xl">
          ${Number.isFinite(totalPrice) ? totalPrice : 0}
        </span>
      </div>

      {limit !== null ? (
        <div className="mb-4 text-sm">
          <div
            className={
              limitReached
                ? "text-yellow-400 font-bold"
                : "text-foreground/60"
            }
          >
            {totalSeats} / {limit} selected
          </div>
          {limitReached ? (
            <div className="text-yellow-400 font-bold mt-1">
              You have reach the limit per user
            </div>
          ) : null}
        </div>
      ) : null}

    </div>
  );
}