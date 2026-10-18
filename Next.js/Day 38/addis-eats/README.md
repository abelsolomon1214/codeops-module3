# Addis Eats — Next.js App Router

A portfolio-style Ethiopian food ordering frontend built with **Next.js 16, React 19, TypeScript, and the App Router**.

The project demonstrates file-based routing, nested layouts, static generation, incremental revalidation, dynamic rendering, React Suspense, and Server/Client Component boundaries.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Next.js App Router
- ESLint
- CSS Modules and application styles

## Features

- Responsive Ethiopian restaurant interface
- Homepage featuring Ethiopian dishes
- Menu category filtering through URL search parameters
- Individual dish detail pages
- Nested menu layout with a sidebar
- Shopping cart with quantity controls and local persistence
- Checkout form and frontend-only order confirmation
- Loading, error, and not-found interfaces
- Static generation for known dish detail pages
- Menu data loaded and filtered on the server
- Client-side cart interactions
- Client provider wrapper while keeping the root layout on the server
- Server-rendered dish cards
- Client shell receiving server-rendered content through `children`
- Documented Server/Client Component boundaries

## Routes

| Route | Purpose | Rendering strategy |
|---|---|---|
| `/` | Homepage | Static |
| `/menu` | Menu and category filtering | Dynamic rendering because the page reads `searchParams` |
| `/menu/[id]` | Individual dish details | Static generation for known dish IDs using `generateStaticParams` |
| `/cart` | Shopping cart | Static route with client-side cart state |
| `/checkout` | Checkout form | Dynamic rendering |
| `/_not-found` | Not-found page | Static |

The table reflects the Day 38 production build output. Actual rendering behavior depends on the route's implementation and the Next.js configuration.

## Rendering Strategy

### Static Homepage

The homepage does not require request-specific data, so Next.js can generate its HTML during the build.

### Menu Rendering and Category Filtering

The menu page is an asynchronous Server Component. It loads dish data on the server and filters the dishes using the `category` URL search parameter.

Examples:

- `/menu` displays all dishes.
- `/menu?category=Vegetarian` displays vegetarian dishes.
- `/menu?category=Meat` displays meat dishes.

Because the page reads `searchParams`, the Day 38 production build reports `/menu` as dynamically rendered on demand.

The menu does not need a client-side fetching hook to load its initial dish data.

### Static Dish Pages

The `/menu/[id]` route uses `generateStaticParams` to generate pages for known dish IDs during the build.

The page resolves the requested dish and uses `notFound()` when the requested dish does not exist.

### Dynamic Checkout

Checkout is dynamically rendered according to the current route implementation and its use of request-specific data, including cookies.

### Server/Client Component Boundaries

The application separates server-rendered content from browser-side interactivity.

- **Server Components** load and render menu data without shipping their component implementation as client-side JavaScript.
- **Client Components** provide browser-side state, context, effects, and event handlers where required.
- `Providers` wraps the application in the cart provider while allowing the root layout to remain a Server Component.
- `AddToCartButton` uses cart context and click events to update the cart.
- `DishList` renders dish cards as a Server Component.
- `CategoryBar` receives the rendered dish list through its `children` prop.
- `MenuSidebar` uses client-side state for its interactive counter.

See [`BOUNDARY.md`](./BOUNDARY.md) for the component inventory and boundary justifications.

### Persistent Nested Layout

The nested menu layout provides the shared menu interface and sidebar. State owned by a persistent layout can survive navigation between child routes while that layout remains mounted and is not remounted.

### Error Handling

The application includes loading, error, and not-found interfaces. The route-level `error.tsx` file is a Client Component because Next.js error boundaries use client-side error handling and recovery actions.

## App Router Structure

The following is a simplified overview of the relevant application files:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   ├── globals.css
│   ├── cart/
│   │   └── CartContent.tsx
│   ├── checkout/
│   │   └── CheckoutForm.tsx
│   └── menu/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── loading.tsx
│       ├── error.tsx
│       ├── CategoryBar.tsx
│       ├── DishList.tsx
│       ├── DishListServer.tsx
│       ├── AddToCartButton.tsx
│       ├── MenuSidebar.tsx
│       └── [id]/
│           └── page.tsx
├── context/
│   └── CartContext.tsx
├── data/
│   ├── dishes.ts
│   └── dishes.json
└── providers.tsx
```

This is a simplified overview of the application structure, not an exhaustive listing of every repository file.

## Getting Started

### Prerequisites

- Node.js compatible with the installed Next.js version
- npm
- Git

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### TypeScript Check

```bash
npx tsc --noEmit
```

### Production Build

```bash
npm run build
```

## Validation

The following checks completed successfully during Day 38 development:

```bash
npx tsc --noEmit
npm run build
```

The latest production build used Next.js 16.3.8 with Turbopack and completed successfully.

```text
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /cart
├ ƒ /checkout
├ ƒ /menu
└   /menu/[id]
  ├ ● /menu/1
  ├ ● /menu/2
  ├ ● /menu/3
  └ ● /menu/4
```

Route symbols:

- `○` — statically prerendered.
- `●` — statically generated using `generateStaticParams`.
- `ƒ` — dynamically rendered on demand.

The build output confirms that the homepage, cart, and not-found page are static, checkout and the menu are dynamic, and four known dish detail pages are statically generated.

Run `npm run lint` separately if you want to validate the current codebase with ESLint.

## JavaScript Bundle Comparison

Both versions were built with Next.js 16.3.8 and Turbopack. The following measurements represent the combined file sizes of generated JavaScript chunks in `.next/static/chunks`.

| Measurement | Day 37 | Day 38 |
|---|---:|---:|
| Total generated JavaScript chunk bytes | 652,029 | 650,477 |

The measured difference is **1,552 bytes smaller**, approximately **0.24%**.

These measurements were collected using the same PowerShell command in each production build:

```powershell
(Get-ChildItem ".next\static\chunks" -Recurse -Filter "*.js" | Measure-Object -Property Length -Sum).Sum
```

**Important limitation:** This is the combined size of generated JavaScript chunks. It is not the official `/menu` First Load JavaScript figure.

The Next.js bundle analyzer was also run with:

```bash
npx next build --experimental-analyze
```

The analyzer generated reports under `.next/diagnostics/analyze/`, but a verified route-level First Load JavaScript value for `/menu` was not extracted.

Therefore, the official `/menu` First Load JavaScript comparison remains unverified. The total chunk measurements above are provided as supporting build evidence, not as a substitute for the route-level metric.

The architectural goal of Day 38 is to keep data loading and dish-card rendering on the server while limiting client-side JavaScript to components that require browser interactivity.

## Project Scope

This is a frontend learning project. The cart and checkout demonstrate the application flow, but there is no backend or database, and no real payment is processed.

## Learning Objectives

**IBT College of Canada CodeOps — Module 3**

### Day 37 — Layouts and Rendering Strategies

- Understand nested layouts and shared UI.
- Compare static generation, revalidation, and dynamic rendering.
- Explore dynamic route parameters and `generateStaticParams`.
- Understand loading states and React Suspense.

### Day 38 — Sorting the Boundary

- Distinguish Server Components from Client Components.
- Keep client directives at the appropriate component boundaries.
- Render menu data on the server.
- Preserve client-side cart interactions.
- Pass server-rendered content to a Client Component shell through `children`.
- Avoid passing ordinary callback functions from Server Components to Client Components.
- Document component boundary decisions in `BOUNDARY.md`.
- Investigate production bundle output and First Load JavaScript.

## Project Documentation

- [`STRATEGY.md`](./STRATEGY.md) — route rendering decisions and their justifications.
- [`BOUNDARY.md`](./BOUNDARY.md) — Server/Client Component inventory and boundary justifications.
