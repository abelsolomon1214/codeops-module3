import { Link, useParams } from "react-router-dom";
import useCartStore from "../store/cartStore";
import dishes from "../data/dishes";

function DishDetail() {
  const { id } = useParams();
  const addItem = useCartStore((state) => state.addItem);

  const dish = dishes.find((item) => item.id === Number(id));

  if (!dish) {
    return (
      <section className="not-found">
        <h2>Dish Not Found</h2>
        <p>We could not find a dish with that ID.</p>
        <Link className="primary-button" to="/menu">
          Back to Menu
        </Link>
      </section>
    );
  }

  return (
    <section className="dish-detail">
      <img src={dish.image} alt={dish.name} />

      <div className="dish-detail-content">
        <p className="eyebrow">{dish.category}</p>

        <h2>{dish.name}</h2>

        <p>{dish.description}</p>

        <p className="dish-price">{dish.price} ETB</p>

        <div className="dish-actions">
          <button type="button" onClick={() => addItem(dish)}>
            Add to Cart
          </button>

          <Link to="/menu">Back to Menu</Link>
        </div>
      </div>
    </section>
  );
}

export default DishDetail;