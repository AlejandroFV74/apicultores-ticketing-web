import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/auth.service";

export default function LogoutButton({ mobile = false }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <button
      type="button"
      onClick={handleLogoutClick}
      className={
        mobile
          ? "w-full rounded-lg border border-neon-blue/30 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-neon-blue hover:bg-neon-blue/10"
          : "shrink-0 rounded-lg border border-neon-blue/30 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-neon-blue hover:bg-neon-blue/10"
      }
    >
      Cerrar sesión
    </button>
  );
}
