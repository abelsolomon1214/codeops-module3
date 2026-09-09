import { NavLink, Outlet } from "react-router-dom";

function Layout() {
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