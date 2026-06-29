export default function PurchaseSummary({
  selectedSeats = [],
  selectedTotalPrice = 0,
  maxSeatsPerUser = null,
  mobile = false,
  
  quote,
  code,
  setCode,
  onApplyCode,

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

<div className="mt-4">
  <input
    value={code}
    onChange={(e) => setCode(e.target.value)}
    placeholder="Código de descuento"
    className="w-full mb-2 p-2 rounded bg-background border border-neon-blue/20 text-white"
  />

  <button
    onClick={onApplyCode}
    className="w-full mb-4 py-2 bg-neon-purple text-white rounded"
  >
    Aplicar código
  </button>
</div>

{quote && (
  <div className="space-y-1 text-sm mb-4">
    <p>Subtotal: ${quote.subtotal}</p>

    {quote.appliedDiscounts?.map((d, i) => (
      <p key={i} className="text-green-400">
        {d.description} (-${d.amountDiscounted})
      </p>
    ))}

    <p>Total descuento: -${quote.totalDiscount}</p>

    <p className="font-bold text-lg">
      Total: ${quote.total}
    </p>
  </div>
)}

      <button
        disabled={!totalSeats}
        className="
          w-full
          py-3
          rounded-lg
          bg-gradient-to-r
          from-neon-blue
          to-neon-purple
          text-white
          font-semibold
          disabled:opacity-50
        "
      >
        Comprar
      </button>
    </div>
  );
}