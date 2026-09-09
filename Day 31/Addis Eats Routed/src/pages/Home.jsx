import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">Welcome to Addis Eats</p>

        <h2>Discover the taste of Ethiopia</h2>

        <p>
          Explore traditional Ethiopian dishes, add your favorites to your
          cart, and enjoy a simple ordering experience.
        </p>

        <Link className="primary-button" to="/menu">
          Explore Menu
        </Link>
      </div>
    </section>
  );
}

export default Home;