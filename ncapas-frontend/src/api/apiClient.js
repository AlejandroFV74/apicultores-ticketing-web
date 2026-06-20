const API_URL =
  import.meta.env.VITE_API_URL;

export async function apiClient(
  endpoint,
  options = {}
) {
  const token =
    localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type":
          "application/json",
        Authorization: token
          ? `Bearer ${token}`
          : "",
        ...options.headers,
      },
    }
  );

  return response;
}