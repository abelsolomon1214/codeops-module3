import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  return (
    <main>
      <h1>Addis Eats</h1>

      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search dishes..."
      />
    </main>
  );
}

export default App;