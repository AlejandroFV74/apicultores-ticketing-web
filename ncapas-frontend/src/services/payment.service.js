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

// Create Stripe checkout session (buyer only)
export async function createStripeSession(paymentId) {
  const response = await apiClient(`/payments/checkout/${paymentId}/session`, {
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create Stripe session");
  }

  return data;
}

// Redirect to Stripe checkout URL
export function redirectToStripeCheckout(checkoutUrl) {
  // Only redirect to the Stripe URL returned in result.data.checkoutUrl
  window.location.assign(checkoutUrl);
}
