import { useEffect, useRef, useState } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import loadDishes from "./api";

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const searchInputRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchDishes = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await loadDishes(
          selectedCategory,
          controller.signal
        );

        setDishes(
          data.map((dish) => ({
            ...dish,
            count: 0,
          }))
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchDishes();

    return () => {
      controller.abort();
    };
  }, [selectedCategory]);

  useEffect(() => {
    if (!loading) {
      searchInputRef.current?.focus();
    }
  }, [loading]);

  const handleAdd = (id) => {
    setDishes((currentDishes) =>
      currentDishes.map((dish) =>
        dish.id === id
          ? { ...dish, count: dish.count + 1 }
          : dish
      )
    );
  };

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const orderTotal = dishes.reduce(
    (total, dish) => total + dish.price * dish.count,
    0
  );

  if (loading) {
    return (
      <section className="menu">
        <h2>Our Menu</h2>
        <p className="loading-state">Loading dishes...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="menu">
        <h2>Our Menu</h2>
        <p className="error-state">{error}</p>
      </section>
    );
  }

  return (
    <section className="menu">
      <h2>Our Menu</h2>

      <input
        ref={searchInputRef}
        type="search"
        placeholder="Search dishes..."
        className="search-input"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <CategoryBar
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <DishList
        dishes={filteredDishes}
        onAdd={handleAdd}
      />

      <div className="order-total">
        <h3>Your Order</h3>

        {dishes.filter((dish) => dish.count > 0).length === 0 ? (
          <p>No dishes selected yet.</p>
        ) : (
          <ul>
            {dishes
              .filter((dish) => dish.count > 0)
              .map((dish) => (
                <li key={dish.id}>
                  {dish.name} × {dish.count} —{" "}
                  {dish.price * dish.count} ETB
                </li>
              ))}
          </ul>
        )}

        <h3>Total: {orderTotal} ETB</h3>
      </div>
    </section>
  );
}

export default Menu;