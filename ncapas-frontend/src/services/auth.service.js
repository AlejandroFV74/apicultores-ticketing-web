import { apiClient } from "../api/apiClient";

export async function Login(credentials){
    const response = await apiClient("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
    })

    console.log(response);
    if(!response.ok){
        throw new Error(response.status || "Login failed");
    }

    const data = await response.json();
    
    localStorage.setItem("token", data.token);
    const user = {
        userId: data.userId,
        fullName: data.fullName,
        email: data.email,
    }
    localStorage.setItem("user", JSON.stringify(user));

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

export function getUser(){
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

export function getToken() {
    return localStorage.getItem("token");
}

export function isAuthenticated() {
    return !!localStorage.getItem("token");
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

