export default function Modal({
  isOpen,
  onClose,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        backdrop-blur-sm
        p-4
      "
      onClick={onClose}
    >
      <div
        className="
          glass-card
          w-full
          max-w-lg
          p-6
          relative
          animate-in
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="
            absolute
            top-4
            right-4
            w-8
            h-8
            flex
            items-center
            justify-center
            rounded-full
            hover:bg-white/10
          "
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}