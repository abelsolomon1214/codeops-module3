# Day 30 Question 4 - useState vs useReducer

A React application comparing two ways to manage three related form values.

## Versions

### useState Version

The first component uses three separate `useState` calls:

- `name`
- `phone`
- `area`

### useReducer Version

The second component stores the related values in one state object and uses `useReducer` with actions:

- `setName`
- `setPhone`
- `setArea`

## Comparison

`useState` is simple and works well when state values are independent.

`useReducer` is useful when multiple related state values have structured updates or more complex state transitions.

## Technologies

- React
- Vite
- JavaScript
- ESLint

## How to Run

```bash
npm install
npm run dev