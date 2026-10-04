import Image from "next/image";
import Link from "next/link";

type Dish = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
};

type DishListProps = {
  selectedCategory: string;
};

const dishes: Dish[] = [
  {
    id: 1,
    name: "Shiro",
    category: "Vegetarian",
    description:
      "A smooth chickpea stew seasoned with traditional Ethiopian spices.",
    price: 180,
    image: "/images/shiro.jpg",
  },
  {
    id: 2,
    name: "Tibs",
    category: "Meat",
    description:
      "Tender pieces of sautéed beef with peppers, onions, and aromatic spices.",
    price: 350,
    image: "/images/tibs.jpg",
  },
  {
    id: 3,
    name: "Beyaynetu",
    category: "Vegetarian",
    description:
      "A colorful combination of Ethiopian vegetable and lentil dishes.",
    price: 250,
    image: "/images/beyaynetu.jpg",
  },
  {
    id: 4,
    name: "Doro Wot",
    category: "Meat",
    description:
      "A rich and deeply spiced Ethiopian chicken stew served with tradition.",
    price: 450,
    image: "/images/doro-wet.jpg",
  },
];

export default function DishList({ selectedCategory }: DishListProps) {
  const filteredDishes =
    selectedCategory === "All dishes"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  return (
    <div className="menu-dish-grid">
      {filteredDishes.map((dish) => (
        <article className="menu-dish-card" key={dish.id}>
          <Link
            href={`/menu/${dish.id}`}
            className="menu-dish-card__image"
          >
            <Image
              src={dish.image}
              alt={dish.name}
              fill
              sizes="(max-width: 700px) 92vw, (max-width: 1000px) 45vw, 30vw"
            />
            <span>{dish.category}</span>
          </Link>

          <div className="menu-dish-card__body">
            <div className="menu-dish-card__top">
              <div>
                <span className="menu-dish-card__number">0{dish.id}</span>
                <h3>{dish.name}</h3>
              </div>

              <strong>{dish.price} ETB</strong>
            </div>

            <p>{dish.description}</p>

            <Link
              href={`/menu/${dish.id}`}
              className="menu-dish-card__action"
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