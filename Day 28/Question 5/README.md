# Question 5 - Running Order Total

A React menu application that keeps a running order total in state and displays the total in Ethiopian Birr (ETB).

## Features

* Category selection using React state
* Category filtering
* Reusable `CategoryBar` component
* Reusable `Dish` component
* Add button for each dish
* Running order total using `useState()`
* Dish price passed to the parent component
* Empty-state message when no dishes match
* Simple CSS styling
* Order total displayed in ETB

## How It Works

The `Menu` component stores the running order total using React state.

The total starts at `0`.

When a user clicks the Add button for a dish, the dish price is passed to the `Menu` component.

The total is then updated by adding the new price to the current total.

For example:

* Add Shiro: 180 ETB
* Add Tibs: 350 ETB
* Total: 530 ETB

The selected category can still be changed without resetting the running order total.

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

Test the application by:

1. Clicking Add on a dish.
2. Checking that the order total increases.
3. Adding multiple dishes.
4. Changing categories.
5. Confirming that the order total remains.
6. Selecting a category with no matching dishes if available.

## Technologies

* React
* Vite
* JavaScript
* React State
* Props
* Array `filter()`
* Array `map()`
* CSS
* ESLint
