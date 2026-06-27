import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import EventForm from "../components/EventForm";
import { createEvent } from "../api/eventService";

function CreateEventPage() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      const response = await createEvent(data);
      const successMessage = response?.message || "Evento creado con éxito";
      toast.success(successMessage);
      
      navigate("/organizer");
    } catch (error) {
      console.error("Error al crear evento:", error);
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