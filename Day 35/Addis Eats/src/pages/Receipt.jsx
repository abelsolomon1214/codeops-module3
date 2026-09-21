import { Link } from "react-router-dom";

function Receipt() {
  return (
    <section className="receipt-page">
      <div className="receipt-card">
        <div className="receipt-success-icon" aria-hidden="true">
          ✓
        </div>

        <p className="eyebrow">Order Complete</p>

        <h2>Your order has been received</h2>

        <p className="receipt-message">
          Thank you for ordering from Addis Eats. Your order 
          has been successfully received.
        </p>

        <div className="receipt-status">
          <span>Order status</span>
          <strong>Confirmed</strong>
        </div>

        <Link className="primary-button" to="/menu">
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}

export default Receipt;
