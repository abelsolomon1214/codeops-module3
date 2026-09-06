# Question 5 - Refetch When Category Changes

A React menu application that refetches the dish data whenever the selected category changes.

## Features

* Dish data stored in `public/dishes.json`
* Data loaded using `fetch()`
* Loading state
* Error state
* HTTP response validation with `response.ok`
* Category filtering
* Fetch effect depends on the selected category
* Dynamic browser document title
* Simple CSS styling

## How It Works

The selected category is stored in React state:

```javascript
const [selectedCategory, setSelectedCategory] = useState("All");
```

The `useEffect()` dependency array contains `selectedCategory`:

```javascript
useEffect(() => {
  // fetch data
}, [selectedCategory]);
```

Because `selectedCategory` is a dependency, the effect runs:

* When the component first loads
* Whenever the selected category changes

The fetched data is filtered according to the selected category before being stored in state.

For example:

```javascript
const filteredData =
  selectedCategory === "All"
    ? data
    : data.filter((dish) => dish.category === selectedCategory);
```

The selected category therefore controls which dishes are displayed.

## HTTP Error Handling

The response is checked using `response.ok`:

```javascript
if (!response.ok) {
  throw new Error(`Failed to load dishes: ${response.status}`);
}
```

This allows HTTP errors such as a 404 to reach the `catch()` block.

## Loading and Error States

While the request is running:

```text
Loading dishes...
```

If the request fails, the error message is displayed instead of the list.

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
2. Confirm all four dishes appear under `All`.
3. Click `Vegetarian`.
4. Confirm only Shiro and Beyaynetu appear.
5. Click `Meat`.
6. Confirm only Tibs and Doro Wot appear.
7. Observe that loading occurs again when the category changes.
8. Check that the browser title updates with the number of displayed dishes.

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
* JSON
* HTTP response handling
* CSS
* ESLint
