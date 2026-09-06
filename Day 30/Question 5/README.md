# Day 30 Question 5 - CartProvider

A React application that manages cart state with `useReducer` and shares the cart through Context.

## Features

- `CartProvider` owns the cart reducer and state.
- `CartContext` provides cart data to child components.
- `items` contains the current cart items.
- `dispatch` sends actions to the reducer.
- `total` is derived from the current cart items.
- Supports adding, removing, and clearing cart items.

## Architecture

```text
App
└── CartProvider
    └── Cart
        └── useContext(CartContext)