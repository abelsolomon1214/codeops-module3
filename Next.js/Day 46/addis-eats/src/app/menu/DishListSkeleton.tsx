
export default function DishListSkeleton() {
  return (
    <div
      className="menu-dish-grid"
      aria-label="Loading dishes"
      aria-busy="true"
    >
      {[1, 2, 3, 4].map((item) => (
        <div className="menu-dish-card" key={item}>
          <div
            className="menu-dish-card__image dish-skeleton__image"
            aria-hidden="true"
          />

          <div className="menu-dish-card__body">
            <div
              className="dish-skeleton__line dish-skeleton__line--title"
              aria-hidden="true"
            />

            <div
              className="dish-skeleton__line"
              aria-hidden="true"
            />

            <div
              className="dish-skeleton__line dish-skeleton__line--short"
              aria-hidden="true"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
