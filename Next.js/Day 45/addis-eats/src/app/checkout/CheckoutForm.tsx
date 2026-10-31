"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { placeOrder, type PlaceOrderState } from "@/app/actions";
import { useCart } from "@/context/CartContext";
import styles from "./CheckoutForm.module.css";

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

const fallbackItems = [
  { id: 1, name: "Shiro", price: 180, quantity: 1 },
  { id: 2, name: "Tibs", price: 350, quantity: 1 },
];

export default function CheckoutForm({ hasSession }: CheckoutFormProps) {
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

            <h1>Thank you, {confirmedOrder.customerName}.</h1>

            <p>
              Your Addis Eats order has been validated and saved on the server,
              and cached order pages have been revalidated.
            </p>

            <span className={styles.checkoutConfirmationOrderNumber}>
              Order #{confirmedOrder.id}
            </span>
          </div>

          <div className={styles.checkoutConfirmationCard}>
            <div className={styles.checkoutConfirmationDetails}>
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
                <strong>
                  {confirmedOrder.total} {confirmedOrder.currency}
                </strong>
              </div>
            </div>

            {confirmedOrder.notes && (
              <div className={styles.checkoutConfirmationNote}>
                <span>Order notes</span>
                <p>{confirmedOrder.notes}</p>
              </div>
            )}
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
        <form className={styles.checkoutForm} action={formAction} noValidate>
          <input
            type="hidden"
            name="itemsJson"
            value={JSON.stringify(summaryItems)}
          />

          <div className={styles.checkoutSection}>
            <div className={styles.checkoutSectionHeading}>
              <div>
                <h2>Delivery details</h2>
                <p>Validated on the server with our shared Zod orderSchema.</p>
              </div>
            </div>

            {state?.error && !state.ok && (
              <div className={styles.formBannerError} role="alert">
                <strong>{state.error}:</strong> Please check the highlighted fields below.
              </div>
            )}

            <div className={styles.formGrid}>
              <label>
                Full name
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  aria-invalid={Boolean(state?.fieldErrors?.name)}
                />
                {state?.fieldErrors?.name?.[0] && (
                  <span className={styles.fieldError} role="alert">
                    {state.fieldErrors.name[0]}
                  </span>
                )}
              </label>

              <label>
                Phone number (TeleBirr)
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="0912345678 or +251912345678"
                  aria-invalid={Boolean(state?.fieldErrors?.phone)}
                />
                {state?.fieldErrors?.phone?.[0] && (
                  <span className={styles.fieldError} role="alert">
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
                  placeholder="Street, area, or landmark (e.g., Bole Atlas)"
                  aria-invalid={Boolean(state?.fieldErrors?.address)}
                />
                {state?.fieldErrors?.address?.[0] && (
                  <span className={styles.fieldError} role="alert">
                    {state.fieldErrors.address[0]}
                  </span>
                )}
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

          <button
            type="submit"
            className="button button--primary"
            disabled={pending}
          >
            {pending ? "Sending..." : "Place order"}{" "}
            {!pending && <span aria-hidden="true">→</span>}
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

          <div className={styles.checkoutSummaryPayment}>
            <span>Payment</span>
            <strong>TeleBirr / Cash on delivery</strong>
          </div>

          <Link href="/cart" className={styles.checkoutSummaryBack}>
            ← Back to cart
          </Link>
        </aside>
      </section>
    </div>
  );
}
