import { useState } from "react";

import AuthLayout from "../components/AuthLayout";
import AuthCard from "../components/AuthCard";
import AuthLogo from "../components/AuthLogo";
import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import AuthButton from "../components/AuthButton";
import AuthFooterLink from "../components/AuthFooterLink";

export default function LoginPage() {
  const [form, setForm] = useState({
    usernameOrEmail: "",
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

    console.log("Login:", form);

    // Aquí llamarías a tu API
    // login(form);
  };

  const handleRegisterClick = () => {
    // navigate("/register");
  };

  const handleForgotPassword = () => {
    // navigate("/forgot-password");
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
            label="Usuario o Correo Electrónico"
            name="usernameOrEmail"
            value={form.usernameOrEmail}
            onChange={handleChange}
            placeholder="usuario o correo@ejemplo.com"
          />

          <PasswordInput
            label="Contraseña"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="********"
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="
                text-sm
                text-neon-blue
                hover:underline
              "
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

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