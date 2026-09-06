import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [dishes, setDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/dishes.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load dishes: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        setDishes(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  useEffect(() => {
    document.title = `${filteredDishes.length} dishes`;
  }, [filteredDishes.length]);

  if (loading) {
    return <p>Loading dishes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Addis Eats</h1>

      <div className="category-bar">
        <button onClick={() => setSelectedCategory("All")}>All</button>

        <button onClick={() => setSelectedCategory("Vegetarian")}>
          Vegetarian
        </button>

        <button onClick={() => setSelectedCategory("Meat")}>Meat</button>
      </div>

      <section>
        {filteredDishes.map((dish) => (
          <article className="dish-card" key={dish.id}>
            <h2>{dish.name}</h2>
            <p>Price: {dish.price} ETB</p>
            <p>Category: {dish.category}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;