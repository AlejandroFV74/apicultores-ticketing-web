import { useEffect, useState } from "react";
import { getEvents } from "../services/event.service";

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getEvents();

        setEvents(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return {
    events,
    loading,
    error,
  };
}