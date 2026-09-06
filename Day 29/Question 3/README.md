# Question 3 - Loading and Error States

A React menu application that fetches dish data from a JSON file and displays loading and error states before rendering the dish list.

## Features

* Dish data stored in `public/dishes.json`
* Data loaded using `fetch()`
* `useEffect()` with an empty dependency array
* Loading state while data is being fetched
* Error state when fetching fails
* Early returns for loading and error states
* Category filtering
* Dynamic browser document title
* Simple CSS styling

## How It Works

The application starts with a loading state:

```javascript
const [loading, setLoading] = useState(true);
```

While the data is being fetched, the application displays:

```text
Loading dishes...
```

If the fetch fails, an error message is stored in state:

```javascript
setError("Failed to load dishes.");
```

The component uses early returns before rendering the dish list:

```javascript
if (loading) {
  return <p>Loading dishes...</p>;
}

if (error) {
  return <p>{error}</p>;
}
```

This means the dish list is rendered only after the data has successfully loaded.

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

Test the application by:

1. Opening the application.
2. Confirming the loading state appears while data is loading.
3. Confirming the dishes appear after loading.
4. Selecting the Vegetarian category.
5. Selecting the Meat category.
6. Checking that the browser title updates.
7. Temporarily changing `/dishes.json` to an invalid path in `fetch()` and confirming the error state appears.

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
* JSON
* CSS
* ESLint
