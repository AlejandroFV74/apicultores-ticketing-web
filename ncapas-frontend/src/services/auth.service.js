import { apiClient } from "../api/apiClient";

export async function Login(credentials){
    const response = await apiClient("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
    })

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || "Login failed");
    }

    return data;
}

export async function Register(body){
    const response = await apiClient("/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
    })

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || "Register failed");
    }

    return data;
}

