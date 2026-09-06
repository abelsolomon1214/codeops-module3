# Question 4 - Handle HTTP Errors

A React menu application that fetches dish data from a JSON file and checks the HTTP response before processing the data.

## Features

* Dish data stored in `public/dishes.json`
* Data loaded using `fetch()`
* HTTP response checked using `response.ok`
* Clear error message for failed HTTP requests
* 404 errors reach the error branch
* Loading state
* Error state
* Category filtering
* Dynamic browser document title
* Simple CSS styling

## How It Works

The application checks whether the HTTP response was successful:

```javascript
if (!response.ok) {
  throw new Error(`Failed to load dishes: ${response.status}`);
}
```

This is important because `fetch()` does not automatically reject the promise when the server returns an HTTP error such as `404`.

When `response.ok` is false, an error is thrown and handled by the `catch()` block:

```javascript
.catch((error) => {
  setError(error.message);
  setLoading(false);
});
```

The error state is then displayed using an early return:

```javascript
if (error) {
  return <p>{error}</p>;
}
```

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

Test the successful request:

1. Open the application.
2. Confirm that all four dishes appear.
3. Select Vegetarian and Meat categories.
4. Confirm the browser title updates.

Test the 404 error:

1. Open `src/App.jsx`.
2. Temporarily change:

```javascript
fetch("/dishes.json")
```

to:

```javascript
fetch("/missing.json")
```

3. Save the file.
4. Refresh the browser.

The page should display a message similar to:

```text
Failed to load dishes: 404
```

Restore the correct path afterward:

```javascript
fetch("/dishes.json")
```

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
* HTTP response handling
* JSON
* CSS
* ESLint
