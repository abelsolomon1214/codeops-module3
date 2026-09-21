import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useTheme } from "../context/useTheme";

function Layout() {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const getNavClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <NavLink to="/" className="logo">
            Addis Eats
          </NavLink>

          <nav className="nav">
            <NavLink to="/" className={getNavClass} end>
              Home
            </NavLink>

            <NavLink to="/menu" className={getNavClass}>
              Menu
            </NavLink>

            <NavLink to="/cart" className={getNavClass}>
              Cart
            </NavLink>

            <NavLink to="/checkout" className={getNavClass}>
              Checkout
            </NavLink>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
              } theme`}
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>

            {isAuthenticated && (
              <button
                type="button"
                className="logout-button"
                onClick={logout}
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2026 Addis Eats. Taste Ethiopia.</p>
      </footer>
    </>
  );
}

export default Layout;