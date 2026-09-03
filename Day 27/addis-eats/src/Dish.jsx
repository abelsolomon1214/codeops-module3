import PropTypes from "prop-types";

function Dish({
  name,
  price,
  currency = "ETB",
  spicy = false,
  image,
  description,
  category,
}) {
  return (
    <article className={`menu-card ${category.toLowerCase()}`}>
      <img
        src={image}
        alt={name}
        className="menu-image"
      />

      <div className="menu-card-content">
        <h3>
          {name}{" "}
          {spicy && (
            <span className="spicy-badge">
              • Spicy
            </span>
          )}
        </h3>

        <p className="description">
          {description}
        </p>

        <span className="category">
          {category}
        </span>

        <p className="price">
          {price} {currency}
        </p>
      </div>
    </article>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  spicy: PropTypes.bool,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default Dish;