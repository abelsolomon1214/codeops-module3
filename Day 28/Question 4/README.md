# Question 4 - Filter Dishes and Empty State

A React menu application that filters dishes based on the selected category and displays an empty-state message when no dishes match the selected category.

## Features

* Category state managed by the `Menu` component
* Category buttons rendered from an array
* Selected category highlighted
* Dish list filtered using `filter()`
* Filtered dishes rendered using `map()`
* Unique dish IDs used as React keys
* Empty-state message when no dishes match
* Reusable `CategoryBar` component
* Reusable `Dish` component

## How It Works

The `Menu` component stores the selected category using `useState()`.

When a category is selected, the dish list is filtered.

The `All` category displays every dish.

Other categories display only dishes whose category matches the selected category.

If the filtered list is empty, the application displays:

`No dishes found in this category.`

The `Dessert` category is included to demonstrate the empty state because there are no dessert dishes in the data.

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

## Technologies

* React
* Vite
* JavaScript
* React State
* Props
* Array `filter()`
* Array `map()`
* ESLint
