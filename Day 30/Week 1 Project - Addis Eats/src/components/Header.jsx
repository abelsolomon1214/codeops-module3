import CartBadge from "./CartBadge";

export default function Header() {
  function scrollToMenu() {
    document
      .getElementById("menu")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <button
          className="brand-button"
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <span className="brand-mark">AE</span>

          <span>
            <strong>Addis Eats</strong>
            <small>Ethiopian kitchen</small>
          </span>
        </button>

        <nav className="main-nav">
          <button type="button" onClick={scrollToMenu}>
            Menu
          </button>

          <button type="button" onClick={scrollToMenu}>
            Our story
          </button>
        </nav>

        <CartBadge />
      </div>
    </header>
  );
}