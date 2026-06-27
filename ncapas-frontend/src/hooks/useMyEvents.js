import { useState, useCallback, useEffect } from "react";
import { getMyEvents, deleteEvent as deleteEventRequest } from "../api/eventService";

export function useMyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const responseData = await getMyEvents();
      setEvents(responseData.data || responseData); 
      
    } catch (err) {
      setError(err.message || "No se pudieron cargar tus eventos.");
    } finally {
      setLoading(false);
    }
  }, []);

  const removeEvent = useCallback(async (id) => {
    try {
      setError(null);
      await deleteEventRequest(id);
      setEvents((prev) => prev.filter((e) => e.eventId !== id));
    } catch (err) {
      setError(err.message || "No se pudo eliminar el evento.");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { events, loading, error, reload: load, removeEvent };
}