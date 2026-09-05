import Dish from "./Dish";

function App() {
  return (
    <main>
      <h1>Addis Eats</h1>

      <Dish name="Shiro" price={180} spicy={true} />
      <Dish name="Tibs" price={350} spicy={false} />
      <Dish name="Doro Wot" price={450} spicy="yes" />
      <Dish name="Beyaynetu" price={250} />
    </main>
  );
}

export default App;