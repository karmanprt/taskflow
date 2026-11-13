import { Navigate, Outlet } from "react-router";
import useAuth from "../context/useAuth";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  // Redirect logged-out users to Register
  if (!isAuthenticated) {
    return <Navigate to="/register" replace />;
  }

  // Allow authenticated users to access protected routes
  return <Outlet />;
}

export default ProtectedRoute;
