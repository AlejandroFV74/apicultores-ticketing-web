import { createContext, useContext, useState, useCallback } from "react";
import { login as loginRequest } from "../api/authService";

const AuthContext = createContext(null);

const STORAGE_KEY = "ticketdesk_session";

const loadSession = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const saveSession = (session) => {
  if (session) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    localStorage.setItem("token", session.token);
  } else {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("token");
  }
};

export function AuthProvider({ children }) {
  const [session, setSession] = useState(loadSession);

  const login = useCallback(async (email, password) => {
    const data = await loginRequest({ email, password });
    const nextSession = {
      token: data.token,
      userId: data.userId,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
    };
    saveSession(nextSession);
    setSession(nextSession);
    return nextSession;
  }, []);

  const logout = useCallback(() => {
    saveSession(null);
    setSession(null);
  }, []);

  const value = {
    session,
    isAuthenticated: !!session,
    isOrganizer: session?.role === "ORGANIZER",
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return ctx;
}
