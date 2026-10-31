
import Image from "next/image";
import Link from "next/link";
import type { Dish } from "@/data/dishes";
import styles from "./DishList.module.css";
import AddToCartButton from "./AddToCartButton";

type DishListProps = {
  dishes: Dish[];
};

export default function DishList({ dishes }: DishListProps) {
  return (
    <div className={styles.menuDishGrid}>
      {dishes.map((dish) => (
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

            <AddToCartButton dish={dish} />

            <Link
              href={`/menu/${dish.id}`}
              className={styles.menuDishCardAction}
            >
              View dish
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
