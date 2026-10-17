
"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import styles from "./CheckoutForm.module.css";
import { useCart } from "@/context/CartContext";

type CheckoutFormData = {
  name: string;
  phone: string;
  address: string;
  notes: string;
};

type CheckoutFormProps = {
  hasSession: boolean;
};

const initialForm: CheckoutFormData = {
  name: "",
  phone: "",
  address: "",
  notes: "",
};

export default function CheckoutForm({ hasSession }: CheckoutFormProps) {

  const {clearCart} = useCart();

  const [form, setForm] = useState<CheckoutFormData>(initialForm);
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

    clearCart();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div
        className={styles.checkoutPage}
        data-session-present={hasSession}
      >
        <section className={styles.checkoutConfirmation}>
          <div className={styles.checkoutConfirmationHeader}>
            <div
              className={styles.checkoutConfirmationIcon}
              aria-hidden="true"
            >
              ✓
            </div>

            <span className="eyebrow">ORDER CONFIRMED</span>

            <h1>Thank you, {form.name}.</h1>

            <p>
              Your Addis Eats demo order has been placed successfully.
              We&apos;ll use the details below for delivery.
            </p>

            <span className={styles.checkoutConfirmationOrderNumber}>
              Order #AE-1042
            </span>
          </div>

          <div className={styles.checkoutConfirmationCard}>
            <div className={styles.checkoutConfirmationDetails}>
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

            <div className={styles.checkoutConfirmationItems}>
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

              <div className={styles.checkoutConfirmationTotal}>
                <span>Total</span>
                <strong>580 ETB</strong>
              </div>
            </div>

            {form.notes.trim() && (
              <div className={styles.checkoutConfirmationNote}>
                <span>Order notes</span>
                <p>{form.notes}</p>
              </div>
            )}
          </div>

          <p className={styles.checkoutConfirmationDemo}>
            This is a frontend demo. No real payment was processed.
          </p>

          <div className={styles.checkoutConfirmationActions}>
            <Link href="/menu" className="button button--primary">
              Back to menu <span aria-hidden="true">→</span>
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
    <div
      className={styles.checkoutPage}
      data-session-present={hasSession}
    >
      <section className={styles.checkoutHeader}>
        <span className="eyebrow">FINAL STEP</span>

        <h1>Complete your order.</h1>

        <p>
          Add your delivery details and review your order before placing it.
        </p>
      </section>

      <section className={styles.checkoutLayout}>
        <form className={styles.checkoutForm} onSubmit={handleSubmit}>
          <div className={styles.checkoutSection}>
            <div className={styles.checkoutSectionHeading}>
              <div>
                <h2>Delivery details</h2>
                <p>Where should we bring your order?</p>
              </div>
            </div>

            <div className={styles.formGrid}>
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

              <label className={styles.formFieldFull}>
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

              <label className={styles.formFieldFull}>
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
            Place order <span aria-hidden="true">→</span>
          </button>
        </form>

        <aside className={styles.checkoutSummary}>
          <span className="eyebrow">YOUR ORDER</span>

          <h2>Order summary</h2>

          <div className={styles.checkoutSummaryItem}>
            <span>Shiro × 1</span>
            <strong>180 ETB</strong>
          </div>

          <div className={styles.checkoutSummaryItem}>
            <span>Tibs × 1</span>
            <strong>350 ETB</strong>
          </div>

          <div className={styles.checkoutSummaryItem}>
            <span>Delivery</span>
            <strong>50 ETB</strong>
          </div>

          <div className={styles.checkoutSummaryTotal}>
            <span>Total</span>
            <strong>580 ETB</strong>
          </div>

          <div className={styles.checkoutSummaryPayment}>
            <span>Payment</span>
            <strong>Cash on delivery</strong>
          </div>

          <Link href="/cart" className={styles.checkoutSummaryBack}>
            ← Back to cart
          </Link>
        </aside>
      </section>
    </div>
  );
}
