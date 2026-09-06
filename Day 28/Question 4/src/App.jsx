import Menu from "./Menu";

const dishes = [
  { id: 1, name: "Shiro", price: 180, category: "Vegetarian" },
  { id: 2, name: "Tibs", price: 350, category: "Meat" },
  { id: 3, name: "Beyaynetu", price: 250, category: "Vegetarian" },
  { id: 4, name: "Doro Wot", price: 450, category: "Meat" },
];

function App() {
  return (
    <main>
      <h1>Addis Eats</h1>
      <Menu dishes={dishes} />
    </main>
  );
}

export default App;