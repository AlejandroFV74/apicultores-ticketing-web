import { apiClient } from "../api/apiClient";

export async function createReservation({ eventId, seatsIds }) {
  console.log({
    eventId,
    seatsIds,
  });
  const response = await apiClient(`/reservation/generate`, {
    method: "POST",
    body: JSON.stringify({
      eventId,
      seatsIds,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Reservation creation failed");
  }

  return data?.data ?? data;
}

export async function deleteReservation(reservationId) {
  const response = await apiClient(`/reservation/${reservationId}`, {
    method: "DELETE",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Reservation deletion failed");
  }

  return data?.data ?? true;
}
