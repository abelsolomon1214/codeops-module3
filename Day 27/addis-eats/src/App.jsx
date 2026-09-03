import Menu from "./Menu";

function App() {
  return (
    <>
      <header className="header">
        <h1>Addis Eats</h1>
        <p>Fresh Ethiopian Food & Coffee</p>
      </header>

      <main>
        <p className="restaurant-name">
          Welcome to Addis Eats
        </p>

        <p className="calculated-price">
          Authentic Ethiopian dishes made with local flavors.
        </p>

        <Menu category="Main" />
      </main>

      <footer className="footer">
        <p>© 2026 Addis Eats</p>
        <p>📍 Addis Ababa, Ethiopia</p>
      </footer>
    </>
  );
}

export default App;