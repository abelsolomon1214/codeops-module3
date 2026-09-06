function Dish({ name, price, category }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>Price: {price} ETB</p>
      <p>Category: {category}</p>
    </article>
  );
}

export default Dish;