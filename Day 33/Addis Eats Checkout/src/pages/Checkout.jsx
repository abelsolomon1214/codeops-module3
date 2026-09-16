import { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import Field from "../components/Field";
import { validate } from "../utils/validate";

const INITIAL_FORM = {
  name: "",
  phone: "",
  area: "Bole",
  notes: "",
};

const AREA_OPTIONS = [
  { value: "Bole", label: "Bole" },
  { value: "Kazanchis", label: "Kazanchis" },
  { value: "Megenagna", label: "Megenagna" },
  { value: "Piassa", label: "Piassa" },
];

function Checkout() {
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);

  const [form, setForm] = useState(INITIAL_FORM);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const errors = validate(form);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setServerError("");
  }

  function handleBlur(event) {
    const { name } = event.target;

    setTouched((currentTouched) => ({
      ...currentTouched,
      [name]: true,
    }));
  }

  async function handlePlaceOrder(event) {
    event.preventDefault();

    if (submitting) {
      return;
    }

    const currentErrors = validate(form);

    if (Object.keys(currentErrors).length > 0) {
      setTouched({
        name: true,
        phone: true,
        area: true,
        notes: true,
      });

      const firstError = Object.keys(currentErrors)[0];
      document.getElementById(firstError)?.focus();

      return;
    }

    setSubmitting(true);
    setServerError("");

    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      if (form.phone.replace(/\s+/g, "") === "0910000000") {
        throw new Error(
          "We could not connect to the ordering service. Please try again.",
        );
      }

      setOrderPlaced(true);
      clear();
    } catch (error) {
      setServerError(error.message);
      document.getElementById("checkout-server-error")?.focus();
    } finally {
      setSubmitting(false);
    }
  }

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
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handlePlaceOrder}>
            <h3>Delivery Details</h3>

            <Field
              label="Your name"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
              placeholder="Enter your full name"
            />

            <Field
              label="TeleBirr number"
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
              touched={touched.phone}
              placeholder="09... or +2519..."
            />

            <Field
              label="Delivery area"
              id="area"
              name="area"
              type="select"
              value={form.area}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.area}
              touched={touched.area}
              options={AREA_OPTIONS}
            />

            <Field
              label="Delivery notes (optional)"
              id="notes"
              name="notes"
              type="textarea"
              value={form.notes}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Add directions or other delivery details"
            />

            {serverError && (
              <p
                id="checkout-server-error"
                className="server-error"
                role="alert"
                tabIndex="-1"
              >
                {serverError}
              </p>
            )}

            <button type="submit" disabled={submitting}>
              {submitting
                ? "Sending your order..."
                : `Order — ${total} ETB`}
            </button>

            <p className="checkout-demo-note">
              Demo failure: use 0910000000 to test the failed request state.
            </p>
          </form>

          <aside className="checkout-summary">
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
          </aside>
        </div>
      )}
    </section>
  );
}

export default Checkout;