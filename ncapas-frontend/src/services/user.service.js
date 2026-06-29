import { apiClient } from "../api/apiClient";

const BASE_ENDPOINT = "/users";

export async function getAllUsers() {
  const response = await apiClient(BASE_ENDPOINT);
  if (!response.ok) throw new Error("Error al obtener usuarios");
  return response.json();
}

export async function getUserById(userId) {
  const response = await apiClient(`${BASE_ENDPOINT}/${userId}`);
  if (!response.ok) throw new Error("Usuario no encontrado");
  return response.json();
}

export async function deleteUser(userId) {
  const response = await apiClient(`${BASE_ENDPOINT}/${userId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar usuario");
  return true;
}

export async function updateUser(userId, data) {
  const response = await apiClient(`${BASE_ENDPOINT}/${userId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al actualizar usuario");
  }
  return response.json();
}

export async function updateUserRole(userId, data) {
  const response = await apiClient(`${BASE_ENDPOINT}/role/${userId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al actualizar rol");
  }
  return response.json();
}

export async function enableUser(userId) {
  const response = await apiClient(`${BASE_ENDPOINT}/enable/${userId}`, {
    method: "PUT",
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al habilitar usuario");
  }
  return response.json();
}

export async function disableUser(userId) {
  const response = await apiClient(`${BASE_ENDPOINT}/disable/${userId}`, {
    method: "PUT",
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al deshabilitar usuario");
  }
  return response.json();
}