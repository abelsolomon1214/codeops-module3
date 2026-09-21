import { memo, useState } from "react";
import { Link } from "react-router-dom";

function DishCard({ dish, onAddToCart, onQuickView }) {
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    onAddToCart(dish);
    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1200);
  }
  return (
    <article className="dish-card">
      <img src={dish.image} alt={dish.name} />

      <div className="dish-card-content">
        <h3>{dish.name}</h3>

        <p className="dish-category">{dish.category}</p>

        <p>{dish.description}</p>

        <p className="dish-price">{dish.price} ETB</p>

        <div className="dish-actions">
          <Link to={`/menu/${dish.id}`}>View Details</Link>

          <button
            type="button"
            onClick={handleAddToCart}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
          
          <button
            type="button"
            onClick={() => onQuickView(dish)}
          >
            Quick View
          </button>
        </div>
      </div>
    </article>
  );
}

export default memo(DishCard);