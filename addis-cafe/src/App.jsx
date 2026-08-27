import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";

const restaurantName = "Addis Café";
const examplePrice = 200;
const priceWithTax = (examplePrice * 1.15).toFixed(2);

function App() {
  return (
    <>
      <Header />

      <main>
        <p className="restaurant-name">
          Welcome to {restaurantName}
        </p>

        <p className="calculated-price">
          Example price with tax: {priceWithTax} ETB
        </p>

        <Menu />
      </main>

      <Footer />
    </>
  );
}

export default App;