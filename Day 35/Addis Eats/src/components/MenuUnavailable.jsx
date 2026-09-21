function MenuUnavailable() {
  return (
    <section className="error-fallback" role="alert">
      <h2>Menu temporarily unavailable</h2>
      <p>
        We could not display the menu right now. Please try again shortly.
      </p>
      <button type="button" onClick={() => window.location.reload()}>
        Reload Menu
      </button>
    </section>
  );
}

export default MenuUnavailable;