import { useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import DishCard from "../components/DishCard";
import CartContext from "../context/CartContext";
import dishes from "../data/dishes";

const categories = ["All", "Vegan", "Vegetarian", "Meat"];

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useContext(CartContext);

  const selectedCategory = searchParams.get("category") || "All";

  const filteredDishes = useMemo(() => {
    if (selectedCategory === "All") {
      return dishes;
    }

    return dishes.filter((dish) => dish.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    if (category === "All") {
      setSearchParams({});
      return;
    }

    setSearchParams({ category });
  };

  return (
    <section>
      <div className="page-heading">
        <p className="eyebrow">Our Menu</p>
        <h2>Traditional Ethiopian Dishes</h2>
        <p>
          Choose a category or open any dish to see its full details.
        </p>
      </div>

      <div className="category-bar">
        {categories.map((category) => (
          <button
            type="button"
            className={selectedCategory === category ? "selected" : ""}
            key={category}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="filter-status">
        Showing: <strong>{selectedCategory}</strong>
      </p>

      <div className="dish-grid">
        {filteredDishes.map((dish) => (
          <DishCard
            key={dish.id}
            dish={dish}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      {filteredDishes.length === 0 && (
        <p className="empty-message">No dishes found in this category.</p>
      )}
    </section>
  );
}

export default Menu;