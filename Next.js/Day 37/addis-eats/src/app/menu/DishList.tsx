
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Dish } from "@/data/dishes";
import styles from "./DishList.module.css";
import { useCart } from "@/context/CartContext";

type DishListProps = {
  dishes: Dish[];
  selectedCategory: string;
};

export default function DishList({
  dishes,
  selectedCategory,
}: DishListProps) {
  const { addToCart, cartItems } = useCart();

  const filteredDishes =
    selectedCategory === "All dishes"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  return (
    <div className={styles.menuDishGrid}>
      {filteredDishes.map((dish) => {
        const cartItem = cartItems.find((item) => item.id === dish.id);
        const isAdded = Boolean(cartItem);

        return (
          <article className={styles.menuDishCard} key={dish.id}>
            <Link
              href={`/menu/${dish.id}`}
              className={styles.menuDishCardImage}
            >
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                sizes="(max-width: 700px) 92vw, (max-width: 1000px) 45vw, 30vw"
              />
              <span>{dish.category}</span>
            </Link>

            <div className={styles.menuDishCardBody}>
              <div className={styles.menuDishCardTop}>
                <div>
                  <span className={styles.menuDishCardNumber}>
                    0{dish.id}
                  </span>
                  <h3>{dish.name}</h3>
                </div>
                <strong>{dish.price} ETB</strong>
              </div>

              <p>{dish.description}</p>

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

              <Link
                href={`/menu/${dish.id}`}
                className={styles.menuDishCardAction}
              >
                View dish
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
