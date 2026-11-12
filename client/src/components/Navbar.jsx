import { Link, useLocation } from "react-router";
import useAuth from "../context/useAuth";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Check which authentication page is currently open
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/10 bg-slate-950 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3">
        {/* Branding */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 text-2xl font-bold shadow-md">
            ✓
          </div>

          <div>
            <span className="text-xl font-bold">TaskFlow</span>
            <p className="text-[10px] font-medium tracking-[0.18em] text-slate-400">
              WORK SMARTER
            </p>
          </div>
        </Link>

        {/* Main navigation */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            Tasks
          </Link>

          <Link
            to="/dashboard"
            className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            Dashboard
          </Link>
        </div>

        {/* Authentication navigation */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden text-sm font-medium text-white sm:block">
                Hi, {user?.name}
              </span>

              <button
                type="button"
                onClick={logout}
                className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
              >
                Logout
              </button>
            </>
          ) : isLoginPage ? (
            <Link
              to="/register"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Get Started
            </Link>
          ) : isRegisterPage ? (
            <Link
              to="/login"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-2 text-sm text-slate-300 hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
