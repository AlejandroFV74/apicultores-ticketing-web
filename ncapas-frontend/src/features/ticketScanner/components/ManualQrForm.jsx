import { useState } from "react";

export default function ManualQrForm({ onSubmit, disabled = false }) {
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const qrCode = value.trim();

    if (!qrCode) return;
    onSubmit(qrCode);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="block text-sm font-medium text-foreground/70">
        Código QR
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Pega o escribe el valor del QR"
          className="min-w-0 flex-1 rounded-lg border border-neon-blue/20 bg-background/70 p-3 text-foreground outline-none transition focus:border-neon-blue/60 focus:ring-2 focus:ring-neon-blue/20"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple px-5 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Validar
        </button>
      </div>
    </form>
  );
}
