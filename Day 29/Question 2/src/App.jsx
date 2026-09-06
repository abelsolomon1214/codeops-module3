import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [dishes, setDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("/dishes.json")
      .then((response) => response.json())
      .then((data) => setDishes(data));
  }, []);

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  useEffect(() => {
    document.title = `${filteredDishes.length} dishes`;
  }, [filteredDishes.length]);

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