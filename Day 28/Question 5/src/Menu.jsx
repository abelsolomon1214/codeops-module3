import { useState } from "react";
import CategoryBar from "./CategoryBar";
import Dish from "./Dish";

function Menu({ dishes }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [total, setTotal] = useState(0);

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  function handleAdd(price) {
    setTotal((currentTotal) => currentTotal + price);
  }

  return (
    <section>
      <CategoryBar
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {filteredDishes.length === 0 ? (
        <p>No dishes found in this category.</p>
      ) : (
        <div>
          {filteredDishes.map((dish) => (
            <Dish
              key={dish.id}
              name={dish.name}
              price={dish.price}
              onAdd={handleAdd}
            />
          ))}
        </div>
      )}

      <h2>Order Total: {total} ETB</h2>
    </section>
  );
}

export default Menu;