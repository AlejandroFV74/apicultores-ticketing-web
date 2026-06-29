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
        userId: data.userId || data.user?.userId || data.user?.id,
        fullName: data.fullName || data.user?.fullName || data.user?.name,
        email: data.email || data.user?.email,
        role:
            data.role ||
            data.userRole ||
            data.roleName ||
            data.type ||
            data.user?.role ||
            data.user?.userRole ||
            data.user?.roleName,
        roles: data.roles || data.authorities || data.user?.roles || data.user?.authorities || [],
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
    if (!user) return null;

    try {
        return JSON.parse(user);
    } catch {
        return null;
    }
}

export function getToken() {
    return localStorage.getItem("token");
}

export function isAuthenticated() {
    return !!localStorage.getItem("token");
}

export function isOrganizer() {
    const user = getUser();
    if (!user) return false;

    const roles = [
        user.role,
        user.userRole,
        user.roleName,
        ...(Array.isArray(user.roles) ? user.roles : []),
    ]
        .filter(Boolean)
        .map((role) =>
            typeof role === "string"
                ? role
                : role.name || role.authority || role.role
        )
        .filter(Boolean)
        .map((role) => role.toUpperCase());

    return roles.some(
        (role) =>
            role.includes("ORGANIZER") ||
            role.includes("ORGANIZADOR") ||
            role.includes("ADMIN")
    );
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export function isAdmin() {
    const user = getUser();
    if (!user) return false;

    const roles = [
        user.role,
        user.userRole,
        user.roleName,
        ...(Array.isArray(user.roles) ? user.roles : []),
    ]
        .filter(Boolean)
        .map((role) =>
            typeof role === "string"
                ? role
                : role.name || role.authority || role.role
        )
        .filter(Boolean)
        .map((role) => role.toUpperCase());

    return roles.some((role) => role.includes("ADMIN"));
}

export function updateUser(userData) {
    const currentUser = getUser();
    if (!currentUser) {
        localStorage.setItem("user", JSON.stringify(userData));
        return;
    }

    const updatedUser = {
        ...currentUser,
        ...userData,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
}

export function getUserRole() {
    const user = getUser();
    return user?.role || user?.userRole || user?.roleName || null;
}

export function hasRole(roleNames) {
    const user = getUser();
    if (!user) return false;

    const roles = [
        user.role,
        user.userRole,
        user.roleName,
        ...(Array.isArray(user.roles) ? user.roles : []),
    ]
        .filter(Boolean)
        .map((r) => (typeof r === "string" ? r : r.name || r.authority || r.role))
        .filter(Boolean)
        .map((r) => r.toUpperCase());

    const rolesToCheck = Array.isArray(roleNames) ? roleNames : [roleNames];
    const normalizedRolesToCheck = rolesToCheck.map((r) => r.toUpperCase());

    return roles.some((role) => normalizedRolesToCheck.includes(role));
}
