import { useState } from "react";

export default function PasswordInput({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>

      <div className="relative">
        <input
          type={
            showPassword
              ? "text"
              : "password"
          }
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
            w-full
            px-4
            py-3
            rounded-lg
            bg-background/50
            border
            border-border
            outline-none
            focus:border-neon-blue
            transition-colors
          "
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword((prev) => !prev)
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-foreground/60"
        >
          {showPassword
            ? "Ocultar"
            : "Mostrar"}
        </button>
      </div>
    </div>
  );
}