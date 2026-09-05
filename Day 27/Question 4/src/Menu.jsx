import Dish from "./Dish";

function Menu({ dishes, category }) {
  const filteredDishes = dishes.filter(
    (dish) => dish.category === category
  );

  if (filteredDishes.length === 0) {
    return <p>No dishes found in this category.</p>;
  }

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