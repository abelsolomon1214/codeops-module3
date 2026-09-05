import { useState } from "react";

function Dish({ name, price }) {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount(count + 1);
  }

  return (
    <article>
      <h2>
        {name} ({count})
      </h2>

      <p>Price: {price} ETB</p>

      <button onClick={handleAdd}>Add</button>
    </article>
  );
}

export default Dish;