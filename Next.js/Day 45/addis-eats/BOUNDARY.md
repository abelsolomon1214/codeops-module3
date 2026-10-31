# Server/Client Component Boundaries

This document explains where Server Components and Client Components are used in Addis Eats and why each boundary exists.

## Component Inventory

| Component or file | Boundary | Justification |
|---|---|---|
| `src/app/layout.tsx` | Server | Defines the root HTML structure, metadata, and application layout without requiring client-side state. |
| `src/app/page.tsx` | Server | Renders the homepage without requiring browser-side state or event handlers. |
| `src/app/not-found.tsx` | Server | Renders the not-found interface without requiring client-side interactivity. |
| `src/providers.tsx` | Client | Wraps the application in the cart provider, allowing client-side context and state to be shared throughout the app. |
| `src/context/CartContext.tsx` | Client | Manages cart state and browser storage for cart persistence. |
| `src/app/menu/layout.tsx` | Server | Defines the shared menu layout and sidebar placement without requiring client-side state in the layout itself. |
| `src/app/menu/page.tsx` | Server | Loads dish data, reads URL search parameters, and filters dishes on the server. |
| `src/app/menu/DishList.tsx` | Server | Renders dish cards without its own React state or event handlers. |
| `src/app/menu/DishListServer.tsx` | Server-only utility | Reads dish data from the filesystem on the server. It is not a UI component and must not be imported into browser-side code. |
| `src/app/menu/CategoryBar.tsx` | Client | Acts as a client shell and receives the server-rendered dish list through its `children` prop. |
| `src/app/menu/AddToCartButton.tsx` | Client | Uses cart context and a click handler to add dishes to the cart. |
| `src/app/menu/MenuSidebar.tsx` | Client | Uses React state and an event handler for its interactive counter. |
| `src/app/menu/error.tsx` | Client | Implements a route-level error boundary with client-side error handling and recovery. |
| `src/app/menu/[id]/page.tsx` | Server | Loads and renders an individual dish using the route parameter and handles missing dishes. |
| `src/app/cart/CartContent.tsx` | Client | Provides interactive cart functionality using client-side state or cart context. |
| `src/app/checkout/CheckoutForm.tsx` | Client | Handles interactive form input, validation, and submission behavior on the client. |

## Key Architectural Decisions

### 1. Keep the root layout on the server

`src/app/layout.tsx` does not need a `"use client"` directive. It can render the application structure and include the `Providers` Client Component where client-side context is required.

### 2. Load menu data on the server

`src/app/menu/page.tsx` is an asynchronous Server Component. It loads dish data and applies category filtering using the URL's `category` search parameter.

Examples:

- `/menu` — displays all dishes.
- `/menu?category=Vegetarian` — displays vegetarian dishes.
- `/menu?category=Meat` — displays meat dishes.

The menu does not need a client-side fetching hook to load its initial dish data.

### 3. Keep dish cards as a Server Component

`DishList.tsx` does not need `"use client"` because it does not use its own React state, effects, or event handlers.

It can import `AddToCartButton`, a Client Component, for the interactive add-to-cart functionality. Importing a Client Component does not automatically turn the parent `DishList` into a Client Component.

### 4. Pass server-rendered content through `children`

`CategoryBar.tsx` acts as a Client Component shell:

- The server-rendered menu page loads and filters the dishes.
- The page renders `DishList` and passes it as `children`.
- `CategoryBar` places the supplied content beneath the category navigation.

This demonstrates Server-to-Client composition without passing ordinary callback functions from a Server Component to a Client Component.

### 5. Keep the cart interactive

`CartContext.tsx`, `Providers`, `AddToCartButton.tsx`, and the interactive cart and checkout components use client-side behavior where required.

The goal is to keep browser-side JavaScript limited to components that need interactivity while preserving the existing application behavior.

### 6. Understand the error boundary

`src/app/menu/error.tsx` requires `"use client"` because Next.js route error boundaries support client-side error handling and recovery actions, such as resetting the error boundary.

### 7. Understand the sidebar counter

`MenuSidebar.tsx` requires `"use client"` while it uses `useState` and an event handler for its counter. If that counter is only a development exercise, it can be removed from the final portfolio interface; the component should remain a Client Component only if other client-side behavior still requires it.

## Rendering and JavaScript Notes

- Server Components can render on the server without shipping their component implementation as client-side JavaScript.
- Client Components are used for browser-side state, context, effects, and event handlers.
- Client Components can receive server-rendered content through supported composition patterns such as `children`.
- Client-side imports and dependencies still contribute to the browser JavaScript bundle where required.
- The total generated JavaScript chunk sizes are not the same as the official route-level First Load JavaScript metric.

The Day 37 and Day 38 generated JavaScript chunk totals were measured separately. The official `/menu` First Load JavaScript comparison remains unverified, so no route-level reduction is claimed.

## Verification

The following checks completed successfully during Day 38 development:

```bash
npx tsc --noEmit
npm run build
```

These results confirm that the TypeScript check and production build succeeded at the time they were run. Re-run the commands after any subsequent code changes.
