import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";

function Cart() {
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity,
  );
  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity,
  );
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

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
        <p>Review your dishes before continuing to checkout.</p>
      </div>

      <div className="cart-list">
        {items.map((item) => {
          const itemTotal = item.price * item.quantity;

          return (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-details">
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.price} ETB each</p>
                </div>

                <div className="quantity-controls">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item.id)}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    −
                  </button>

                  <span aria-label={`${item.quantity} items`}>
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(item.id)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>

                <strong>{itemTotal} ETB</strong>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="cart-summary">
        <div>
          <span>Order total</span>
          <strong>{total} ETB</strong>
        </div>

        <div className="cart-summary-actions">
          <button type="button" onClick={clear}>
            Clear Cart
          </button>

          <Link className="primary-button" to="/checkout">
            Continue to Checkout
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;