
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./page.module.css";

export default function CartContent() {
  const {
    cartItems,
    isLoaded,
    removeFromCart,
    updateQuantity,
  } = useCart();

  if (!isLoaded) {
    return (
      <div className={styles.cartPage}>
        <p>Loading your cart...</p>
      </div>
    );
  }

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const deliveryFee = cartItems.length > 0 ? 50 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className={styles.cartPage}>
      <section className={styles.cartHeader}>
        <div>
          <span className="eyebrow">YOUR ORDER</span>
          <h1>Your cart.</h1>
        </div>

        <p>
          Review your selected dishes before continuing to checkout.
        </p>
      </section>

      {cartItems.length === 0 ? (
        <section>
          <h2>Your cart is empty.</h2>
          <p>Discover your favorite Ethiopian dishes and add them here.</p>
          <Link href="/menu" className="button button--primary">
            Explore the menu →
          </Link>
        </section>
      ) : (
        <section className={styles.cartLayout}>
          <div className={styles.cartItems}>
            {cartItems.map((item) => (
              <article className={styles.cartItem} key={item.id}>
                <div className={styles.cartItemImage}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="120px"
                  />
                </div>

                <div className={styles.cartItemInfo}>
                  <span>{item.category}</span>
                  <h2>{item.name}</h2>

                  <p>{item.price} ETB each</p>

                  <div className={styles.cartQuantity}>
                    <button
                      type="button"
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className={styles.removeItem}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>

                <strong className={styles.cartItemPrice}>
                  {item.price * item.quantity} ETB
                </strong>
              </article>
            ))}
          </div>

          <aside className={styles.cartSummary}>
            <span className="eyebrow">ORDER SUMMARY</span>

            <h2>Almost there.</h2>

            <div className={styles.cartSummaryRows}>
              <div>
                <span>Subtotal</span>
                <strong>{subtotal} ETB</strong>
              </div>

              <div>
                <span>Delivery</span>
                <strong>{deliveryFee} ETB</strong>
              </div>

              <div className={styles.cartSummaryTotal}>
                <span>Total</span>
                <strong>{total} ETB</strong>
              </div>
            </div>

            <Link href="/checkout" className="button button--primary">
              Continue to checkout →
            </Link>

            <Link href="/menu" className={styles.cartSummaryBack}>
              ← Continue shopping
            </Link>
          </aside>
        </section>
      )}
    </div>
  );
}
