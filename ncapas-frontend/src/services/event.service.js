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


export async function searchEvents(title) {
  const response = await apiClient(`${BASE_ENDPOINT}/search?title=${encodeURIComponent(title)}`);
  if (!response.ok) throw new Error("Error al buscar eventos");
  return response.json();
}

export async function getEventById(id) {
  const response = await apiClient(`${BASE_ENDPOINT}/${id}`);
  if (!response.ok) throw new Error("Evento no encontrado");
  return response.json();
}

export async function getMyEvents() {
  const response = await apiClient(`${BASE_ENDPOINT}/my-events`);
  if (!response.ok) throw new Error("Error al obtener tus eventos");
  return response.json();
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
  return true;
}