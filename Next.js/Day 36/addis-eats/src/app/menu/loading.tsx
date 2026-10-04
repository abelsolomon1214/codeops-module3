export default function MenuLoading() {
  return (
    <section className="menu-loading" aria-label="Loading menu">
      <div className="menu-loading__header">
        <div className="skeleton skeleton--eyebrow" />
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--text" />
      </div>

      <div className="menu-loading__grid">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="menu-loading__card" key={index}>
            <div className="skeleton skeleton--image" />

            <div className="menu-loading__body">
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