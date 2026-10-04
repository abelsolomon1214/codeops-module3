"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type CheckoutForm = {
  name: string;
  phone: string;
  address: string;
  notes: string;
};

const initialForm: CheckoutForm = {
  name: "",
  phone: "",
  address: "",
  notes: "",
};

export default function CheckoutPage() {
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="checkout-page">
        <section className="checkout-confirmation">
          <div className="checkout-confirmation__header">
            <div className="checkout-confirmation__icon" aria-hidden="true">
              ✓
            </div>

            <span className="eyebrow">ORDER CONFIRMED</span>

            <h1>Thank you, {form.name}.</h1>

            <p>
              Your Addis Eats demo order has been placed successfully. We&apos;ll
              use the details below for delivery.
            </p>

            <span className="checkout-confirmation__order-number">
              Order #AE-1042
            </span>
          </div>

          <div className="checkout-confirmation__card">
            <div className="checkout-confirmation__details">
              <div>
                <span>Delivery to</span>
                <strong>{form.address}</strong>
              </div>

              <div>
                <span>Phone</span>
                <strong>{form.phone}</strong>
              </div>

              <div>
                <span>Payment</span>
                <strong>Cash on delivery</strong>
              </div>
            </div>

            <div className="checkout-confirmation__items">
              <div>
                <span>Shiro × 1</span>
                <strong>180 ETB</strong>
              </div>

              <div>
                <span>Tibs × 1</span>
                <strong>350 ETB</strong>
              </div>

              <div>
                <span>Delivery</span>
                <strong>50 ETB</strong>
              </div>

              <div className="checkout-confirmation__total">
                <span>Total</span>
                <strong>580 ETB</strong>
              </div>
            </div>

            {form.notes.trim() && (
              <div className="checkout-confirmation__note">
                <span>Order notes</span>
                <p>{form.notes}</p>
              </div>
            )}
          </div>

          <p className="checkout-confirmation__demo">
            This is a frontend demo. No real payment was processed.
          </p>

          <div className="checkout-confirmation__actions">
            <Link href="/menu" className="button button--primary">
              Back to menu
              <span aria-hidden="true">→</span>
            </Link>

            <Link href="/cart" className="button button--secondary">
              View cart
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <section className="checkout-header">
        <span className="eyebrow">FINAL STEP</span>

        <h1>Complete your order.</h1>

        <p>
          Add your delivery details and review your order before placing it.
        </p>
      </section>

      <section className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="checkout-section">
            <div className="checkout-section__heading">
              <div>
                <h2>Delivery details</h2>
                <p>Where should we bring your order?</p>
              </div>
            </div>

            <div className="form-grid">
              <label>
                Full name
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </label>

              <label>
                Phone number
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+251 9XX XXX XXX"
                  required
                />
              </label>

              <label className="form-field--full">
                Delivery address
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street, area, or landmark"
                  required
                />
              </label>

              <label className="form-field--full">
                Order notes
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Anything we should know?"
                />
              </label>
            </div>
          </div>

          <button type="submit" className="button button--primary">
            Place order
            <span aria-hidden="true">→</span>
          </button>
        </form>

        <aside className="checkout-summary">
          <span className="eyebrow">YOUR ORDER</span>

          <h2>Order summary</h2>

          <div className="checkout-summary__item">
            <span>Shiro × 1</span>
            <strong>180 ETB</strong>
          </div>

          <div className="checkout-summary__item">
            <span>Tibs × 1</span>
            <strong>350 ETB</strong>
          </div>

          <div className="checkout-summary__item">
            <span>Delivery</span>
            <strong>50 ETB</strong>
          </div>

          <div className="checkout-summary__total">
            <span>Total</span>
            <strong>580 ETB</strong>
          </div>

          <div className="checkout-summary__payment">
            <span>Payment</span>
            <strong>Cash on delivery</strong>
          </div>

          <Link href="/cart" className="checkout-summary__back">
            ← Back to cart
          </Link>
        </aside>
      </section>
    </div>
  );
}