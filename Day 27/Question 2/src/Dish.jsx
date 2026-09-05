function Dish({ name, price, spicy }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>Price: {price} ETB</p>

      {Boolean(spicy) && <span>Spicy</span>}
    </article>
  );
}

export default Dish;