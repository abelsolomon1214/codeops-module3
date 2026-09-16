import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DishCard from "../components/DishCard";
import Modal from "../ui/Modal";
import useCartStore from "../store/cartStore";
import dishes from "../data/dishes";

const categories = ["All", "Vegan", "Vegetarian", "Meat"];

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDish, setSelectedDish] = useState(null);

  const addItem = useCartStore((state) => state.addItem);

  const selectedCategory = searchParams.get("category") || "All";

  const filteredDishes = useMemo(() => {
    if (selectedCategory === "All") {
      return dishes;
    }

    return dishes.filter(
      (dish) => dish.category === selectedCategory,
    );
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    if (category === "All") {
      setSearchParams({});
      return;
    }

    setSearchParams({ category });
  };

  const handleQuickView = useCallback((dish) => {
    setSelectedDish(dish);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedDish(null);
  }, []);

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
            className={
              selectedCategory === category ? "selected" : ""
            }
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
            onAddToCart={addItem}
            onQuickView={handleQuickView}
          />
        ))}
      </div>

      {filteredDishes.length === 0 && (
        <p className="empty-message">
          No dishes found in this category.
        </p>
      )}

      {selectedDish && (
        <Modal
          title={selectedDish.name}
          onClose={handleCloseModal}
        >
          <img
            src={selectedDish.image}
            alt=""
            className="modal-dish-image"
          />

          <p>{selectedDish.description}</p>

          <p className="dish-category">
            Category: {selectedDish.category}
          </p>

          <p className="dish-price">
            {selectedDish.price} ETB
          </p>

          <button
            type="button"
            onClick={() => {
              addItem(selectedDish);
              handleCloseModal();
            }}
          >
            Add to Cart
          </button>
        </Modal>
      )}
    </section>
  );
}

export default Menu;