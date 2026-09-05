import Dish from "./Dish";

function App() {
  return (
    <main>
      <h1>Addis Eats</h1>

      <Dish name="Shiro" price={180} />
      <Dish name="Tibs" price={350} />
    </main>
  );
}

export default App;