import { apiClient } from "../api/apiClient";

// Buyer: Get my tickets
export async function getMyTickets(ownerId){
    const response =
    await apiClient(`/tickets/mytickets/${ownerId}`);
    const data =  await response.json();

    console.log(data.data)

    if(!response.ok){
        throw new Error(data.message || "Get My Tickets failed");
    }

    return data.data;
};

// Buyer: Get ticket history
export async function getMyHistoryTickets(ownerId){
    const response =
    await apiClient(`/tickets/history/${ownerId}`);
    const data =  await response.json();

    console.log(data.data)

    if(!response.ok){
        throw new Error(data.message || "Get My Tickets failed");
    }

    return data.data;
};

// Buyer: Transfer ticket
export async function transferTicket({ ticketId, toUserEmail }) {
    const response = await apiClient(`/tickets/transfer`, {
        method: "POST",
        body: JSON.stringify({
            ticketId,
            toUserEmail
        })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Ticket transfer failed");
    }

    return result;
}

// Admin: Get all tickets
export async function getAllTickets() {
    const response = await apiClient(`/tickets`);
    if (!response.ok) throw new Error("Error al obtener tickets");
    return response.json();
}

// Admin: Get tickets by owner
export async function getTicketsByOwner(ownerId) {
    const response = await apiClient(`/tickets/owner/${ownerId}`);
    if (!response.ok) throw new Error("Error al obtener tickets del usuario");
    return response.json();
}

// Admin: Refund ticket
export async function refundTicket({ ticketId, reason }) {
    const response = await apiClient(`/tickets/cancel-refund`, {
        method: "POST",
        body: JSON.stringify({
            ticketId,
            reason: reason || "Admin processed refund"
        })
    });
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Ticket refund failed");
    }

    return result;
}

// Admin/Organizer: Validate ticket
export async function validateTicket(qrCode) {
    const response = await apiClient(`/tickets/validation/${qrCode}`, {
        method: "POST",
    });
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Ticket validation failed");
    }

    return result;
}
