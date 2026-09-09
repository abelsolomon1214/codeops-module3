import { useMemo, useState } from "react";
import { useCart } from "../context/useCart";
import { useFetch } from "../hooks/useFetch";
import DishCard from "./DishCard";

const API_URL = "/dishes.json";

const categories = [
  "All",
  "Vegetarian",
  "Meat",
];

export default function Menu() {
  const [category, setCategory] = useState("All");
  const { dispatch } = useCart();

  const { data, loading, error } = useFetch(API_URL);

  const dishes = useMemo(() => {
    if (!data) {
      return [];
    }

    if (category === "All") {
      return data;
    }

    return data.filter(
      (dish) => dish.category === category,
    );
  }, [data, category]);

  function handleAdd(dish) {
    dispatch({
      type: "add",
      dish,
    });
  }

  return (
    <section className="menu-section" id="menu">
      <div className="menu-heading">
        <div>
          <span className="section-label">
            Our selection
          </span>

          <h2>Made for sharing</h2>

          <p>
            Explore authentic Ethiopian favorites,
            prepared with bold flavors and fresh
            ingredients.
          </p>
        </div>

        <div
          className="category-filter"
          aria-label="Menu categories"
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={
                category === item ? "active" : ""
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div
          className="status-message"
          role="status"
        >
          <span className="loading-dot" />
          Loading our menu...
        </div>
      )}

      {error && (
        <div
          className="status-message error-message"
          role="alert"
        >
          <strong>We couldn't load the menu.</strong>
          <span>{error.message}</span>
        </div>
      )}

      {!loading &&
        !error &&
        dishes.length === 0 && (
          <div className="status-message">
            No dishes found in this category.
          </div>
        )}

      {!loading &&
        !error &&
        dishes.length > 0 && (
          <div className="menu-grid">
            {dishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onAdd={handleAdd}
              />
            ))}
          </div>
        )}
    </section>
  );
}