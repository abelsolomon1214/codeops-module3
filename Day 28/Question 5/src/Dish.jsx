function Dish({ name, price, onAdd }) {
  return (
    <article className="dish-card">
      <h2>{name}</h2>
      <p>Price: {price} ETB</p>

      <button onClick={() => onAdd(price)}>Add</button>
    </article>
  );
}

export default Dish;