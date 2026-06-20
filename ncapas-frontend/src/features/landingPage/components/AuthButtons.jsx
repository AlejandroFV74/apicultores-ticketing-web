import { useNavigate } from "react-router-dom";

export default function AuthButtons({
  mobile = false,
}) {

  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate("/login");
  }

  const handleRegisterClick = () => {
    navigate("/register");
  }


  if (mobile) {
    return (
      <div className="flex gap-2 pt-4 border-t border-neon-blue/20">
        <button className="flex-1 px-4 py-2 text-sm font-medium border border-neon-blue/30 rounded-lg"
          onClick={handleLoginClick}>
          Ingresar
        </button>

        <button className="flex-1 px-4 py-2 text-sm font-medium border border-neon-blue/30 rounded-lg"
          onClick={handleRegisterClick}>
          Ingresar
        </button>
      </div>
    );
  }

  return (
    <>
      <button className="hidden sm:inline px-4 py-2 text-sm font-medium border border-neon-blue/30 rounded-lg hover:border-neon-blue hover:bg-neon-blue/10 transition-colors"
        onClick={handleLoginClick}>
        Ingresar
      </button>

      <button
        className="hidden sm:inline px-4 py-2 text-sm font-medium bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg hover:shadow-lg hover:shadow-neon-blue/50 transition-all"
        onClick={handleRegisterClick}
      >
        Registrarse
      </button>
    </>
  );
}