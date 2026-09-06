# Question 2 - Fetch Dishes from JSON

A React menu application that loads dish data from a JSON file in the public folder using `fetch()` and `useEffect()`.

## Features

* Dish data stored in `public/dishes.json`
* Data loaded using `fetch()`
* `useEffect()` with an empty dependency array
* React state for storing fetched dishes
* Category filtering
* Dynamic browser document title
* Simple CSS styling

## How It Works

The dish data is stored outside the React component in:

```text
public/dishes.json
```

The application fetches the data when the component first mounts:

```javascript
useEffect(() => {
  fetch("/dishes.json")
    .then((response) => response.json())
    .then((data) => setDishes(data));
}, []);
```

The empty dependency array means the fetch runs once when the component mounts.

After the JSON data is received, it is stored in React state and displayed in the menu.

The menu can then filter the fetched dishes by category.

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

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Also test the application by:

1. Opening the menu.
2. Confirming that all four dishes appear.
3. Selecting Vegetarian.
4. Selecting Meat.
5. Checking that the browser title updates with the number of displayed dishes.
6. Opening `/dishes.json` in the browser and confirming the JSON data loads.

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
