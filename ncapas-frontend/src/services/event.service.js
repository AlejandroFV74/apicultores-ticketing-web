import { apiClient } from "../api/apiClient";

const BASE_ENDPOINT = "/events"

export async function getEvents(){
    const response =
    await apiClient(BASE_ENDPOINT);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Error al obtener eventos");
    }

    return data?.data ?? data;
}

export async function getAllOrganizerEvents() {
  const response = await apiClient(`${BASE_ENDPOINT}/my-events`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Error al obtener tus eventos");
  return data.data || data;
}

export async function searchEvents(title) {
  const response = await apiClient(`${BASE_ENDPOINT}/search?title=${encodeURIComponent(title)}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Error al buscar eventos");
  return data.data || data;
}

export async function getEventById(id) {
  const response = await apiClient(`${BASE_ENDPOINT}/${id}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Evento no encontrado");
  return data.data || data;
}

export async function getMyEvents() {
  // Try /events/my-events first, then /event/my-events
  let response = await apiClient(`${BASE_ENDPOINT}/my-events`);
  let data = await response.json();
  
  // If not found, try singular endpoint
  if (!response.ok) {
    response = await apiClient(`/event/my-events`);
    data = await response.json();
  }
  
  if (!response.ok) throw new Error(data.message || "Error al obtener tus eventos");
  return data.data || data;
}

export async function getManageEvents() {
  const response = await apiClient(`${BASE_ENDPOINT}/manage`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Error al obtener eventos para gestionar");
  return data.data || data;
}

export async function createEvent(event) {
  const response = await apiClient(BASE_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(event),
  });
  if (!response.ok) throw new Error("Error al crear el evento");
  return response.json();
}

export async function updateEvent(id, event) {
  const response = await apiClient(`${BASE_ENDPOINT}/${id}`, {
    method: "PUT",
    body: JSON.stringify(event),
  });
  if (!response.ok) throw new Error("Error al actualizar el evento");
  return response.json();
}

export async function deleteEvent(id) {
  const response = await apiClient(`${BASE_ENDPOINT}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar el evento");
  return response.json();
}

export async function publishEvent(id) {
  const response = await apiClient(`${BASE_ENDPOINT}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status: "ACTIVE" }),
  });
  if (!response.ok) throw new Error("Error al publicar el evento");
  return response.json();
}
