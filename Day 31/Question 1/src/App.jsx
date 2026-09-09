import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";

function Home() {
  return <h2>Home Page</h2>;
}

function Menu() {
  return <h2>Menu Page</h2>;
}

function Cart() {
  return <h2>Cart Page</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/cart">Cart</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;