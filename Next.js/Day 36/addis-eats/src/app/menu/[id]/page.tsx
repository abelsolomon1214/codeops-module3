import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Dish = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
};

type DishPageProps = {
  params: Promise<{ id: string }>;
};

const dishes: Dish[] = [
  {
    id: 1,
    name: "Shiro",
    category: "Vegetarian",
    description:
      "A smooth chickpea stew seasoned with traditional Ethiopian spices. Comforting, rich, and deeply familiar.",
    price: 180,
    image: "/images/shiro.jpg",
  },
  {
    id: 2,
    name: "Tibs",
    category: "Meat",
    description:
      "Tender pieces of sautéed beef combined with peppers, onions, and aromatic Ethiopian spices.",
    price: 350,
    image: "/images/tibs.jpg",
  },
  {
    id: 3,
    name: "Beyaynetu",
    category: "Vegetarian",
    description:
      "A colorful combination of Ethiopian vegetable and lentil dishes served together for a little taste of everything.",
    price: 250,
    image: "/images/beyaynetu.jpg",
  },
  {
    id: 4,
    name: "Doro Wot",
    category: "Meat",
    description:
      "A rich Ethiopian chicken stew prepared with deeply aromatic spices and served as a traditional favorite.",
    price: 450,
    image: "/images/doro-wet.jpg",
  },
];

export default async function DishPage({ params }: DishPageProps) {
  const { id } = await params;
  const dish = dishes.find((item) => item.id === Number(id));

  if (!dish) {
    notFound();
  }

  return (
    <div className="dish-detail-page">
      <section className="dish-detail">
        <div className="dish-detail__image">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            priority
            sizes="(max-width: 900px) 92vw, 50vw"
          />
        </div>

        <div className="dish-detail__content">
          <Link href="/menu" className="back-link">
            ← Back to menu
          </Link>

          <span className="eyebrow">{dish.category}</span>

          <h1>{dish.name}</h1>

          <p className="dish-detail__description">{dish.description}</p>

          <div className="dish-detail__price">
            <span>Price</span>
            <strong>{dish.price} ETB</strong>
          </div>

          <Link href="/cart" className="button button--primary">
            Add to cart
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}