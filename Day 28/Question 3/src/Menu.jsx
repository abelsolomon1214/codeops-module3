import { useState } from "react";
import CategoryBar from "./CategoryBar";
import Dish from "./Dish";

function Menu({ dishes }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

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