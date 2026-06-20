import { apiClient } from "../api/apiClient";


export async function getEvents(){
    const response =
    await apiClient("/events");

    return response.json();
}