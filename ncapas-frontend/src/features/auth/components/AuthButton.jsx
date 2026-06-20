export default function AuthButton({
  children,
  ...props
}) {
  return (
    <button
      className="
        w-full
        py-3
        rounded-lg
        font-semibold
        bg-gradient-to-r
        from-neon-blue
        to-neon-purple
        text-white
        transition-all
        hover:shadow-lg
        hover:shadow-neon-blue/50
      "
      {...props}
    >
      {children}
    </button>
  );
}