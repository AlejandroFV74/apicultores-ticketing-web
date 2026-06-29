import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../landingPage/components/Header";
import Footer from "../landingPage/components/Footer";
import { getManageEvents, deleteEvent, publishEvent, createEvent, updateEvent } from "../../services/event.service";
import { isAdmin, getOrganizers } from "../../services/auth.service";



export default function AdminEventsPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [organizers, setOrganizers] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    venue: "",
    startDate: "",
    endDate: "",
    maxTicketsPerUser: 5,
    organizerId: "",
    vipSeats: 100,
    vipPrice: 50,
    generalSeats: 460,
    generalPrice: 20,
  });

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getManageEvents();
      setEvents(data.data || data);
    } catch (err) {
      setError(err.message || "Error al cargar eventos");
    } finally {
      setLoading(false);
    }
  };
  const loadOrganizers = async () => {
    try {
      const data = await getOrganizers();
      setOrganizers(data.data || data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/");
      return;
    }
    loadEvents();
  }, [navigate]);


  const handleDelete = async (event) => {
    const confirmed = window.confirm(
      `¿Estás seguro de cancelar el evento "${event.title}"?`
    );
    if (!confirmed) return;

    try {
      await deleteEvent(event.eventId || event.id);
      await loadEvents();
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePublish = async (event) => {
    try {
      await publishEvent(event.eventId || event.id);
      await loadEvents();
    } catch (err) {
      alert(err.message);
    }
  };

  const openCreateModal = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      description: "",
      venue: "",
      startDate: "",
      endDate: "",
      maxTicketsPerUser: 5,
      organizerId: "",
      vipSeats: 100,
      vipPrice: 50,
      generalSeats: 460,
      generalPrice: 20,
    });
    setShowCreateModal(true);
    loadOrganizers();
  };

  const openEditModal = async (event) => {
    await loadOrganizers();
    setEditingEvent(event);
    setFormData({
      title: event.title || "",
      description: event.description || "",
      venue: event.venue || "",
      startDate: event.startDate ? event.startDate.slice(0, 16) : "",
      endDate: event.endDate ? event.endDate.slice(0, 16) : "",
      maxTicketsPerUser: event.maxTicketsPerUser || 5,
      organizerId: event.organizerId || "",
      vipSeats: 100,
      vipPrice: 50,
      generalSeats: 460,
      generalPrice: 20,
    });
    setShowCreateModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const totalSeats = formData.vipSeats + formData.generalSeats;
      if (totalSeats !== 560) {
        alert(`La suma de asientos debe ser 560 (VIP + GENERAL), actualmente: ${totalSeats}`);
        setIsSubmitting(false);
        return;
      }

      if (formData.vipPrice <= 0 || formData.generalPrice <= 0) {
        alert("Los precios deben ser mayores que 0");
        setIsSubmitting(false);
      if (!editingEvent && !formData.organizerId) {
        alert("Debes seleccionar un organizador");
        setIsSubmitting(false);
        return;
      }
        return;
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        venue: formData.venue,
        startDate: formData.startDate,
        endDate: formData.endDate,
        maxTicketsPerUser: formData.maxTicketsPerUser,
        organizerId: formData.organizerId,
        seatingConfig: {
          vipSeats: formData.vipSeats,
          vipPrice: formData.vipPrice,
          generalSeats: formData.generalSeats,
          generalPrice: formData.generalPrice,
        },
      };

      if (editingEvent) {
        const eventId = editingEvent.eventId || editingEvent.id;
        await updateEvent(eventId, payload);
      } else {
        await createEvent(payload);
      }

      setShowCreateModal(false);
      await loadEvents();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString("es-SV", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const colors = {
      DRAFT: "bg-gray-500/20 text-gray-400 border-gray-500/40",
      ACTIVE: "bg-green-500/20 text-green-400 border-green-500/40",
      CANCELLED: "bg-red-500/20 text-red-400 border-red-500/40",
      FINISHED: "bg-blue-500/20 text-blue-400 border-blue-500/40",
    };
    return colors[status] || colors.DRAFT;
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <section className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-neon-blue">
              Administrador
            </p>
            <h1 className="mb-4 text-4xl font-black text-white md:text-5xl">
              Gestionar Eventos
            </h1>
            <p className="text-foreground/60">
              Crea, modifica y administra todos los eventos del sistema.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple px-5 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/50"
          >
            Crear evento
          </button>
        </section>

        {loading ? (
          <div className="glass-card p-8 text-center text-foreground/70">
            Cargando eventos...
          </div>
        ) : error ? (
          <div className="glass-card p-8 text-center text-destructive">
            {error}
          </div>
        ) : events.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <h2 className="mb-2 text-2xl font-bold">
              No hay eventos
            </h2>
            <p className="text-foreground/60">
              Crea tu primer evento.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-4 pr-4 text-sm font-medium text-foreground/60">Título</th>
                  <th className="pb-4 pr-4 text-sm font-medium text-foreground/60">Lugar</th>
                  <th className="pb-4 pr-4 text-sm font-medium text-foreground/60">Inicio</th>
                  <th className="pb-4 pr-4 text-sm font-medium text-foreground/60">Estado</th>
                  <th className="pb-4 text-sm font-medium text-foreground/60">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.eventId || event.id} className="border-b border-border/50">
                    <td className="py-4 pr-4 font-medium">{event.title}</td>
                    <td className="py-4 pr-4 text-foreground/70">{event.venue}</td>
                    <td className="py-4 pr-4 text-foreground/70">{formatDate(event.startDate)}</td>
                    <td className="py-4 pr-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(event.status)}`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(event)}
                          className="px-3 py-1 text-sm text-neon-blue hover:underline"
                        >
                          Editar
                        </button>
                        {event.status === "DRAFT" && (
                          <button
                            onClick={() => handlePublish(event)}
                            className="px-3 py-1 text-sm text-green-400 hover:underline"
                          >
                            Publicar
                          </button>
                        )}
                        {event.status !== "CANCELLED" && (
                          <button
                            onClick={() => handleDelete(event)}
                            className="px-3 py-1 text-sm text-red-400 hover:underline"
                          >
                            Cancelar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />


      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6">
              {editingEvent ? "Editar Evento" : "Crear Evento"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border outline-none focus:border-neon-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Lugar *</label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border outline-none focus:border-neon-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border outline-none focus:border-neon-blue resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Inicio *</label>
                  <input
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border outline-none focus:border-neon-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Fin *</label>
                  <input
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border outline-none focus:border-neon-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                <div>
                  <label className="block text-sm font-medium mb-2">Organizador *</label>
                  <select
                    value={formData.organizerId}
                    onChange={(e) => setFormData({ ...formData, organizerId: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border outline-none focus:border-neon-blue"
                  >
                    <option value="">Selecciona un organizador</option>
                    {organizers.map((org) => (
                      <option key={org.userId} value={org.userId}>
                        {org.fullName || org.email}
                      </option>
                    ))}
                  </select>
                </div>
                  <label className="block text-sm font-medium mb-2">Max Tickets por Usuario</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.maxTicketsPerUser}
                    onChange={(e) => setFormData({ ...formData, maxTicketsPerUser: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border outline-none focus:border-neon-blue"
                  />
                </div>
                {editingEvent && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Organizer ID</label>
                    <input
                      type="text"
                      value={formData.organizerId}
                      onChange={(e) => setFormData({ ...formData, organizerId: e.target.value })}
                      placeholder="UUID del organizador"
                      className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border outline-none focus:border-neon-blue"
                    />
                  </div>
                )}
              </div>

              {!editingEvent && (
                <div className="border-t border-border pt-4">
                  <h3 className="text-sm font-semibold mb-3">Configuración de Asientos</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-foreground/60 mb-1">VIP Asientos</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.vipSeats}
                        onChange={(e) => setFormData({ ...formData, vipSeats: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 rounded-lg bg-background/50 border border-border outline-none focus:border-neon-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-foreground/60 mb-1">VIP Precio</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.vipPrice}
                        onChange={(e) => setFormData({ ...formData, vipPrice: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 rounded-lg bg-background/50 border border-border outline-none focus:border-neon-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-foreground/60 mb-1">General Asientos</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.generalSeats}
                        onChange={(e) => setFormData({ ...formData, generalSeats: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 rounded-lg bg-background/50 border border-border outline-none focus:border-neon-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-foreground/60 mb-1">General Precio</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.generalPrice}
                        onChange={(e) => setFormData({ ...formData, generalPrice: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 rounded-lg bg-background/50 border border-border outline-none focus:border-neon-blue"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-foreground/60 mt-2">
                    Total: {formData.vipSeats + formData.generalSeats} asientos (debe ser 560)
                  </p>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 rounded-lg font-semibold border border-border hover:bg-white/10"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? "Guardando..." : editingEvent ? "Guardar Cambios" : "Crear Evento"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
