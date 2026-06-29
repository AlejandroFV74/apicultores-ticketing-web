import { apiClient } from "../api/apiClient";

const BASE_ENDPOINT = "/seats";

// Public: Get seats for an event (for buyer seat map)
export async function getSeatsByEvent(eventId) {
    const response = await apiClient(`${BASE_ENDPOINT}/event/${eventId}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Error al obtener asientos");
    return data.data || data;
}

// Admin: Get all seats
export async function getAllSeats() {
    const response = await apiClient(BASE_ENDPOINT);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Error al obtener asientos");
    return data.data || data;
}

// Admin: Create seat
export async function createSeat(seat) {
    const response = await apiClient(BASE_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(seat),
    });
    if (!response.ok) throw new Error("Error al crear asiento");
    return response.json();
}

// Admin: Update seat
export async function updateSeat(seatId, seat) {
    const response = await apiClient(`${BASE_ENDPOINT}/${seatId}`, {
        method: "PUT",
        body: JSON.stringify(seat),
    });
    if (!response.ok) throw new Error("Error al actualizar asiento");
    return response.json();
}

// Admin: Delete seat
export async function deleteSeat(seatId) {
    const response = await apiClient(`${BASE_ENDPOINT}/${seatId}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar asiento");
    return response.json();
}
