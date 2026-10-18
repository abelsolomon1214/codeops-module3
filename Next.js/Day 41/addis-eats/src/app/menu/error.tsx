"use client";

type MenuErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function MenuError({ error, reset }: MenuErrorProps) {
  return (
    <section className="menu-error">
      <div className="menu-error__content">
        <span className="eyebrow">SOMETHING WENT WRONG</span>

        <h1>We couldn&apos;t load the menu.</h1>

        <p>
          Something unexpected happened while loading the dishes. Please try
          again.
        </p>

        <button type="button" onClick={reset} className="button button--primary">
          Try again
          <span aria-hidden="true">↻</span>
        </button>

        {process.env.NODE_ENV === "development" && (
          <p className="menu-error__details">{error.message}</p>
        )}
      </div>
    </section>
  );
}