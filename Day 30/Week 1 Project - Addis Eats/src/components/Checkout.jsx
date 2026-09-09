import { useCart } from "../context/useCart";

export default function Checkout() {
  const {
    items,
    itemCount,
    subtotal,
    deliveryFee,
    total,
    dispatch,
  } = useCart();

  function handleAdd(dish) {
    dispatch({
      type: "add",
      dish,
    });
  }

  function handleRemove(id) {
    dispatch({
      type: "remove",
      id,
    });
  }

  function handleClear() {
    dispatch({
      type: "clear",
    });
  }

  return (
    <aside className="checkout-panel">
      <div className="checkout-header">
        <div>
          <span className="section-label">
            Your order
          </span>

          <h2>Your basket</h2>
        </div>

        {itemCount > 0 && (
          <span className="item-count">
            {itemCount}{" "}
            {itemCount === 1 ? "item" : "items"}
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>

          <h3>Your basket is empty</h3>

          <p>
            Add something delicious from our menu
            to get started.
          </p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map((dish) => (
              <div
                className="cart-item"
                key={dish.id}
              >
                <img
                  src={dish.image}
                  alt=""
                  className="cart-item-image"
                />

                <div className="cart-item-details">
                  <strong>{dish.name}</strong>

                  <span>
                    {dish.price} ETB each
                  </span>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      aria-label={`Remove one ${dish.name}`}
                      onClick={() =>
                        handleRemove(dish.id)
                      }
                    >
                      −
                    </button>

                    <span>{dish.quantity}</span>

                    <button
                      type="button"
                      aria-label={`Add one ${dish.name}`}
                      onClick={() =>
                        handleAdd(dish)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <strong className="cart-item-total">
                  {dish.price * dish.quantity} ETB
                </strong>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <div>
              <span>Subtotal</span>
              <strong>{subtotal} ETB</strong>
            </div>

            <div>
              <span>Delivery</span>
              <strong>{deliveryFee} ETB</strong>
            </div>

            <div className="grand-total">
              <span>Total</span>
              <strong>{total} ETB</strong>
            </div>
          </div>

          <button
            className="checkout-button"
            type="button"
          >
            Continue to checkout
            <span>→</span>
          </button>

          <button
            className="clear-button"
            type="button"
            onClick={handleClear}
          >
            Clear basket
          </button>
        </>
      )}
    </aside>
  );
}