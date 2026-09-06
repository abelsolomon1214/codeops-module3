import { useState } from "react";
import CategoryBar from "./CategoryBar";
import Dish from "./Dish";

function Menu({ dishes }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  if (filteredDishes.length === 0) {
    return (
      <section>
        <CategoryBar
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <p>No dishes found in this category.</p>
      </section>
    );
  }

  return (
    <section>
      <CategoryBar
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div>
        {filteredDishes.map((dish) => (
          <Dish
            key={dish.id}
            name={dish.name}
            price={dish.price}
            category={dish.category}
          />
        ))}
      </div>
    </section>
  );
}

export default Menu;