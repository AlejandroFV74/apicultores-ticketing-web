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

  return response;
}