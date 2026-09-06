# Question 6 - Abort Previous Fetch Request

A React menu application that cancels the previous fetch request when the selected category changes.

## Features

* Dish data stored in `public/dishes.json`
* Data loaded using `fetch()`
* Loading state
* Error state
* HTTP response validation
* Category filtering
* Refetching when the category changes
* `AbortController` for cancelling previous requests
* Cleanup function in `useEffect()`
* Dynamic browser document title
* Simple CSS styling

## How It Works

An `AbortController` is created inside the effect:

```javascript
const controller = new AbortController();
```

Its signal is passed to `fetch()`:

```javascript
fetch("/dishes.json", {
  signal: controller.signal,
});
```

The cleanup function aborts the request:

```javascript
return () => {
  controller.abort();
};
```

Because `selectedCategory` is in the dependency array, changing the category causes React to clean up the previous effect before starting the new one.

This prevents an old request from continuing unnecessarily.

## Handling Abort Errors

An aborted request produces an `AbortError`.

The application ignores that intentional cancellation:

```javascript
if (error.name === "AbortError") {
  return;
}
```

Other errors are still displayed to the user.

## How to Run

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Testing

1. Open the application.
2. Open Chrome DevTools.
3. Select the **Network** tab.
4. Select the **Fetch/XHR** filter.
5. Reload the page.
6. Confirm that `dishes.json` appears in the network requests.
7. Quickly switch between categories.
8. Observe the network requests and cancellation behavior.

For a more visible cancellation:

* Open DevTools Network tab.
* Change the network throttling from `No throttling` to a slower option such as `Slow 3G`.
* Quickly switch between `All`, `Vegetarian`, and `Meat`.
* The previous request can be cancelled when the category changes.

## Testing Commands

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

## Technologies

* React
* Vite
* JavaScript
* `useState()`
* `useEffect()`
* `fetch()`
* `AbortController`
* HTTP response handling
* JSON
* CSS
* ESLint
