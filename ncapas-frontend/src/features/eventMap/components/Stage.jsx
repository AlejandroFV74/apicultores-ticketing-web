export default function Stage() {
  return (
    <div className="flex justify-center">
      <div className="text-center">
        <div className="relative w-96 h-12 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b-3xl flex items-center justify-center mb-4 shadow-lg">
          <span className="text-white font-bold text-lg">
            STAGE
          </span>
        </div>

        <p className="text-sm text-foreground/60 font-semibold tracking-widest">
          All eyes facing this direction
        </p>
      </div>
    </div>
  );
}