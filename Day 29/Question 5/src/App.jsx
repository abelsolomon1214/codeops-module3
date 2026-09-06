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
        const filteredData =
          selectedCategory === "All"
            ? data
            : data.filter((dish) => dish.category === selectedCategory);

        setDishes(filteredData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [selectedCategory]);

  useEffect(() => {
    document.title = `${dishes.length} dishes`;
  }, [dishes.length]);

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
        {dishes.map((dish) => (
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