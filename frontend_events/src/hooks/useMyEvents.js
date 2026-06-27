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
      const data = await getMyEvents();
      setEvents(data);
    } catch (err) {
      if (err.status === 404) {
        setEvents([]);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const removeEvent = useCallback(async (id) => {
    await deleteEventRequest(id);
    setEvents((prev) => prev.filter((e) => e.eventId !== id));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { events, loading, error, reload: load, removeEvent };
}
