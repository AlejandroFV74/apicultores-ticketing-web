const API_URL = import.meta.env.VITE_API_URL;

export async function apiClient(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token && token !== "undefined" && token !== "null") {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: headers,
  });

  if(response.status == 401){
    console.warn("La sesión ha expirado o el token es inválido. Limpiando almacenamiento local...");
    
    
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    window.location.href = "/login";
    
    throw new Error("Sesión expirada. Redirigiendo al login...");
  }

  return response;
}