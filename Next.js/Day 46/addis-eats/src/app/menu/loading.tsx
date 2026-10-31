
import styles from "./loading.module.css";

export default function MenuLoading() {
  return (
    <section
      className={styles.menuLoading}
      aria-label="Loading menu"
    >
      <div className={styles.menuLoadingHeader}>
        <div className="skeleton skeleton--eyebrow" />
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--text" />
      </div>

      <div className={styles.menuLoadingGrid}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div className={styles.menuLoadingCard} key={index}>
            <div className="skeleton skeleton--image" />

            <div className={styles.menuLoadingBody}>
              <div className="skeleton skeleton--small" />
              <div className="skeleton skeleton--dish-title" />
              <div className="skeleton skeleton--description" />
              <div className="skeleton skeleton--button" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
