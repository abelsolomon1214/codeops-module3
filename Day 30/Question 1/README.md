# Question 1 - Theme Context

A React application that uses `createContext()` and `useContext()` to share a theme value with a deeply nested component without passing the value through every component as a prop.

## Features

* `createContext()`
* `useContext()`
* Context Provider
* Deeply nested components
* No prop drilling
* Simple CSS styling

## How It Works

A theme context is created in `ThemeContext.jsx`:

```javascript
import { createContext } from "react";

const ThemeContext = createContext("light");

export default ThemeContext;
```

The context is provided by the parent component:

```jsx
<ThemeContext.Provider value={theme}>
  <main>
    <DeepComponent />
  </main>
</ThemeContext.Provider>
```

The value is `"dark"` in this exercise.

The value can then be consumed by a deeply nested component:

```javascript
const theme = useContext(ThemeContext);
```

The component tree is:

```text
App
└── ThemeContext.Provider
    └── DeepComponent
        └── MiddleComponent
            └── ThemeDisplay
```

The theme does not need to be passed through `DeepComponent` or `MiddleComponent`.

This avoids prop drilling.

## Why Context Is Useful

Without Context, a value needed by a deeply nested component may have to be passed through several components that do not actually use the value.

Context allows a parent component to provide a value that descendant components can read directly.

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

1. Open the application.
2. Confirm that `Addis Eats` appears.
3. Confirm that the deeply nested component appears.
4. Confirm that the page displays:

```text
Current theme: dark
```

5. Verify that `theme` is not passed as a prop through the intermediate components.

## Testing Commands

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
* `createContext()`
* `useContext()`
* Context Provider
* CSS
* ESLint
