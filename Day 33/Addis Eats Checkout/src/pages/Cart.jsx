import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";

function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  if (items.length === 0) {
    return (
      <section className="empty-state">
        <p className="eyebrow">Your Cart</p>
        <h2>Your cart is empty</h2>
        <p>Add some delicious Ethiopian dishes to get started.</p>

        <Link className="primary-button" to="/menu">
          Browse Menu
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="page-heading">
        <p className="eyebrow">Your Cart</p>
        <h2>Your Order</h2>
      </div>

      <div className="cart-list">
        {items.map((item) => (
          <article className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div>
              <h3>{item.name}</h3>
              <p>{item.price} ETB</p>
            </div>

            <button
              type="button"
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
          </article>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: {total} ETB</h3>

        <div className="dish-actions">
          <button type="button" onClick={clear}>
            Clear Cart
          </button>

          <Link className="primary-button" to="/checkout">
            Checkout
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;