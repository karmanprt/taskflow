import { Navigate } from "react-router";
import useAuth from "../context/useAuth";
import NotFound from "../pages/NotFound";

function CatchAll() {
  const { isAuthenticated } = useAuth();

  // Logged-out users should go to Register
  if (!isAuthenticated) {
    return <Navigate to="/register" replace />;
  }

  // Logged-in users see the NotFound page
  return <NotFound />;
}

export default CatchAll;
