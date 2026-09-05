import PropTypes from "prop-types";

function Dish({ name, price, spicy }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>Price: {price} ETB</p>

      {Boolean(spicy) && <span>Spicy</span>}
    </article>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
};

export default Dish;