import useFetch from "./useFetch";

function DishList() {
  const { data, loading, error } = useFetch("/dishes.json");

  if (loading) {
    return <p>Loading dishes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Dish List</h2>

      {data.map((dish) => (
        <article className="dish-card" key={dish.id}>
          <h3>{dish.name}</h3>
          <p>Price: {dish.price} ETB</p>
          <p>Category: {dish.category}</p>
        </article>
      ))}
    </section>
  );
}

export default DishList;