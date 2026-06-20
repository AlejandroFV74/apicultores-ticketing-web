import { useState } from "react";

import AuthLayout from "../components/AuthLayout";
import AuthCard from "../components/AuthCard";
import AuthLogo from "../components/AuthLogo";
import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import AuthButton from "../components/AuthButton";
import AuthFooterLink from "../components/AuthFooterLink";
import { Login } from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Login(form).then((res) => {
      if (res) {
        navigate("/");
      }
    });
  };

  const handleRegisterClick = () => {
    // navigate("/register");
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthLogo
          subtitle="Inicia sesión para acceder a tus eventos"
        />

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <AuthInput
            label="Correo Electrónico"
            name="email"
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

          <AuthButton type="submit">
            Iniciar Sesión
          </AuthButton>
        </form>

        <div className="mt-6">
          <AuthFooterLink
            text="¿No tienes una cuenta?"
            linkText="Crear cuenta"
            onClick={handleRegisterClick}
          />
        </div>
      </AuthCard>
    </AuthLayout>
  );
}