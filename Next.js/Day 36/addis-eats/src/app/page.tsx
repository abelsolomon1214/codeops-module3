import Image from "next/image";
import Link from "next/link";

const featuredDishes = [
  {
    id: 1,
    name: "Shiro",
    category: "Vegetarian",
    description:
      "A smooth, comforting chickpea stew seasoned with traditional Ethiopian spices.",
    price: 180,
    image: "/images/shiro.jpg",
  },
  {
    id: 2,
    name: "Tibs",
    category: "Meat",
    description:
      "Tender pieces of sautéed beef with peppers, onions, and aromatic spices.",
    price: 350,
    image: "/images/tibs.jpg",
  },
  {
    id: 3,
    name: "Beyaynetu",
    category: "Vegetarian",
    description:
      "A colorful selection of Ethiopian vegetable and lentil dishes served together.",
    price: 250,
    image: "/images/beyaynetu.jpg",
  },
];

const highlights = [
  {
    number: "01",
    title: "Authentic flavors",
    description:
      "Traditional Ethiopian dishes presented with the care they deserve.",
  },
  {
    number: "02",
    title: "Simple ordering",
    description:
      "Explore the menu, choose your favorites, and move through checkout with ease.",
  },
  {
    number: "03",
    title: "Made for Addis",
    description:
      "A food experience inspired by the people, culture, and energy of Addis Ababa.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <span className="eyebrow">ETHIOPIAN FOOD · REIMAGINED</span>

          <h1>
            Discover the
            <span> taste of Ethiopia.</span>
          </h1>

          <p>
            From comforting shiro to sizzling tibs, explore dishes rooted in
            tradition and made for the way you eat today.
          </p>

          <div className="hero__actions">
            <Link href="/menu" className="button button--primary">
              Explore the menu
              <span aria-hidden="true">→</span>
            </Link>

            <Link href="#featured" className="button button--secondary">
              See what&apos;s featured
            </Link>
          </div>

          <div className="hero__meta">
            <div>
              <strong>4</strong>
              <span>Signature dishes</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>Ethiopian inspired</span>
            </div>

            <div>
              <strong>01</strong>
              <span>Simple experience</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__image-wrap">
            <Image
              src="/images/beyaynetu.jpg"
              alt="Traditional Ethiopian beyaynetu dish"
              fill
              priority
              sizes="(max-width: 900px) 90vw, 48vw"
              className="hero__image"
            />
          </div>

          <div className="hero__badge">
            <span>Featured today</span>
            <strong>Beyaynetu</strong>
            <small>Colorful. Traditional. Comforting.</small>
          </div>
        </div>
      </section>

      <section className="featured-section" id="featured">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FROM THE KITCHEN</span>
            <h2>Made to be remembered.</h2>
          </div>

          <Link href="/menu" className="text-link">
            View full menu <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="dish-grid">
          {featuredDishes.map((dish) => (
            <article className="dish-card" key={dish.id}>
              <Link href={`/menu/${dish.id}`} className="dish-card__image">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 30vw"
                />
                <span>{dish.category}</span>
              </Link>

              <div className="dish-card__body">
                <div className="dish-card__title">
                  <h3>{dish.name}</h3>
                  <strong>{dish.price} ETB</strong>
                </div>

                <p>{dish.description}</p>

                <Link href={`/menu/${dish.id}`} className="dish-card__link">
                  Discover dish <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="story-section">
        <div className="story-section__intro">
          <span className="eyebrow">THE ADDIS EATS IDEA</span>
          <h2>
            Familiar food.
            <br />
            A better experience.
          </h2>
        </div>

        <div className="story-section__content">
          <p className="story-section__lead">
            Ethiopian food is about more than a meal. It is about sharing,
            gathering, hospitality, and bold flavors. Addis Eats brings that
            spirit into a simple digital food experience.
          </p>

          <div className="highlight-list">
            {highlights.map((highlight) => (
              <div className="highlight" key={highlight.number}>
                <span>{highlight.number}</span>

                <div>
                  <h3>{highlight.title}</h3>
                  <p>{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-cta">
        <div>
          <span className="eyebrow">READY TO EXPLORE?</span>
          <h2>Your next favorite dish is waiting.</h2>
          <p>
            Browse the Addis Eats menu and discover something worth sharing.
          </p>
        </div>

        <Link href="/menu" className="button button--light">
          Explore the menu
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </>
  );
}