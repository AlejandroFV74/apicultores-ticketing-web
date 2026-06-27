import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import EventForm from "../components/EventForm";
import { getEventById, updateEvent } from "../api/eventService";

function EditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadEvent = async () => {
    try {
      const data = await getEventById(id);
      setEvent(data);
    } catch (error) {
      setNotFound(true);
      toast.error(error.message || "No se pudo cargar el evento");
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateEvent(id, data);
      toast.success("Evento actualizado");
      navigate("/organizer");
    } catch (error) {
      toast.error(error.message || "No se pudo actualizar el evento");
    }
  };

  if (notFound) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <p className="text-ink-soft">No se encontró el evento solicitado.</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <p className="text-ink-soft">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper p-6">
      <h1 className="font-display text-4xl font-bold text-center uppercase tracking-wide text-ink mb-8">
        Editar evento
      </h1>

      <EventForm initialData={event} onSubmit={handleUpdate} submitLabel="Guardar cambios" isEditMode />
    </div>
  );
}

export default EditEventPage;
