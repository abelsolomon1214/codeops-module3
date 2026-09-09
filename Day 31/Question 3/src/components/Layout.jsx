import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header className="header">
        <h1>Addis Eats</h1>
      </header>

      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/cart">Cart</Link>
      </nav>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2026 Addis Eats</p>
      </footer>
    </>
  );
}

export default Layout;