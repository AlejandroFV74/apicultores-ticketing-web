import { apiClient } from "../api/apiClient";

export async function getSeatsByEvent(eventId) {
  const response = await apiClient(`/seats/event/${eventId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Get seats failed");
  }

  return data.data ?? data;
}

