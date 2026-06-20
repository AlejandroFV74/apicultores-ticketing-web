export default function PurchaseSummary({
  selectedSeats = [],
  mobile = false,
}) {
  const totalSeats = selectedSeats.length;

  const totalPrice = selectedSeats.reduce(
    (acc, seat) => acc + seat.price,
    0
  );

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
          {totalSeats} asiento(s)
        </span>
      </div>

      <div className="flex justify-between mb-4">
        <span>Total</span>

        <span className="font-bold text-xl">
          ${totalPrice}
        </span>
      </div>

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