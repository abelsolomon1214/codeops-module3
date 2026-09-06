import Dish from "./Dish";

function DishList({ dishes, onAdd }) {
  console.log("DishList rendered");

  return (
    <section>
      <h2>Menu</h2>

      {dishes.map((dish) => (
        <Dish key={dish.id} dish={dish} onAdd={onAdd} />
      ))}
    </section>
  );
}

export default DishList;