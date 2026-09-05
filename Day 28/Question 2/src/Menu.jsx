import { useState } from "react";
import Dish from "./Dish";

const categories = ["All", "Vegetarian", "Meat"];

function Menu({ dishes }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  return (
    <section>
      <div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              fontWeight:
                selectedCategory === category ? "bold" : "normal",
            }}
          >
            {category}
          </button>
        ))}
      </div>

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