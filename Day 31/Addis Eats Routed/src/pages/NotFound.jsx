import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">404</p>

      <h2>Page Not Found</h2>

      <p>
        Sorry, the page you are looking for does not exist.
      </p>

      <Link className="primary-button" to="/">
        Back Home
      </Link>
    </section>
  );
}

export default NotFound;