import Image from "next/image";
import Link from "next/link";

const cartItems = [
  {
    id: 1,
    name: "Shiro",
    category: "Vegetarian",
    price: 180,
    quantity: 1,
    image: "/images/shiro.jpg",
  },
  {
    id: 2,
    name: "Tibs",
    category: "Meat",
    price: 350,
    quantity: 1,
    image: "/images/tibs.jpg",
  },
];

export const metadata = {
  title: "Cart",
  description: "Review your Addis Eats order.",
};

export default function CartPage() {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  return (
    <div className="cart-page">
      <section className="cart-header">
        <div>
          <span className="eyebrow">YOUR ORDER</span>
          <h1>Your cart.</h1>
        </div>

        <p>
          Review your selected dishes before continuing to checkout.
        </p>
      </section>

      <section className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-item__image">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="120px"
                />
              </div>

              <div className="cart-item__info">
                <span>{item.category}</span>
                <h2>{item.name}</h2>
                <p>Quantity: {item.quantity}</p>
              </div>

              <strong className="cart-item__price">
                {item.price * item.quantity} ETB
              </strong>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <span className="eyebrow">ORDER SUMMARY</span>

          <h2>Almost there.</h2>

          <div className="cart-summary__rows">
            <div>
              <span>Subtotal</span>
              <strong>{subtotal} ETB</strong>
            </div>

            <div>
              <span>Delivery</span>
              <strong>{deliveryFee} ETB</strong>
            </div>

            <div className="cart-summary__total">
              <span>Total</span>
              <strong>{total} ETB</strong>
            </div>
          </div>

          <Link href="/checkout" className="button button--primary">
            Continue to checkout
            <span aria-hidden="true">→</span>
          </Link>

          <Link href="/menu" className="cart-summary__back">
            ← Continue shopping
          </Link>
        </aside>
      </section>
    </div>
  );
}