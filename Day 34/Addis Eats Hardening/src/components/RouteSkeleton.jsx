function RouteSkeleton() {
  return (
    <section className="empty-state" aria-live="polite">
      <p className="eyebrow">Loading</p>
      <h2>Preparing your page...</h2>
      <p>Please wait a moment.</p>
    </section>
  );
}

export default RouteSkeleton;