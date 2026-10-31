"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { placeOrder, type PlaceOrderState } from "@/app/actions";
import { useCart } from "@/context/CartContext";
import styles from "./CheckoutForm.module.css";

type CheckoutFormData = {
  phone: string;
  address: string;
  notes: string;
};

type CheckoutFormProps = {
  hasSession: boolean;
  userName: string;
};

const initialForm: CheckoutFormData = {
  phone: "",
  address: "",
  notes: "",
};

const fallbackItems = [
  { id: 1, name: "Shiro", price: 180, quantity: 1 },
];

export default function CheckoutForm({ hasSession, userName }: CheckoutFormProps) {
  const { cartItems, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutFormData>(initialForm);
  const [state, formAction, pending] = useActionState<PlaceOrderState, FormData>(
    placeOrder,
    null,
  );

  const summaryItems =
    cartItems.length > 0
      ? cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        }))
      : fallbackItems;

  const subtotal = summaryItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    if (state?.ok) {
      clearCart();
    }
  }, [state?.ok, clearCart]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  if (state?.ok && state.order) {
    const confirmedOrder = state.order;

    return (
      <div className={styles.checkoutPage} data-session-present={hasSession}>
        <section className={styles.checkoutConfirmation}>
          <div className={styles.checkoutConfirmationHeader}>
            <div className={styles.checkoutConfirmationIcon} aria-hidden="true">
              ✓
            </div>
            <span className="eyebrow">ORDER CONFIRMED</span>
            <h1>Thank you, {confirmedOrder.customerName}.</h1>
            <p>Your order has been placed and assigned to your account.</p>
            <span className={styles.checkoutConfirmationOrderNumber}>
              Order #{confirmedOrder.id}
            </span>
          </div>

          <div className={styles.checkoutConfirmationCard}>
            <div className={styles.checkoutConfirmationDetails}>
              <div>
                <span>Account Name</span>
                <strong>{confirmedOrder.customerName}</strong>
              </div>
              <div>
                <span>Delivery to</span>
                <strong>{confirmedOrder.address}</strong>
              </div>
              <div>
                <span>Phone</span>
                <strong>{confirmedOrder.phone}</strong>
              </div>
              <div>
                <span>Payment</span>
                <strong>TeleBirr / Cash on delivery</strong>
              </div>
            </div>

            <div className={styles.checkoutConfirmationItems}>
              {confirmedOrder.items.map((item) => (
                <div key={item.id}>
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <strong>{item.price * item.quantity} ETB</strong>
                </div>
              ))}
              <div>
                <span>Delivery</span>
                <strong>{confirmedOrder.deliveryFee} ETB</strong>
              </div>
              <div className={styles.checkoutConfirmationTotal}>
                <span>Total</span>
                <strong>{confirmedOrder.total} {confirmedOrder.currency}</strong>
              </div>
            </div>
          </div>

          <div className={styles.checkoutConfirmationActions}>
            <Link href="/orders" className="button button--primary">
              View orders <span aria-hidden="true">→</span>
            </Link>
            <Link href="/menu" className="button button--secondary">
              Back to menu
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.checkoutPage} data-session-present={hasSession}>
      <section className={styles.checkoutHeader}>
        <span className="eyebrow">FINAL STEP</span>
        <h1>Complete your order.</h1>
        <p>
          Ordering as <strong>{userName}</strong>. Add your delivery details below.
        </p>
      </section>

      <section className={styles.checkoutLayout}>
        <form className={styles.checkoutForm} action={formAction} noValidate>
          <input
            type="hidden"
            name="itemsJson"
            value={JSON.stringify(summaryItems)}
          />

          <div className={styles.checkoutSection}>
            <div className={styles.checkoutSectionHeading}>
              <h2>Delivery details</h2>
            </div>

            {state?.error && !state.ok && (
              <div className={styles.formBannerError} role="alert">
                <strong>{state.error}</strong>
              </div>
            )}

            <div className={styles.formGrid}>
              <label>
                Ordering as
                <input
                  type="text"
                  value={userName}
                  disabled
                  style={{ background: "#f3f4f6", cursor: "not-allowed" }}
                />
              </label>

              <label>
                Phone number (TeleBirr)
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="0912345678"
                  aria-invalid={Boolean(state?.fieldErrors?.phone)}
                />
                {state?.fieldErrors?.phone?.[0] && (
                  <span className={styles.fieldError}>
                    {state.fieldErrors.phone[0]}
                  </span>
                )}
              </label>

              <label className={styles.formFieldFull}>
                Delivery address
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="e.g. Bole Atlas, near Edna Mall"
                  aria-invalid={Boolean(state?.fieldErrors?.address)}
                />
                {state?.fieldErrors?.address?.[0] && (
                  <span className={styles.fieldError}>
                    {state.fieldErrors.address[0]}
                  </span>
                )}
              </label>

              <label className={styles.formFieldFull}>
                Order notes (Optional)
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any special instructions?"
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="button button--primary"
            disabled={pending}
          >
            {pending ? "Placing Order..." : "Place order"} →
          </button>
        </form>

        <aside className={styles.checkoutSummary}>
          <span className="eyebrow">YOUR ORDER</span>
          <h2>Order summary</h2>

          {summaryItems.map((item) => (
            <div key={item.id} className={styles.checkoutSummaryItem}>
              <span>
                {item.name} × {item.quantity}
              </span>
              <strong>{item.price * item.quantity} ETB</strong>
            </div>
          ))}

          <div className={styles.checkoutSummaryItem}>
            <span>Delivery</span>
            <strong>{deliveryFee} ETB</strong>
          </div>

          <div className={styles.checkoutSummaryTotal}>
            <span>Total</span>
            <strong>{total} ETB</strong>
          </div>

          <Link href="/cart" className={styles.checkoutSummaryBack}>
            ← Back to cart
          </Link>
        </aside>
      </section>
    </div>
  );
}
