# Day 30 Question 7 - React.memo and useCallback

A React application that demonstrates how `React.memo` and `useCallback` can reduce unnecessary component renders.

## Features

* `Dish` is wrapped with `React.memo`.
* `handleAdd` is memoised with `useCallback`.
* The parent component has a counter that causes parent re-renders.
* The dish list can be profiled before and after memoisation.

## Why React.memo is used

`React.memo` prevents a component from re-rendering when its props have not changed.

## Why useCallback is used

`useCallback` keeps the same function reference between renders when its dependencies have not changed.

This is important because `React.memo` compares props. Without `useCallback`, a newly created callback function could cause the memoised child to render again.

## Profiling

Open React Developer Tools and use the **Profiler** tab.

1. Start recording.
2. Click the `Parent Count` button several times.
3. Observe which components render.
4. Compare the behavior with and without `React.memo` and `useCallback`.

The goal is to understand when memoisation prevents unnecessary renders.

## Technologies

* React
* Vite
* JavaScript
* ESLint

## How to Run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.
