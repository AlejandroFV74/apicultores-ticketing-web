const API_URL = "http://localhost:8080/api/auth";

const parseResponse = async (res) => {
  const text = await res.text();
  const body = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = body?.message || body?.error || "Credenciales inválidas";
    const error = new Error(message);
    error.status = res.status;
    error.validationErrors = body?.validationErrors;
    throw error;
  }

  return body;
};

// Login: devuelve { token, userId, fullName, email, role, message }
export const login = async ({ email, password }) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return parseResponse(res);
};
