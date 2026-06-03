import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const auth = useAuth();

  console.log("AUTH CONTEXT:", auth);

  const { user } = auth || {};

  console.log("USER:", user);

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;