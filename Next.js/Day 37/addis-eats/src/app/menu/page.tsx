
import { Suspense } from "react";
import { loadDishes } from "./DishListServer";
import MenuExplorer from "./MenuExplorer";
import DishListSkeleton from "./DishListSkeleton";

export const revalidate = 3600;

export default function MenuPage() {
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

        <Suspense fallback={<DishListSkeleton />}>
          <MenuContent />
        </Suspense>
      </section>
    </div>
  );
}
async function MenuContent() {
  const dishes = await loadDishes();

  return <MenuExplorer dishes={dishes} />;
}