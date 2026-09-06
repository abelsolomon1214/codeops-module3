# Day 30 - Question 2: Custom useFetch Hook

A React application that extracts reusable data-fetching logic into a custom `useFetch` hook.

## Features

* Custom `useFetch` hook
* Fetches data with `fetch()`
* Handles loading state
* Handles error state
* Uses `AbortController` for cleanup
* Used by two different components
* Fetches dish data from `public/dishes.json`

## Components

### useFetch

The `useFetch` hook contains the reusable fetching logic and returns:

* `data`
* `loading`
* `error`

### DishList

Uses `useFetch` to retrieve and display all dishes.

### DishCount

Uses the same `useFetch` hook to retrieve the dishes and display the total number of dishes.

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
* React Hooks
* Custom Hooks
* Fetch API
