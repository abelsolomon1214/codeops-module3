import menu from "./data";
import Dish from "./Dish";
import Card from "./Card";

function Menu({ category }) {
  const filteredMenu = menu.filter(
    (dish) => dish.category === category
  );

  if (filteredMenu.length === 0) {
    return (
      <section className="menu">
        <p className="empty-state">
          No dishes found in this category.
        </p>
      </section>
    );
  }

  return (
    <section className="menu">
      <h2>{category} Menu</h2>

      <div className="menu-grid">
        {filteredMenu.map((dish) => (
          <Card key={dish.id}>
            <Dish
              name={dish.name}
              price={dish.price}
              spicy={dish.spicy}
              image={dish.image}
              description={dish.description}
              category={dish.category}
            />
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Menu;