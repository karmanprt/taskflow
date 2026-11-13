import { Link } from "react-router";
import useAuth from "../context/useAuth";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.replace("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/10 bg-slate-950 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-3 sm:px-5">
        {/* Branding */}
        <Link
          to="/"
          className="order-1 flex min-w-0 items-center gap-2 sm:gap-3"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 text-2xl font-bold shadow-md sm:h-12 sm:w-12">
            ✓
          </div>

          <div>
            <span className="text-lg font-bold sm:text-xl">TaskFlow</span>
            <p className="text-[9px] font-medium tracking-[0.18em] text-slate-400 sm:text-[10px]">
              WORK SMARTER
            </p>
          </div>
        </Link>

        {/* Main navigation */}
        <div className="order-3 flex w-full items-center justify-center gap-3 border-t border-white/10 pt-2 sm:order-2 sm:w-auto sm:justify-center sm:gap-2 sm:border-0 sm:pt-0">
          <Link
            to="/"
            className="rounded-lg px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            Tasks
          </Link>

          <Link
            to="/dashboard"
            className="rounded-lg px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            Dashboard
          </Link>
        </div>

        {/* User and logout */}
        {isAuthenticated && (
          <div className="order-2 flex shrink-0 items-center gap-2 sm:order-3">
            <span className="hidden text-sm font-medium text-white md:block">
              Hi, {user?.name}
            </span>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/20 sm:px-4 sm:py-2.5 sm:text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
