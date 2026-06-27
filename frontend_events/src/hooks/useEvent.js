import { useState, useCallback, useEffect } from "react";
import { getEvents, searchEvents } from "../api/eventService";

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async (title) => {
    setLoading(true);
    setError(null);
    try {
      const data = title ? await searchEvents(title) : await getEvents();
      setEvents(data);
    } catch (err) {
      // El backend responde 404 cuando no hay resultados; lo tratamos como lista vacía.
      if (err.status === 404) {
        setEvents([]);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { events, loading, error, reload: load };
}
