export default function AuthFooterLink({
  text,
  linkText,
  onClick,
}) {
  return (
    <div className="text-center">
      <span className="text-foreground/60">
        {text}
      </span>

      <button
        type="button"
        onClick={onClick}
        className="ml-2 text-neon-blue font-semibold hover:underline"
      >
        {linkText}
      </button>
    </div>
  );
}