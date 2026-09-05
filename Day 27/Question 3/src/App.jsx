import Card from "./Card";
import Dish from "./Dish";

function App() {
  return (
    <main>
      <h1>Addis Eats</h1>

      <Card>
        <Dish name="Shiro" price={180} />
      </Card>
    </main>
  );
}

export default App;