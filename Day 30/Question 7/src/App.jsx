import { useCallback, useState } from "react";
import DishList from "./DishList";
import "./App.css";

const dishes = [
  { id: 1, name: "Shiro", price: 180 },
  { id: 2, name: "Tibs", price: 350 },
  { id: 3, name: "Beyaynetu", price: 250 },
  { id: 4, name: "Doro Wot", price: 450 },
];

function App() {
  const [count, setCount] = useState(0);

  const handleAdd = useCallback((dish) => {
    console.log("Added:", dish.name);
  }, []);

  return (
    <main>
      <h1>Addis Eats</h1>

      <button onClick={() => setCount(count + 1)}>
        Parent Count: {count}
      </button>

      <DishList dishes={dishes} onAdd={handleAdd} />
    </main>
  );
}

export default App;