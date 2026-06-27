import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, session, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-ink text-paper shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="font-display font-bold text-xl uppercase tracking-widest text-stub">
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium uppercase tracking-wide">
          <Link to="/" className="hover:text-stub transition-colors">
            Eventos
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/organizer" className="hover:text-stub transition-colors">
                Mis eventos
              </Link>
              <span className="text-paper/50 text-xs normal-case">{session.fullName}</span>
              <button
                onClick={handleLogout}
                className="bg-stamp-red/20 hover:bg-stamp-red/40 border border-stamp-red/40 text-stamp-red px-3 py-1.5 rounded transition-colors"
              >
                Salir
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-stub hover:bg-stub-dark text-white px-4 py-1.5 rounded transition-colors"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
