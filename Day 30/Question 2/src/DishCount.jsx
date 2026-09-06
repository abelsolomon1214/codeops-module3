import useFetch from "./useFetch";

function DishCount() {
  const { data, loading, error } = useFetch("/dishes.json");

  if (loading) {
    return <p>Loading dish count...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return <h2>Total dishes: {data.length}</h2>;
}

export default DishCount;