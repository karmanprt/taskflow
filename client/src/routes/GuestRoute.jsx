import { Navigate, Outlet } from "react-router";
import useAuth from "../context/useAuth";

function GuestRoute() {
  const { isAuthenticated } = useAuth();

  // Redirect logged-in users to the Tasks page
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Allow logged-out users to access guest routes
  return <Outlet />;
}

export default GuestRoute;
