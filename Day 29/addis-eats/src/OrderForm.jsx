import { useState } from "react";

function OrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const isValidPhone = /^09\d{8}$/.test(formData.phone);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValidPhone) {
      return;
    }

    setSubmitted(true);
  };

  return (
    <section className="order-form">
      <h2>Delivery Information</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          TeleBirr Phone Number
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="09XXXXXXXX"
            required
          />
        </label>

        <label>
          Area
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          />
        </label>

        <button
          type="submit"
          disabled={!isValidPhone}
        >
          Place Order
        </button>
      </form>

      {submitted && (
        <p className="order-success">
          ✅ Order placed successfully!
        </p>
      )}
    </section>
  );
}

export default OrderForm;