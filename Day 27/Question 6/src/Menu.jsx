import PropTypes from "prop-types";
import Dish from "./Dish";

function Menu({ dishes }) {
  return (
    <section>
      {dishes.map((dish) => (
        <Dish
          key={dish.id}
          name={dish.name}
          price={dish.price}
          spicy={dish.spicy}
        />
      ))}
    </section>
  );
}

Menu.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      spicy: PropTypes.bool,
    })
  ).isRequired,
};

export default Menu;