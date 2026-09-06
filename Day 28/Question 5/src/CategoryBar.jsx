const categories = ["All", "Vegetarian", "Meat"];

function CategoryBar({ selected, onSelect }) {
  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={selected === category ? "selected" : ""}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;