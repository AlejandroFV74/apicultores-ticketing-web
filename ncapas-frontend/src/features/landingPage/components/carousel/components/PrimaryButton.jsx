import { useNavigate } from "react-router-dom";

export default function PrimaryButton({
  children,
  className = "",
  ...props
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/eventmap");
  }
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