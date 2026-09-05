import Dish from "./Dish";

function Menu({ dishes, category }) {
  const filteredDishes = dishes.filter(
    (dish) => dish.category === category
  );

  return (
    <section>
      {filteredDishes.map((dish) => (
        <Dish
          key={dish.id}
          name={dish.name}
          price={dish.price}
          category={dish.category}
        />
      ))}
    </section>
  );
}

export default Menu;