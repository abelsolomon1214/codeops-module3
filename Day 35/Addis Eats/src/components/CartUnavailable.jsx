function CartUnavailable() {
  return (
    <section className="error-fallback" role="alert">
      <h2>Cart temporarily unavailable</h2>
      <p>
        We could not display your cart. Your other Addis Eats features
        are still available.
      </p>
      <button type="button" onClick={() => window.location.reload()}>
        Reload Cart
      </button>
    </section>
  );
}

export default CartUnavailable;