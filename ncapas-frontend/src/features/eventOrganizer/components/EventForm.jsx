import { useState } from "react";

const formatDateForInput = (date) => {
  if (!date) return "";
  return date.slice(0, 16);
};

function EventForm({ onSubmit, initialData = {}, submitLabel = "Guardar evento", isEditMode = false }) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
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

    if (form.startDate && form.endDate && new Date(form.startDate) >= new Date(form.endDate)) {
      next.endDate = "Debe ser posterior a la fecha de inicio";
    }

    if (seats.VIP.quantity <= 0 && seats.GENERAL.quantity <= 0) {
      next.seats = "Debe haber al menos un asiento configurado";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const seatConfigurations = Object.entries(seats)
      .filter(([, config]) => config.quantity > 0)
      .map(([seatType, config]) => ({
        seatType,
        price: config.price,
        quantity: config.quantity,
      }));

    const payload = {
      ...form,
      startDate: form.startDate,
      endDate: form.endDate,
    };

    // En edición no se envían seats: el backend no soporta reconfigurar asientos al actualizar.
    if (!isEditMode) {
      payload.seats = seatConfigurations;
    }

    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-xl border border-ink/10 shadow-sm space-y-5"
    >
      <h2 className="font-display text-2xl font-semibold text-center uppercase tracking-wide text-ink">
        Datos del evento
      </h2>

      <div>
        <input
          name="title"
          placeholder="Título del evento"
          onChange={handleChange}
          value={form.title}
          className="w-full border border-ink/20 p-2 rounded focus:outline-none focus:ring-2 focus:ring-stub/50"
        />
        {errors.title && <p className="text-stamp-red text-xs mt-1">{errors.title}</p>}
      </div>

      <div>
        <input
          name="venue"
          placeholder="Lugar"
          onChange={handleChange}
          value={form.venue}
          className="w-full border border-ink/20 p-2 rounded focus:outline-none focus:ring-2 focus:ring-stub/50"
        />
        {errors.venue && <p className="text-stamp-red text-xs mt-1">{errors.venue}</p>}
      </div>

      <textarea
        name="description"
        placeholder="Descripción"
        onChange={handleChange}
        value={form.description}
        rows={3}
        className="w-full border border-ink/20 p-2 rounded focus:outline-none focus:ring-2 focus:ring-stub/50"
      />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium uppercase tracking-wide text-ink-soft mb-1">
            Inicio
          </label>
          <input
            type="datetime-local"
            name="startDate"
            onChange={handleChange}
            value={form.startDate}
            className="w-full border border-ink/20 p-2 rounded"
          />
          {errors.startDate && <p className="text-stamp-red text-xs mt-1">{errors.startDate}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wide text-ink-soft mb-1">
            Fin
          </label>
          <input
            type="datetime-local"
            name="endDate"
            onChange={handleChange}
            value={form.endDate}
            className="w-full border border-ink/20 p-2 rounded"
          />
          {errors.endDate && <p className="text-stamp-red text-xs mt-1">{errors.endDate}</p>}
        </div>
      </div>

      <select
        name="status"
        onChange={handleChange}
        value={form.status}
        className="w-full border border-ink/20 p-2 rounded"
      >
        <option value="DRAFT">Borrador</option>
        <option value="ACTIVE">Activo</option>
        <option value="CANCELLED">Cancelado</option>
        <option value="FINISHED">Finalizado</option>
      </select>

      <div>
        <label className="block text-xs font-medium uppercase tracking-wide text-ink-soft mb-1">
          Máximo de boletos por persona
        </label>
        <input
          type="number"
          name="maxTicketsPerUser"
          min="1"
          onChange={handleChange}
          value={form.maxTicketsPerUser}
          className="w-full border border-ink/20 p-2 rounded"
        />
      </div>

      {!isEditMode && (
        <div className="border-t border-dashed border-ink/20 pt-4">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink-soft mb-3">
            Configuración de asientos
          </h3>

          {errors.seats && <p className="text-stamp-red text-xs mb-2">{errors.seats}</p>}

          <div className="space-y-3">
            {["VIP", "GENERAL"].map((type) => (
              <div key={type} className="flex items-center gap-3 bg-paper-dark/40 p-3 rounded">
                <span className="font-semibold text-sm w-16 uppercase text-ink-soft">{type}</span>
                <div className="flex-1">
                  <label className="block text-xs text-ink-soft/70 mb-1">Precio</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={seats[type].price}
                    onChange={(e) => handleSeatChange(type, "price", e.target.value)}
                    className="w-full border border-ink/20 p-1.5 rounded text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-ink-soft/70 mb-1">Cantidad</label>
                  <input
                    type="number"
                    min="0"
                    value={seats[type].quantity}
                    onChange={(e) => handleSeatChange(type, "quantity", e.target.value)}
                    className="w-full border border-ink/20 p-1.5 rounded text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-stub hover:bg-stub-dark text-white py-2.5 rounded font-display font-semibold uppercase tracking-wide transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  );
}

export default EventForm;