import { Link } from "react-router-dom";
import dishes from "../data/dishes";

const signatureDishes = [
  dishes.find((dish) => dish.name === "Shiro"),
  dishes.find((dish) => dish.name === "Tibs"),
  dishes.find((dish) => dish.name === "Doro Wot"),
].filter(Boolean);

const featuredDishes = dishes.slice(0, 6);

function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <img
          className="home-hero-image"
          src="/images/beyaynetu.jpg"
          alt="Traditional Ethiopian food served with injera"
        />

        <div className="home-hero-overlay"></div>

        <div className="home-hero-content">
          <p className="eyebrow">Addis Ababa · Ethiopia</p>

          <h1>
            The taste of Ethiopia,
            <span> made for Addis.</span>
          </h1>

          <p>
            Discover traditional Ethiopian dishes, prepared with familiar
            flavors and delivered with a modern ordering experience.
          </p>

          <div className="home-hero-actions">
            <Link className="primary-button" to="/menu">
              Explore the Menu
            </Link>

            <a className="secondary-button" href="#experience">
              Our Story
            </a>
          </div>
        </div>

        <div className="hero-location">
          <span>Serving</span>
          <strong>Bole · Kazanchis · Piassa · Megenagna</strong>
        </div>
      </section>

      <section className="home-intro">
        <div className="section-label">
          <span>01</span>
          <span>About Addis Eats</span>
        </div>

        <div className="home-intro-content">
          <h2>
            Ethiopian food has always been
            <em> an experience.</em>
          </h2>

          <p>
            Addis Eats brings that experience into a simple modern ordering
            journey. From comforting shiro to rich doro wot and sizzling tibs,
            we celebrate the dishes that make Ethiopian dining special.
          </p>

          <Link to="/menu" className="text-link">
            Discover our dishes <span>→</span>
          </Link>
        </div>
      </section>

      <section className="signature-section">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">From our kitchen</p>
            <h2>Signature dishes</h2>
          </div>

          <Link to="/menu" className="text-link">
            View full menu <span>→</span>
          </Link>
        </div>

        <div className="signature-grid">
          {signatureDishes.map((dish) => (
            <article className="signature-card" key={dish.id}>
              <Link to={`/menu/${dish.id}`} className="signature-image-link">
                <img src={dish.image} alt={dish.name} />
              </Link>

              <div className="signature-card-content">
                <div>
                  <p className="dish-category">{dish.category}</p>
                  <h3>{dish.name}</h3>
                </div>

                <span className="dish-price">{dish.price} ETB</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="menu-preview">
        <div className="section-heading-centered">
          <p className="eyebrow">Explore the menu</p>
          <h2>Made for every table</h2>
          <p>
            Explore familiar Ethiopian favorites, from hearty vegan dishes to
            rich meat specialties and traditional coffee.
          </p>
        </div>

        <div className="home-category-links">
          <Link to="/menu">All dishes</Link>
          <Link to="/menu?category=Vegan">Vegan</Link>
          <Link to="/menu?category=Vegetarian">Vegetarian</Link>
          <Link to="/menu?category=Meat">Meat</Link>
        </div>

        <div className="home-menu-grid">
          {featuredDishes.map((dish) => (
            <article className="home-menu-card" key={dish.id}>
              <Link to={`/menu/${dish.id}`} className="home-menu-image">
                <img src={dish.image} alt={dish.name} />
              </Link>

              <div className="home-menu-card-content">
                <div>
                  <p className="dish-category">{dish.category}</p>
                  <h3>{dish.name}</h3>
                </div>

                <span className="dish-price">{dish.price} ETB</span>
              </div>

              <Link
                className="home-menu-details"
                to={`/menu/${dish.id}`}
              >
                View dish
              </Link>
            </article>
          ))}
        </div>

        <div className="section-action">
          <Link className="primary-button" to="/menu">
            Explore the full menu
          </Link>
        </div>
      </section>

      <section className="experience-section" id="experience">
        <div className="experience-image">
          <img
            src="/images/buna.jpg"
            alt="Traditional Ethiopian coffee"
          />
        </div>

        <div className="experience-content">
          <p className="eyebrow">02 · The Addis experience</p>

          <h2>
            More than a meal.
            <em> A taste of home.</em>
          </h2>

          <p>
            Ethiopian food is about gathering, sharing and taking time to
            enjoy the table. Addis Eats keeps that spirit at the heart of every
            order.
          </p>

          <div className="experience-details">
            <div>
              <strong>01</strong>
              <span>Authentic flavors</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Fresh ingredients</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Made for Addis</span>
            </div>
          </div>
        </div>
      </section>

      <section className="addis-section">
        <div className="addis-content">
          <p className="eyebrow">03 · Around Addis</p>

          <h2>Good food, wherever you are in the city.</h2>

          <p>
            From the energy of Bole to the heart of Piassa, Addis Eats is
            designed around the neighborhoods and people of Addis Ababa.
          </p>

          <div className="area-list">
            <span>Bole</span>
            <span>Kazanchis</span>
            <span>Piassa</span>
            <span>Megenagna</span>
          </div>
        </div>
      </section>

      <section className="home-order-cta">
        <div>
          <p className="eyebrow">Ready when you are</p>

          <h2>Bring something delicious to the table.</h2>

          <p>
            Browse today's dishes and build your order in just a few steps.
          </p>
        </div>

        <Link className="primary-button" to="/menu">
          Start your order
        </Link>
      </section>
    </div>
  );
}

export default Home;
