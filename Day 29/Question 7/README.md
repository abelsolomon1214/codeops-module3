# Question 7 - Focus Input with useRef

A React application that automatically focuses a search input when the component mounts.

## Features

* React `useRef()` hook
* Automatic input focus
* `useEffect()` for DOM interaction
* Simple CSS styling

## How It Works

A ref is created using `useRef()`:

```javascript
const searchInputRef = useRef(null);
```

The ref is attached to the input:

```jsx
<input ref={searchInputRef} />
```

The input is focused inside a `useEffect()`:

```javascript
useEffect(() => {
  searchInputRef.current.focus();
}, []);
```

The empty dependency array means the effect runs after the component mounts.

## Why Focus Must Be Inside an Effect

React must render and mount the input before the input can be accessed through the ref.

The process is:

1. React renders the component.
2. The input is added to the DOM.
3. React assigns the input element to the ref.
4. The effect runs.
5. The input is focused.

Trying to call `.focus()` during rendering can happen before the DOM element is available.

The effect is therefore the appropriate place for this DOM interaction.

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
2. The search input should automatically have focus.
3. Start typing immediately without clicking the input.
4. Confirm that the text appears inside the search input.
5. Refresh the page and confirm the input receives focus again.

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
* `useRef()`
* `useEffect()`
* DOM focus
* CSS
* ESLint
