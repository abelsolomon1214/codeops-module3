function Dish({ name, price }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>Price: {price} ETB</p>
    </article>
  );
}

export default Dish;