import { apiClient } from "../api/apiClient";

export async function createPayment(reservation_id, payload = {}) {
  const response = await apiClient(`/payments`, {
    method: "POST",
    body: JSON.stringify({
      reservation_id,
      ...payload,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Payment creation failed");
  }

  return data?.data ?? data;
}

export async function confirmCheckout(paymentId) {
  const response = await apiClient(`/checkout/${paymentId}/confirm`, {
    method: "POST",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Checkout confirmation failed");
  }

  return data?.data ?? data;
}

export function redirectToStripeCheckout(paymentId) {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  // We must not use fetch() here: backend returns an HTTP redirect.
  // Authorization header cannot be set with a browser navigation,
  // so backend should rely on cookie/session or public redirect handling.
  // If your backend requires the Authorization header, adjust accordingly.
  // For now we just navigate.
  const url = `${API_URL}/payments/checkout/${paymentId}`;

  window.location.assign(url);
}
