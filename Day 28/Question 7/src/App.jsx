import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const isPhoneValid = /^09\d{8}$/.test(formData.phone);

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Delivery information:", formData);
  }

  return (
    <main>
      <h1>Addis Eats Delivery</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />

        <label htmlFor="phone">TeleBirr Number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="09XXXXXXXX"
        />

        {!isPhoneValid && formData.phone !== "" && (
          <p className="error">
            Enter a valid TeleBirr number starting with 09.
          </p>
        )}

        <label htmlFor="area">Area</label>
        <input
          id="area"
          name="area"
          type="text"
          value={formData.area}
          onChange={handleChange}
          placeholder="Enter your area"
        />

        <button type="submit" disabled={!isPhoneValid}>
          Submit Delivery
        </button>
      </form>
    </main>
  );
}

export default App;