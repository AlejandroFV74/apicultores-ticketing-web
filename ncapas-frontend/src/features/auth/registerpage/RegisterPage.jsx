import { useState } from "react";

import AuthLayout from "../components/AuthLayout";
import AuthCard from "../components/AuthCard";
import AuthLogo from "../components/AuthLogo";
import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import AuthButton from "../components/AuthButton";
import AuthFooterLink from "../components/AuthFooterLink";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    console.log(form);
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthLogo
          subtitle="Crea tu cuenta para comenzar"
        />

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <AuthInput
            label="Usuario"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="diego123"
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

          <AuthButton>
            Crear Cuenta
          </AuthButton>
        </form>

        <div className="mt-6">
          <AuthFooterLink
            text="¿Ya tienes cuenta?"
            linkText="Iniciar sesión"
          />
        </div>
      </AuthCard>
    </AuthLayout>
  );
}