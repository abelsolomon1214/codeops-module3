import PropTypes from "prop-types";

function Dish({
  name,
  price,
  currency = "ETB",
  spicy = false,
  image,
  description,
  category,
  count = 0,
  onAdd,
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

        <p className="description">{description}</p>

        <span className="category">{category}</span>

        <p className="price">
          {price} {currency}
        </p>

        <div className="dish-actions">
          <button type="button" onClick={onAdd}>
            Add
          </button>

          {count > 0 && (
            <span className="dish-count">
              Added: {count}
            </span>
          )}
        </div>
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
  count: PropTypes.number,
  onAdd: PropTypes.func.isRequired,
};

export default Dish;