import Menu from "./Menu";

const dishes = [
  { id: 1, name: "Shiro", price: 180, spicy: false },
  { id: 2, name: "Tibs", price: 350, spicy: true },
  { id: 3, name: "Doro Wot", price: 450, spicy: true },
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