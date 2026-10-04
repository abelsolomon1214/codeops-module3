"use client";

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
    <div className="category-bar" aria-label="Dish categories">
      {categories.map((category) => (
        <button
          type="button"
          className={`category-button ${
            selectedCategory === category ? "category-button--active" : ""
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