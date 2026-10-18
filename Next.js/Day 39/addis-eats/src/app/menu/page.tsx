
import { loadDishes } from "./DishListServer";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

export const revalidate = 3600;

type MenuPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function MenuPage({
  searchParams,
}: MenuPageProps) {
  const { category } = await searchParams;

  const selectedCategory =
    category === "Vegetarian" || category === "Meat"
      ? category
      : "All dishes";

  const dishes = await loadDishes();

  const filteredDishes =
    selectedCategory === "All dishes"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  return (
    <div className="menu-page">
      <section className="menu-hero">
        <div className="menu-hero__content">
          <span className="eyebrow">THE ADDIS EATS MENU</span>

          <h1>
            Choose something
            <span> delicious.</span>
          </h1>

          <p>
            Explore a focused selection of Ethiopian favorites, from rich
            vegetarian dishes to perfectly seasoned meat classics.
          </p>
        </div>

        <div className="menu-hero__note">
          <span>OUR APPROACH</span>
          <strong>Traditional food.</strong>
          <strong>Modern experience.</strong>
        </div>
      </section>

      <section className="menu-section">
        <div className="menu-section__header">
          <div>
            <span className="eyebrow">EXPLORE</span>
            <h2>Our dishes</h2>
          </div>

          <p>
            Four carefully selected dishes to introduce you to the Addis Eats
            experience.
          </p>
        </div>

        <CategoryBar selectedCategory={selectedCategory}>
          <DishList dishes={filteredDishes} />
        </CategoryBar>
      </section>
    </div>
  );
}
