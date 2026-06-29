import { apiClient } from "../api/apiClient";

export async function getQuote(data) {
  const response = await apiClient("/api/discounts/quote", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al calcular precio");
  }

  return response.json();
}
