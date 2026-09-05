import Dish from "./Dish";

const dishes = [
  { id: 1, name: "Shiro", price: 180 },
  { id: 2, name: "Tibs", price: 350 },
  { id: 3, name: "Beyaynetu", price: 250 },
];

function App() {
  return (
    <main>
      <h1>Addis Eats</h1>

      <section>
        {dishes.map((dish) => (
          <Dish
            key={dish.id}
            name={dish.name}
            price={dish.price}
          />
        ))}
      </section>
    </main>
  );
}

export default App;