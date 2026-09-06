import { useReducer, useState } from "react";
import "./App.css";

const initialState = {
  name: "",
  phone: "",
  area: "",
};

function deliveryReducer(state, action) {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.value };

    case "setPhone":
      return { ...state, phone: action.value };

    case "setArea":
      return { ...state, area: action.value };

    default:
      return state;
  }
}

function UseStateVersion() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");

  return (
    <section>
      <h2>useState Version</h2>

      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Name"
      />

      <input
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        placeholder="Phone"
      />

      <input
        value={area}
        onChange={(event) => setArea(event.target.value)}
        placeholder="Area"
      />

      <p>
        {name} | {phone} | {area}
      </p>
    </section>
  );
}

function UseReducerVersion() {
  const [state, dispatch] = useReducer(deliveryReducer, initialState);

  return (
    <section>
      <h2>useReducer Version</h2>

      <input
        value={state.name}
        onChange={(event) =>
          dispatch({ type: "setName", value: event.target.value })
        }
        placeholder="Name"
      />

      <input
        value={state.phone}
        onChange={(event) =>
          dispatch({ type: "setPhone", value: event.target.value })
        }
        placeholder="Phone"
      />

      <input
        value={state.area}
        onChange={(event) =>
          dispatch({ type: "setArea", value: event.target.value })
        }
        placeholder="Area"
      />

      <p>
        {state.name} | {state.phone} | {state.area}
      </p>
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>Delivery Form Comparison</h1>

      <UseStateVersion />

      <UseReducerVersion />
    </main>
  );
}

export default App;