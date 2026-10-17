
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./MenuSidebar.module.css";

export default function MenuSidebar() {
  const [visitCount, setVisitCount] = useState(0);

  return (
    <aside className={styles.menuSidebar}>
      <div className={styles.menuSidebarIntro}>
        <span className="eyebrow">YOUR FOOD JOURNEY</span>
        <h2>Explore Addis Eats.</h2>
        <p>
          Discover Ethiopian favorites and find something delicious.
        </p>
      </div>

      <nav
        className={styles.menuSidebarNav}
        aria-label="Menu navigation"
      >
        <Link href="/menu" className={styles.menuSidebarLink}>
          All dishes <span aria-hidden="true">→</span>
        </Link>

        <Link href="/menu/1" className={styles.menuSidebarLink}>
          Featured dish <span aria-hidden="true">→</span>
        </Link>
      </nav>

      <div>
        <p>Navigation test: {visitCount}</p>
        <button type="button" onClick={() => setVisitCount((count) => count + 1)}>
          Increase counter
        </button>
      </div>
    </aside>
  );
}
