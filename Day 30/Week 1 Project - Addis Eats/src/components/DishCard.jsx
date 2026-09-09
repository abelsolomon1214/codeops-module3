export default function DishCard({ dish, onAdd }) {
  return (
    <article className="dish-card">
      <div className="dish-image-wrapper">
        <img
          className="dish-image"
          src={dish.image}
          alt={dish.name}
        />

        {dish.spicy && (
          <span className="image-badge">
            🌶️ Spicy
          </span>
        )}
      </div>

      <div className="dish-card-content">
        <div className="dish-card-top">
          <span className="dish-category">
            {dish.category}
          </span>

          <span className="dish-price">
            {dish.price} ETB
          </span>
        </div>

        <h3>{dish.name}</h3>

        <p>{dish.description}</p>

        <button
          className="add-button"
          type="button"
          onClick={() => onAdd(dish)}
        >
          <span>Add to cart</span>
          <span>+</span>
        </button>
      </div>
    </article>
  );
}