import { useCart } from "../context/useCart";

export default function CartBadge() {
  const { itemCount } = useCart();

  return (
    <div
      className="cart-badge"
      aria-label={`${itemCount} items in cart`}
    >
      <span className="cart-icon">🛒</span>

      <span className="cart-label">Cart</span>

      <span className="cart-count">
        {itemCount}
      </span>
    </div>
  );
}