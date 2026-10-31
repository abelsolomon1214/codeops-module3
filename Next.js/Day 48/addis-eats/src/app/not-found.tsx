
import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.notFoundPage}>
      <section className={styles.notFound}>
        <div className={styles.notFoundNumber}>404</div>

        <div className={styles.notFoundContent}>
          <span className="eyebrow">NOT ON THE MENU</span>

          <h1>We couldn&apos;t find that page.</h1>

          <p>
            The dish or page you&apos;re looking for may have moved, or it may
            not exist. Let&apos;s get you back to something delicious.
          </p>

          <div className={styles.notFoundActions}>
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
