import Menu from "./Menu";
import OrderForm from "./OrderForm";

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
          Choose your favorite dishes and place your delivery order.
        </p>

        <Menu />

        <OrderForm />
      </main>

      <footer className="footer">
        <p>© 2026 Addis Eats</p>
        <p>📍 Addis Ababa, Ethiopia</p>
      </footer>
    </>
  );
}

export default App;