import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import EventForm from "../components/EventForm";
import { createEvent } from "../api/eventService";

function CreateEventPage() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      await createEvent(data);
      toast.success("Evento creado");
      navigate("/organizer");
    } catch (error) {
      toast.error(error.message || "No se pudo crear el evento");
    }
  };

  return (
    <div className="min-h-screen bg-paper p-6">
      <h1 className="font-display text-4xl font-bold text-center uppercase tracking-wide text-ink mb-8">
        Crear evento
      </h1>

      <EventForm onSubmit={handleCreate} submitLabel="Crear evento" />
    </div>
  );
}

export default CreateEventPage;
