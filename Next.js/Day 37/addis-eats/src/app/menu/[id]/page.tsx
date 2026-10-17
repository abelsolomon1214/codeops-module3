
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dishes } from "@/data/dishes";
import styles from "./page.module.css";

type DishPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return dishes.map((dish) => ({
    id: String(dish.id),
  }));
}

export default async function DishPage({ params }: DishPageProps) {
  const { id } = await params;
  const dish = dishes.find((item) => item.id === Number(id));

  if (!dish) {
    notFound();
  }

  return (
    <div className={styles.dishDetailPage}>
      <section className={styles.dishDetail}>
        <div className={styles.dishDetailImage}>
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            priority
            sizes="(max-width: 900px) 92vw, 50vw"
          />
        </div>

        <div className={styles.dishDetailContent}>
          <Link href="/menu" className={`back-link`}>
            ← Back to menu
          </Link>

          <span className="eyebrow">{dish.category}</span>

          <h1>{dish.name}</h1>

          <p className={styles.dishDetailDescription}>
            {dish.detailDescription}
          </p>

          <div className={styles.dishDetailPrice}>
            <span>Price</span>
            <strong>{dish.price} ETB</strong>
          </div>

        </div>
      </section>
    </div>
  );
}
