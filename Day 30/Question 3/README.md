# Day 30 - Question 3: Cart Reducer

A React project that demonstrates a `cartReducer` with `add`, `remove`, and `clear` actions.

## Features

* `add` action adds an item to the cart
* `remove` action removes an item by ID
* `clear` action removes all items
* Reducer is tested directly with plain JavaScript objects
* Reducer returns new state instead of modifying the existing state

## Reducer Actions

### Add

```js
{ type: "add", item: { id: 3, name: "Doro Wot", price: 450 } }
```

Adds the item to the cart.

### Remove

```js
{ type: "remove", id: 1 }
```

Removes the item with the matching ID.

### Clear

```js
{ type: "clear" }
```

Returns an empty cart.

## How to Run

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal and check the browser console.

## Validation

Run ESLint:

```bash
npm run lint
```

Build the project:

```bash
npm run build
```

## Technologies

* React
* Vite
* JavaScript
* Reducer pattern
