import cartReducer from "./cartReducer";
import "./App.css";

function App() {
  const initialCart = [
    { id: 1, name: "Shiro", price: 180 },
    { id: 2, name: "Tibs", price: 350 },
  ];

  const afterAdd = cartReducer(initialCart, {
    type: "add",
    item: { id: 3, name: "Doro Wot", price: 450 },
  });

  const afterRemove = cartReducer(initialCart, {
    type: "remove",
    id: 1,
  });

  const afterClear = cartReducer(initialCart, {
    type: "clear",
  });

  console.log("Initial cart:", initialCart);
  console.log("After add:", afterAdd);
  console.log("After remove:", afterRemove);
  console.log("After clear:", afterClear);

  return (
    <main>
      <h1>Cart Reducer Test</h1>

      <h2>Initial Cart</h2>
      <p>{initialCart.length} items</p>

      <h2>After Add</h2>
      <p>{afterAdd.length} items</p>

      <h2>After Remove</h2>
      <p>{afterRemove.length} items</p>

      <h2>After Clear</h2>
      <p>{afterClear.length} items</p>
    </main>
  );
}

export default App;