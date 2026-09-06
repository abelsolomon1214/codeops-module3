# Question 1 - Update Document Title

A React menu application that updates the browser document title based on the number of dishes currently displayed.

## Features

* React state for category selection
* Category filtering
* `useEffect()` for side effects
* Dynamic `document.title`
* Document title updates when the displayed dish count changes
* Simple CSS styling

## How It Works

The application filters the dishes based on the selected category.

The `useEffect()` hook watches the number of filtered dishes:

```javascript
useEffect(() => {
  document.title = `${filteredDishes.length} dishes`;
}, [filteredDishes.length]);
```

When the number of displayed dishes changes, the browser tab title is updated.

For example:

* All → `4 dishes`
* Vegetarian → `2 dishes`
* Meat → `2 dishes`

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

Also test the browser tab title by selecting different categories.

## Technologies

* React
* Vite
* JavaScript
* React State
* `useEffect()`
* DOM `document.title`
* CSS
* ESLint
