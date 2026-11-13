import { useEffect } from "react";
import { Routes, Route } from "react-router";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";
import CatchAll from "./routes/CatchAll";

import useAuth from "./context/useAuth";

function App() {
  const { isAuthenticated } = useAuth();

  // Prevent logged-out users from accessing cached protected pages
  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted && !localStorage.getItem("token")) {
        window.location.replace("/login");
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return (
    <>
      {/* Show Navbar only when logged in */}
      {isAuthenticated && <Navbar />}

      <Routes>
        {/* Routes accessible only to logged-out users */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Routes accessible only to logged-in users */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Tasks />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Handle unknown URLs */}
        <Route path="*" element={<CatchAll />} />
      </Routes>
    </>
  );
}

export default App;
