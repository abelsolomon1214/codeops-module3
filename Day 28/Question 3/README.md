# Question 3 - Lift Category State into Menu

A React menu application where the category selection state is owned by the `Menu` component and passed down to a reusable `CategoryBar` component through props.

## Features

* Category state managed by the `Menu` component
* Reusable `CategoryBar` component
* `selected` prop passed from `Menu` to `CategoryBar`
* `onSelect` callback passed from `Menu` to `CategoryBar`
* Category buttons rendered using `map()`
* Selected category highlighted with bold text
* Menu filtered based on the selected category
* Reusable `Dish` component

## How It Works

The `Menu` component owns the selected category state.

The `CategoryBar` component receives two props:

* `selected` - the currently selected category
* `onSelect` - the function used to change the selected category

When a category button is clicked, `CategoryBar` calls `onSelect()` and the state in `Menu` is updated.

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
* ESLint
