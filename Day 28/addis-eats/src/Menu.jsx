import { useState } from "react";
import menu from "./data";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dishes, setDishes] = useState(
    menu.map((dish) => ({
      ...dish,
      count: 0,
    }))
  );

  const handleAdd = (id) => {
    setDishes((currentDishes) =>
      currentDishes.map((dish) =>
        dish.id === id
          ? { ...dish, count: dish.count + 1 }
          : dish
      )
    );
  };

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter(
          (dish) => dish.category === selectedCategory
        );

  const orderTotal = dishes.reduce(
    (total, dish) => total + dish.price * dish.count,
    0
  );

  return (
    <section className="menu">
      <h2>Our Menu</h2>

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