function MenuItem({
  name,
  price,
  description,
  category,
  emoji,
  image,
}) {
  return (
    <article className={`menu-card ${category.toLowerCase()}`}>
      <img
        src={image}
        alt={name}
        className="menu-image"
      />

      <div className="menu-card-content">
        <h3>
          {emoji} {name}
        </h3>

        <p className="description">{description}</p>

        <span className="category">{category}</span>

        <p className="price">{price} ETB</p>
      </div>
    </article>
  );
}

export default MenuItem;