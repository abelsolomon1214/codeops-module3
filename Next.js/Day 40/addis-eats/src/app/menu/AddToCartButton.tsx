
"use client";

import { useCart } from "@/context/CartContext";
import type { Dish } from "@/data/dishes";
import styles from "./DishList.module.css";

type AddToCartButtonProps = {
  dish: Dish;
};

export default function AddToCartButton({
  dish,
}: AddToCartButtonProps) {
  const { addToCart, cartItems } = useCart();

  const cartItem = cartItems.find((item) => item.id === dish.id);
  const isAdded = Boolean(cartItem);

  return (
    <button
      type="button"
      className={`${styles.addToCartButton} ${
        isAdded ? styles.addToCartButtonAdded : ""
      }`}
      onClick={() => addToCart(dish)}
    >
      {isAdded ? `Added to Cart · ${cartItem?.quantity}` : "Add to Cart"}
      <span aria-hidden="true">{isAdded ? "✓" : "+"}</span>
    </button>
  );
}
