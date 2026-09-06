import { useContext } from "react";
import CartContext from "./CartContext";
import CartProvider from "./CartProvider";
import "./App.css";

function Cart() {
  const { items, dispatch, total } = useContext(CartContext);

  return (
    <section>
      <h2>Cart</h2>

      {items.map((item) => (
        <article className="cart-item" key={item.id}>
          <span>
            {item.name} - {item.price} ETB
          </span>

          <button
            onClick={() => dispatch({ type: "remove", id: item.id })}
          >
            Remove
          </button>
        </article>
      ))}

      <h3>Total: {total} ETB</h3>

      <button
        onClick={() =>
          dispatch({
            type: "add",
            item: { id: 3, name: "Doro Wot", price: 450 },
          })
        }
      >
        Add Doro Wot
      </button>

      <button onClick={() => dispatch({ type: "clear" })}>
        Clear Cart
      </button>
    </section>
  );
}

function App() {
  return (
    <CartProvider>
      <main>
        <h1>Addis Eats Cart</h1>
        <Cart />
      </main>
    </CartProvider>
  );
}

export default App;