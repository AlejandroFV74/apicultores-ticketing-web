const API_URL = "http://localhost:8080/api/events";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const parseResponse = async (res) => {
  const text = await res.text();
  const body = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = body?.message || body?.error || "Ocurrió un error inesperado";
    const error = new Error(message);
    error.status = res.status;
    error.validationErrors = body?.validationErrors;
    throw error;
  }

  return body;
};

// Obtener todos los eventos (público)
export const getEvents = async () => {
  const res = await fetch(API_URL);
  return parseResponse(res);
};

// Buscar eventos por título (público)
export const searchEvents = async (title) => {
  const res = await fetch(`${API_URL}/search?title=${encodeURIComponent(title)}`);
  return parseResponse(res);
};

// Obtener por ID (público)
export const getEventById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return parseResponse(res);
};

// Obtener eventos del organizer autenticado
export const getMyEvents = async () => {
  const res = await fetch(`${API_URL}/my-events`, {
    headers: { ...authHeaders() },
  });
  return parseResponse(res);
};

// Crear evento (requiere rol ORGANIZER)
export const createEvent = async (event) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(event),
  });
  return parseResponse(res);
};

// Actualizar evento (requiere rol ORGANIZER y ser el dueño)
export const updateEvent = async (id, event) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(event),
  });
  return parseResponse(res);
};

// Eliminar evento (requiere rol ORGANIZER y ser el dueño)
// El backend responde 204 sin body, así que no intentamos parsear JSON.
export const deleteEvent = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });

  if (!res.ok) {
    const text = await res.text();
    const body = text ? JSON.parse(text) : null;
    const error = new Error(body?.message || "Error eliminando evento");
    error.status = res.status;
    throw error;
  }

  return true;
};
