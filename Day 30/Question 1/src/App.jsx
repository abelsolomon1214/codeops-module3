import ThemeContext from "./ThemeContext";
import DeepComponent from "./DeepComponent";
import "./App.css";

function App() {
  const theme = "dark";

  return (
    <ThemeContext.Provider value={theme}>
      <main>
        <h1>Addis Eats</h1>
        <DeepComponent />
      </main>
    </ThemeContext.Provider>
  );
}

export default App;