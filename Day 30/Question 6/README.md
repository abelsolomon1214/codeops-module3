# Day 30 Question 6 - Memoised CartProvider

A React application that uses `useReducer`, Context, and `useMemo` to manage and share cart state.

## Features

- `CartProvider` owns the cart state and reducer.
- `CartContext` shares cart data with child components.
- `items` contains the current cart items.
- `dispatch` sends actions to the reducer.
- `total` is derived from the cart items.
- The provider value is memoised with `useMemo`.
- Supports adding, removing, and clearing cart items.

## Why useMemo is used

The object passed to the Context provider is memoised:

```jsx
const value = useMemo(
  () => ({
    items,
    dispatch,
    total,
  }),
  [items, total]
);