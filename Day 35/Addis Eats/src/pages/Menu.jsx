import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DishCard from "../components/DishCard";
import Modal from "../ui/Modal";
import useCartStore from "../store/cartStore";

const categories = [
  "All",
  "Fasting",
  "Meat",
  "Breakfast",
  "Dessert",
  "Drink",
];

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDish, setSelectedDish] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addItem = useCartStore((state) => state.addItem);

  const selectedCategory = searchParams.get("category") || "All";

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDishes() {
      setStatus("loading");
      setError("");

      try {
        const response = await fetch("/data/dishes.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("We could not load the menu.");
        }

        const data = await response.json();

        setDishes(data);
        setStatus("success");
      } catch (fetchError) {
        if (fetchError.name === "AbortError") {
          return;
        }

        setError(fetchError.message);
        setStatus("error");
      }
    }

    fetchDishes();

    return () => {
      controller.abort();
    };
  }, []);

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesCategory =
        selectedCategory === "All" ||
        dish.category === selectedCategory;

      const matchesSearch = dish.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    });
  }, [dishes, selectedCategory, searchTerm]);

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

  if (status === "loading") {
    return (
      <section className="menu-state">
        <p className="eyebrow">Our Menu</p>
        <h2>Preparing the menu...</h2>
        <p>Please wait while we load today's dishes.</p>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="menu-state menu-error">
        <p className="eyebrow">Our Menu</p>
        <h2>We couldn't load the menu</h2>
        <p>{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </section>
    );
  }

  return (
    <section>
      <div className="page-heading">
        <p className="eyebrow">Our Menu</p>

        <h2>Traditional Ethiopian Dishes</h2>

        <p>
          Discover authentic Ethiopian flavors prepared for Addis
          Ababa.
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

      <div className="menu-search">
        <label htmlFor="dish-search">Search dishes</label>

        <input
          id="dish-search"
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search for a dish..."
        />
      </div>

      <p className="filter-status">
        Showing: <strong>{selectedCategory}</strong>
      </p>

      {filteredDishes.length === 0 ? (
        <p className="empty-message">
          No dishes found in this category.
        </p>
      ) : (
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