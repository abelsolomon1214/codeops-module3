import { useEffect, useState } from "react";
import "./App.css";

const dishes = [
  { id: 1, name: "Shiro", price: 180, category: "Vegetarian" },
  { id: 2, name: "Tibs", price: 350, category: "Meat" },
  { id: 3, name: "Beyaynetu", price: 250, category: "Vegetarian" },
  { id: 4, name: "Doro Wot", price: 450, category: "Meat" },
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");

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
        <button onClick={() => setSelectedCategory("All")}>
          All
        </button>

        <button onClick={() => setSelectedCategory("Vegetarian")}>
          Vegetarian
        </button>

        <button onClick={() => setSelectedCategory("Meat")}>
          Meat
        </button>
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