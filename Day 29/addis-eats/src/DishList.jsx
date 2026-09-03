import Dish from "./Dish";
import Card from "./Card";

function DishList({ dishes, onAdd }) {
  if (dishes.length === 0) {
    return (
      <p className="empty-state">
        No dishes found in this category.
      </p>
    );
  }

  return (
    <div className="menu-grid">
      {dishes.map((dish) => (
        <Card key={dish.id}>
          <Dish
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
            image={`/images/${dish.name
              .toLowerCase()
              .replaceAll(" ", "-")
              .replace("doro-wat", "doro-wet")}.jpg`}
            description={`${dish.category} dish`}
            category={dish.category}
            count={dish.count}
            onAdd={() => onAdd(dish.id)}
          />
        </Card>
      ))}
    </div>
  );
}

export default DishList;