import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Menu from "./components/Menu";

export default function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="hero-label">
              Authentic Ethiopian cuisine
            </span>

            <h1>
              A taste of
              <br />
              <em>Addis Ababa.</em>
            </h1>

            <p>
              Traditional flavors, fresh ingredients,
              and dishes made with the warmth of
              Ethiopian hospitality.
            </p>

            <a href="#menu" className="hero-button">
              Explore the menu
              <span>↓</span>
            </a>
          </div>

          <div className="hero-decoration">
            <span>በላ</span>
          </div>
        </section>

        <div className="main-content">
          <Menu />
          <Checkout />
        </div>
      </main>

      <footer className="site-footer">
        <div>
          <strong>Addis Eats</strong>
          <span>
            Authentic Ethiopian flavors, made with
            care.
          </span>
        </div>

        <span>
          © 2026 Addis Eats
        </span>
      </footer>
    </div>
  );
}