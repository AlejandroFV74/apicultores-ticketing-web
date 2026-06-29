import { useState } from "react";

import AuthLayout from "../components/AuthLayout";
import AuthCard from "../components/AuthCard";
import AuthLogo from "../components/AuthLogo";
import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import AuthButton from "../components/AuthButton";
import AuthFooterLink from "../components/AuthFooterLink";
import { Register } from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);
    try {
      await Register(form);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthLogo subtitle="Crea tu cuenta para comenzar" />

        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthInput
            label="Nombre completo"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Jon Doe"
          />

          <AuthInput
            label="Correo electrónico"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
          />

          <PasswordInput
            label="Contraseña"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="********"
          />

          <PasswordInput
            label="Confirmar contraseña"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="********"
          />

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <AuthButton type="submit" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear Cuenta"}
          </AuthButton>
        </form>

        <div className="mt-6">
          <AuthFooterLink
            text="¿Ya tienes cuenta?"
            linkText="Iniciar sesión"
            onClick={handleLoginClick}
          />
        </div>
      </AuthCard>
    </AuthLayout>
  );
}