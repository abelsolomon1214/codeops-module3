
"use client";

import styles from "./CategoryBar.module.css";

type CategoryBarProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

const categories = ["All dishes", "Vegetarian", "Meat"];

export default function CategoryBar({
  selectedCategory,
  onCategoryChange,
}: CategoryBarProps) {
  return (
    <div className={styles.categoryBar} aria-label="Dish categories">
      {categories.map((category) => (
        <button
          type="button"
          className={`${styles.categoryButton} ${
            selectedCategory === category ? styles.categoryButtonActive : ""
          }`}
          key={category}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
