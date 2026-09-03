const loadDishes = async (category = "All", signal) => {
  const response = await fetch("/dishes.json", { signal });

  if (!response.ok) {
    throw new Error("Failed to load dishes.");
  }

  const dishes = await response.json();

  if (category === "All") {
    return dishes;
  }

  return dishes.filter(
    (dish) => dish.category === category
  );
};

export default loadDishes;