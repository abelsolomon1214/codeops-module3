import Header from "./Header";
import Dish from "./Dish";

function App() {
  return (
    <main>
      <Header />

      <section>
        <Dish name="Shiro" price={180} />
        <Dish name="Tibs" price={350} />
      </section>
    </main>
  );
}

export default App;