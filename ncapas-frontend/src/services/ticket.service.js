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

export async function validateTicket(qrCode){
    const response = await apiClient(`/tickets/validation/${encodeURIComponent(qrCode)}`,{
        method: "POST"
    });
    const data = await response.json();
    console.log(data.data)

    if(!response.ok){
        throw new Error(data.message || "Validate tickets failed");
    }

    return data.data;
}
