# Addis Eats Store

A React-based Ethiopian food ordering application focused on **state management, shared application state, authentication, theme management, and persistent cart data**.

This project is a continuation of the Day 31 **Addis Eats Routed** application. The main goal of Day 32 is to improve the application's state architecture by moving frequently updated cart state from React Context into a **Zustand store**, while keeping lower-frequency shared state such as authentication and theme management in **React Context**.

---

## Project Overview

Addis Eats Store allows users to:

* Browse Ethiopian dishes
* Filter dishes by category
* View individual dish details
* Add dishes to a shopping cart
* Remove dishes from the cart
* Clear the cart
* View the calculated order total
* Sign in before accessing checkout
* Sign out of the application
* Switch between light and dark themes
* Keep cart items after refreshing the page

The project demonstrates how different state-management approaches can be selected based on the type and frequency of state changes.

---

## Learning Objectives

This project was built to practice:

* React Context API
* Custom context hooks
* Zustand
* Zustand persistence middleware
* State selectors
* Derived state
* Protected routes
* React Router
* Local storage
* Theme management
* Authentication state
* Component architecture
* State-management design decisions

---

## Key Features

### Shopping Cart

The cart is managed with Zustand and provides:

* Add item
* Remove item
* Clear cart
* Persistent cart storage
* Derived order total

### Authentication

Authentication state is managed with React Context.

Users must be signed in before accessing the checkout page.

The authentication state is persisted using `localStorage` so the demonstration session can survive a page refresh.

### Theme Management

Theme state is managed with a separate React Context.

Users can switch between:

* Light theme
* Dark theme

The selected theme is also persisted in `localStorage`.

### Persistent Cart

The Zustand `persist` middleware stores cart data in browser storage.

Therefore, cart items remain available after a full page refresh.

### Protected Checkout

The checkout route is protected by the `RequireAuth` component.

Unauthenticated users are redirected to the login page and returned to their requested destination after signing in.

### Category Filtering

The menu supports filtering by:

* All
* Vegan
* Vegetarian
* Meat

The selected category is represented in the URL query parameters.

---

## State Management Architecture

The application intentionally uses different state-management solutions for different responsibilities.

```text
                    Addis Eats Store
                           |
             ┌─────────────┴─────────────┐
             |                           |
        Application State            Local State
             |
     ┌───────┴────────┐
     |                |
  Zustand           Context API
     |                |
   Cart          ┌────┴────┐
     |            |         |
  items        Auth       Theme
  actions
  persist
```

### Zustand → Cart

The shopping cart is managed by Zustand because it is shared by multiple components and changes frequently.

Components can subscribe directly to the specific state they need.

For example:

```jsx
const items = useCartStore((state) => state.items);
```

This avoids making every cart consumer depend on an entire Context value.

### Context API → Authentication

Authentication is managed with React Context because authentication information changes relatively infrequently and is naturally shared throughout the application.

Components access authentication through the custom `useAuth` hook:

```jsx
const { isAuthenticated, logout } = useAuth();
```

The custom hook also provides an error if it is accidentally used outside the `AuthProvider`.

### Context API → Theme

Theme state is kept in its own context rather than being combined with authentication or cart state.

This keeps each shared state responsibility independent and easier to maintain.

---

## Why Zustand for the Cart?

The cart is a good candidate for a dedicated state store because several different parts of the application need access to it.

For example:

* Menu needs the `addItem` action
* Dish details need the `addItem` action
* Cart needs the items and cart actions
* Checkout needs the items and clear action
* Other components can subscribe to cart data without requiring a Context provider

Zustand also allows components to select only the state they need.

Example:

```jsx
const addItem = useCartStore((state) => state.addItem);
```

This is a narrow selector because the component subscribes only to the `addItem` action rather than the entire store.

---

## Why Context API for Authentication and Theme?

Context is still useful for application-wide values that do not require a dedicated state-management library.

Authentication and theme are relatively small shared concerns.

The application therefore uses separate providers:

```text
AuthProvider
    |
    └── authentication state

ThemeProvider
    |
    └── theme state
```

Keeping them separate prevents unrelated application state from being bundled into one large context.

---

## Persistence

Two types of state are persisted in browser storage.

### Cart

Zustand persistence uses:

```text
addis-eats-cart
```

Cart state is automatically restored when the application loads again.

### Authentication

The authentication demonstration uses:

```text
addisEatsUser
```

The signed-in email is restored when the application starts.

### Theme

The theme uses:

```text
addisEatsTheme
```

This allows the user's selected theme to remain after refreshing the page.

---

## Derived State

The cart total is **not stored separately**.

Instead, it is calculated from the current cart items:

```jsx
const total = items.reduce(
  (sum, item) => sum + item.price,
  0
);
```

This avoids having two sources of truth.

If the application stored both:

```text
items
total
```

the values could become inconsistent.

By deriving the total from `items`, the total always reflects the current cart state.

---

## Project Structure

```text
Addis Eats Store/
├── public/
├── src/
│   ├── components/
│   │   ├── DishCard.jsx
│   │   ├── Layout.jsx
│   │   └── RequireAuth.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── AuthProvider.jsx
│   │   ├── ThemeContext.jsx
│   │   ├── ThemeProvider.jsx
│   │   ├── useAuth.js
│   │   └── useTheme.js
│   │
│   ├── data/
│   │   └── dishes.js
│   │
│   ├── pages/
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── DishDetail.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Menu.jsx
│   │   └── NotFound.jsx
│   │
│   ├── store/
│   │   └── cartStore.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
└── README.md
```

---

## Technologies

* React
* JavaScript
* React Router
* Zustand
* Vite
* CSS
* Browser localStorage
* ESLint

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

The application will be available through the local Vite development server.

### 3. Build for production

```bash
npm run build
```

---

## Testing and Validation

The project was checked using ESLint:

```bash
npx eslint "src"
```

The production build was also verified:

```bash
npm run build
```

Manual testing covered:

* Light/dark theme switching
* Theme persistence after refresh
* User sign-in
* Protected checkout route
* Sign-out behavior
* Adding items to the cart
* Removing items from the cart
* Clearing the cart
* Cart persistence after refresh
* Removal of the previous Cart Context implementation

---

## Authentication Note

The authentication system in this project is a **frontend demonstration of application state management**.

The user's email is stored in browser `localStorage` to simulate a persistent session.

This implementation is not intended to provide production-level authentication or security.

A production application would normally use a backend authentication system, secure session management, and appropriate authorization controls.

---

## State Management Rules

The project follows these state-management decisions:

| State            | Solution              | Reason                             |
| ---------------- | --------------------- | ---------------------------------- |
| Cart items       | Zustand               | Shared and frequently updated      |
| Cart actions     | Zustand               | Centralized store actions          |
| Cart persistence | Zustand persist       | Survive page refresh               |
| Authentication   | React Context         | Small, application-wide state      |
| Theme            | React Context         | Small shared preference            |
| Menu category    | URL search parameters | Represents navigation/filter state |
| Form input       | React `useState`      | Local component state              |
| Cart total       | Derived state         | Avoid duplicate state              |

---

## Architecture Principles

This project follows several important React architecture principles:

### Single Responsibility

Each provider and store has one clear responsibility.

### Separation of Concerns

Cart, authentication, theme, routing, and page-level state are handled independently.

### Narrow State Selection

Components using Zustand select only the state or action they require.

### Single Source of Truth

Cart items are stored once, while values such as the total are derived from them.

### Guarded Context Access

Custom hooks such as `useAuth` and `useTheme` provide clear errors when used outside their corresponding providers.

### Persistent User Experience

Important client-side state survives browser refreshes where appropriate.

---

## Future Improvements

Possible improvements for a production version include:

* Backend authentication
* Real user accounts
* Secure session management
* API-based dish data
* Cart quantities instead of duplicate cart entries
* Order history
* Payment integration
* Backend order processing
* Database integration
* Automated unit and integration tests
* Accessibility improvements
* Loading and error states for API requests

---

## Conclusion

Addis Eats Store demonstrates how React applications can combine different state-management techniques instead of forcing all state into a single solution.

The project uses **Zustand for shared cart state** because the cart is accessed and updated across multiple parts of the application, while **React Context is used for authentication and theme state** because these are smaller, relatively infrequently changing application-wide concerns.

The result is a more organized state architecture with persistent cart data, protected navigation, independent contexts, and narrow Zustand selectors.
