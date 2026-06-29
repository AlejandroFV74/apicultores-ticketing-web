import { useState, useEffect } from 'react';
import { getEvents, getMyEvents, deleteEvent } from '../services/event.service';
import { isAdmin } from '../services/auth.service';

export function useEvents(adminMode = false) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = adminMode ? await getEvents() : await getMyEvents();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents(prev => prev.filter(e => (e.eventId ?? e.id) !== eventId));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [adminMode]);

  return { events, loading, error, removeEvent, reload: loadEvents };
}