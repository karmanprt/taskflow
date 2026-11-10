import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="flex items-center gap-6 border-b p-4">
      {/* Application name */}
      <Link to="/" className="text-xl font-bold hover:text-blue-600">
        TaskFlow
      </Link>

      {/* Navigation links */}
      <Link to="/" className="hover:text-blue-600">Tasks</Link>
      <Link to="/login" className="hover:text-blue-600">Login</Link>
      <Link to="/register" className="hover:text-blue-600">Register</Link>
      <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
    </nav>
  );
}

export default Navbar;
