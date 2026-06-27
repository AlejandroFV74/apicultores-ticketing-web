import { useNavigate } from "react-router-dom";

const RESERVATION_TIMEOUT_SECONDS = 1 * 60;
const SESSION_KEY_TIMER_END_AT = "reservation_timer_end_at";

export default function PrimaryButton({
  children,
  className = "",
  ...props
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Start reservation timer when user enters seat selection.
    const endAt = Date.now() + RESERVATION_TIMEOUT_SECONDS * 1000;
    sessionStorage.setItem(
      SESSION_KEY_TIMER_END_AT,
      String(endAt)
    );

    navigate("/eventmap");
  };

  return (
    <button
      className={`
        w-full mt-4
        bg-gradient-to-r
        from-neon-blue
        to-neon-purple
        text-white
        font-semibold
        py-3
        rounded-lg
        transition-all
        duration-300
        hover:shadow-lg
        hover:shadow-neon-blue/50
        active:scale-95
        ${className}
      `}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
