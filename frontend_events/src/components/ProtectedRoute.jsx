import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isOrganizer } = useAuth();

  if (!isAuthenticated || !isOrganizer) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
