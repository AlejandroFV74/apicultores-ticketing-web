import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const session = await login(form.email, form.password);

      if (session.role !== "ORGANIZER") {
        toast.error("Esta sección es solo para organizadores.");
        navigate("/");
        return;
      }

      toast.success(`Bienvenido, ${session.fullName}`);
      navigate("/organizer");
    } catch (error) {
      toast.error(error.message || "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-xl border border-ink/10 shadow-sm space-y-5"
      >
        <div className="text-center mb-2">
          <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-ink">
            Acceso organizador
          </h1>
          <p className="text-sm text-ink-soft mt-1">Inicia sesión para gestionar tus eventos.</p>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wide text-ink-soft mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border border-ink/20 p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-stub/50"
            placeholder="tucorreo@ejemplo.com"
          />
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wide text-ink-soft mb-1">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full border border-ink/20 p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-stub/50"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-stub hover:bg-stub-dark disabled:opacity-60 text-white py-2.5 rounded font-display font-semibold uppercase tracking-wide transition-colors"
        >
          {loading ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
