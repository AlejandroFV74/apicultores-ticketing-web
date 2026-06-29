import { useState } from "react";

const formatDateForInput = (date) => {
  if (!date) return "";
  return date.slice(0, 16);
};

export default function EventForm({
  onSubmit,
  initialData = {},
  submitLabel = "Guardar evento",
  isEditMode = false,
  isSubmitting = false,
}) {
  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    venue: initialData.venue || "",
    startDate: formatDateForInput(initialData.startDate),
    endDate: formatDateForInput(initialData.endDate),
    status: initialData.status || "DRAFT",
    maxTicketsPerUser: initialData.maxTicketsPerUser || 5,
  });

  const [seats, setSeats] = useState({
    VIP: { price: 25, quantity: 10 },
    GENERAL: { price: 10, quantity: 50 },
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "maxTicketsPerUser" ? Number(value) : value,
    }));
  };

  const handleSeatChange = (type, field, value) => {
    setSeats((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: Number(value) },
    }));
  };

  const validate = () => {
    const next = {};

    if (!form.title.trim()) next.title = "El título es requerido";
    if (!form.venue.trim()) next.venue = "El lugar es requerido";
    if (!form.startDate) next.startDate = "La fecha de inicio es requerida";
    if (!form.endDate) next.endDate = "La fecha de fin es requerida";

    if (
      form.startDate &&
      form.endDate &&
      new Date(form.startDate) >= new Date(form.endDate)
    ) {
      next.endDate = "Debe ser posterior a la fecha de inicio";
    }

    if (!isEditMode && seats.VIP.quantity <= 0 && seats.GENERAL.quantity <= 0) {
      next.seats = "Debe haber al menos un asiento configurado";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      startDate: form.startDate,
      endDate: form.endDate,
    };

    if (!isEditMode) {
      payload.seats = Object.entries(seats)
        .filter(([, config]) => config.quantity > 0)
        .map(([seatType, config]) => ({
          seatType,
          price: config.price,
          quantity: config.quantity,
        }));
    }

    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card mx-auto max-w-3xl space-y-6 p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold text-foreground">
        Datos del evento
      </h2>

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground/70">
          Título
        </label>
        <input
          name="title"
          placeholder="Título del evento"
          onChange={handleChange}
          value={form.title}
          className="w-full rounded-lg border border-neon-blue/20 bg-background/70 p-3 text-foreground outline-none transition focus:border-neon-blue/60 focus:ring-2 focus:ring-neon-blue/20"
        />
        {errors.title ? (
          <p className="mt-2 text-xs text-destructive">{errors.title}</p>
        ) : null}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground/70">
          Lugar
        </label>
        <input
          name="venue"
          placeholder="Lugar"
          onChange={handleChange}
          value={form.venue}
          className="w-full rounded-lg border border-neon-blue/20 bg-background/70 p-3 text-foreground outline-none transition focus:border-neon-blue/60 focus:ring-2 focus:ring-neon-blue/20"
        />
        {errors.venue ? (
          <p className="mt-2 text-xs text-destructive">{errors.venue}</p>
        ) : null}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground/70">
          Descripción
        </label>
        <textarea
          name="description"
          placeholder="Descripción"
          onChange={handleChange}
          value={form.description}
          rows={4}
          className="w-full resize-none rounded-lg border border-neon-blue/20 bg-background/70 p-3 text-foreground outline-none transition focus:border-neon-blue/60 focus:ring-2 focus:ring-neon-blue/20"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground/70">
            Inicio
          </label>
          <input
            type="datetime-local"
            name="startDate"
            onChange={handleChange}
            value={form.startDate}
            className="w-full rounded-lg border border-neon-blue/20 bg-background/70 p-3 text-foreground outline-none transition focus:border-neon-blue/60 focus:ring-2 focus:ring-neon-blue/20"
          />
          {errors.startDate ? (
            <p className="mt-2 text-xs text-destructive">{errors.startDate}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground/70">
            Fin
          </label>
          <input
            type="datetime-local"
            name="endDate"
            onChange={handleChange}
            value={form.endDate}
            className="w-full rounded-lg border border-neon-blue/20 bg-background/70 p-3 text-foreground outline-none transition focus:border-neon-blue/60 focus:ring-2 focus:ring-neon-blue/20"
          />
          {errors.endDate ? (
            <p className="mt-2 text-xs text-destructive">{errors.endDate}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground/70">
            Estado
          </label>
          <select
            name="status"
            onChange={handleChange}
            value={form.status}
            className="w-full rounded-lg border border-neon-blue/20 bg-background/70 p-3 text-foreground outline-none transition focus:border-neon-blue/60 focus:ring-2 focus:ring-neon-blue/20"
          >
            <option value="DRAFT">Borrador</option>
            <option value="ACTIVE">Activo</option>
            <option value="CANCELLED">Cancelado</option>
            <option value="FINISHED">Finalizado</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground/70">
            Máximo de boletos por persona
          </label>
          <input
            type="number"
            name="maxTicketsPerUser"
            min="1"
            onChange={handleChange}
            value={form.maxTicketsPerUser}
            className="w-full rounded-lg border border-neon-blue/20 bg-background/70 p-3 text-foreground outline-none transition focus:border-neon-blue/60 focus:ring-2 focus:ring-neon-blue/20"
          />
        </div>
      </div>

      {!isEditMode ? (
        <div className="border-t border-neon-blue/20 pt-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground/60">
            Configuración de asientos
          </h3>

          {errors.seats ? (
            <p className="mb-2 text-xs text-destructive">{errors.seats}</p>
          ) : null}

          <div className="space-y-3">
            {["VIP", "GENERAL"].map((type) => (
              <div
                key={type}
                className="grid gap-3 rounded-lg border border-neon-purple/20 bg-muted/20 p-4 md:grid-cols-[90px_1fr_1fr] md:items-end"
              >
                <span className="text-sm font-semibold uppercase text-neon-purple">
                  {type}
                </span>
                <div>
                  <label className="mb-1 block text-xs text-foreground/60">
                    Precio
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={seats[type].price}
                    onChange={(event) =>
                      handleSeatChange(type, "price", event.target.value)
                    }
                    className="w-full rounded-lg border border-neon-blue/20 bg-background/70 p-2 text-sm text-foreground outline-none focus:border-neon-blue/60"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-foreground/60">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={seats[type].quantity}
                    onChange={(event) =>
                      handleSeatChange(type, "quantity", event.target.value)
                    }
                    className="w-full rounded-lg border border-neon-blue/20 bg-background/70 p-2 text-sm text-foreground outline-none focus:border-neon-blue/60"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}
