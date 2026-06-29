import { data } from "react-router-dom";
import { apiClient } from "../api/apiClient";


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
