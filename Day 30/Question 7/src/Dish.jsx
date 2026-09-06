import { memo } from "react";

function Dish({ dish, onAdd }) {
  console.log(`Dish rendered: ${dish.name}`);

  return (
    <article className="dish-card">
      <h3>{dish.name}</h3>
      <p>Price: {dish.price} ETB</p>

      <button onClick={() => onAdd(dish)}>
        Add
      </button>
    </article>
  );
}

export default memo(Dish);