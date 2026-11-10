import { Routes, Route } from "react-router";

// Import all page components
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar/>
      
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Tasks />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Register page */}
        <Route path="/register" element={<Register />} />

        {/* Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Handle unknown URLs */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
