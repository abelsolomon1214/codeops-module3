import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found">
        <div className="not-found__number">404</div>

        <div className="not-found__content">
          <span className="eyebrow">NOT ON THE MENU</span>

          <h1>We couldn&apos;t find that page.</h1>

          <p>
            The dish or page you&apos;re looking for may have moved, or it may
            not exist. Let&apos;s get you back to something delicious.
          </p>

          <div className="not-found__actions">
            <Link href="/menu" className="button button--primary">
              Explore the menu
              <span aria-hidden="true">→</span>
            </Link>

            <Link href="/" className="button button--secondary">
              Back home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}