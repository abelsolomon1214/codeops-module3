import PropTypes from "prop-types";

function Dish({ name, price, spicy, currency = "ETB" }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>
        Price: {price} {currency}
      </p>

      {spicy && <p> Spicy</p>}
    </article>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
};

export default Dish;