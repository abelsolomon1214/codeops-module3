import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";

function Checkout() {
  const { items, total, clearCart } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <section className="success-page">
        <div className="success-card">
          <div className="success-icon">✓</div>

          <h2>Order placed successfully!</h2>

          <p>
            Thank you for ordering from Addis Eats. Your delicious
            Ethiopian meal is on its way.
          </p>

          <Link className="primary-button" to="/menu">
            Order More Food
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="page-heading">
        <p className="eyebrow">Checkout</p>
        <h2>Complete Your Order</h2>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <p>Your cart is empty.</p>

          <Link className="primary-button" to="/menu">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="checkout-summary">
          <h3>Order Summary</h3>

          {items.map((item) => (
            <div className="checkout-item" key={item.id}>
              <span>{item.name}</span>
              <span>{item.price} ETB</span>
            </div>
          ))}

          <div className="checkout-total">
            <strong>Total</strong>
            <strong>{total} ETB</strong>
          </div>

          <button type="button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      )}
    </section>
  );
}

export default Checkout;