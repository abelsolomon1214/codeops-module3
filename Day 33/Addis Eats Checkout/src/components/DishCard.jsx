import { Link } from "react-router-dom";

function DishCard({ dish, onAddToCart }) {
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

          <button type="button" onClick={() => onAddToCart(dish)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default DishCard;