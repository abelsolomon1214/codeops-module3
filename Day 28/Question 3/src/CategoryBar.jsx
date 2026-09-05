const categories = ["All", "Vegetarian", "Meat"];

function CategoryBar({ selected, onSelect }) {
  return (
    <div>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          style={{
            fontWeight: selected === category ? "bold" : "normal",
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;