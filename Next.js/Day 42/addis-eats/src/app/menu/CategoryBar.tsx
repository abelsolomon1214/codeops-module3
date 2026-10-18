
"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./CategoryBar.module.css";

const categories = [
  { label: "All dishes", href: "/menu" },
  { label: "Vegetarian", href: "/menu?category=Vegetarian" },
  { label: "Meat", href: "/menu?category=Meat" },
];

type CategoryBarProps = {
  selectedCategory: string;
  children: ReactNode;
};

export default function CategoryBar({
  selectedCategory,
  children,
}: CategoryBarProps) {
  return (
    <>
      <nav className={styles.categoryBar} aria-label="Dish categories">
        {categories.map((category) => (
          <Link
            key={category.label}
            href={category.href}
            aria-current={
              selectedCategory === category.label ? "page" : undefined
            }
            className={`${styles.categoryButton} ${
              selectedCategory === category.label
                ? styles.categoryButtonActive
                : ""
            }`}
          >
            {category.label}
          </Link>
        ))}
      </nav>

      {children}
    </>
  );
}
