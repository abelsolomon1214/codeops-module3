# Addis Eats — Next.js App Router

A portfolio-style Ethiopian food ordering frontend built with **Next.js 16, React 19, TypeScript, and the App Router**.

This project demonstrates file-based routing, nested layouts, static generation, incremental revalidation, dynamic rendering, and streaming with React Suspense.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Next.js App Router
- ESLint

## Features

- Responsive Ethiopian restaurant interface
- Homepage with featured dishes
- Menu category filtering
- Dynamic dish detail pages
- Nested menu layout with a sidebar
- Shopping cart with quantity controls and local persistence
- Checkout form and frontend-only order confirmation
- Loading, error, and not-found UI
- Static generation for known dish pages
- Menu revalidation
- Dynamic checkout rendering
- Suspense-based menu streaming

## Routes

| Route | Purpose | Rendering strategy |
|---|---|---|
| `/` | Homepage | Static |
| `/menu` | Menu and category filtering | Static with revalidation |
| `/menu/[id]` | Dish detail pages | Static generation (SSG) |
| `/cart` | Shopping cart | Static route with client-side state |
| `/checkout` | Checkout form | Forced dynamic rendering |
| `/_not-found` | Not-found page | Static |

## Rendering Strategy

### Static homepage

The homepage does not require request-specific data, so it can be generated during the build.

### Menu revalidation

The menu uses a one-hour revalidation window. This allows cached menu content to be reused while permitting periodic regeneration as the data changes.

### Static dish pages

The `/menu/[id]` route uses `generateStaticParams` to generate pages for known dish IDs during the build.

### Dynamic checkout

Checkout uses forced dynamic rendering because it reads the incoming request's `session` cookie using Next.js `cookies()`.

### Streaming the menu

The menu layout should render its sidebar independently of the dish list. A React `Suspense` boundary allows the dish list to render behind a fallback while it loads.

### Persistent nested layout

The nested menu layout owns the sidebar and its counter. The counter should retain its value when navigating between the menu and a dish detail page without remounting the layout.

See [`STRATEGY.md`](./STRATEGY.md) for the route-by-route rendering decisions and their justifications.

## App Router Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   ├── cart/
│   ├── checkout/
│   └── menu/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── loading.tsx
│       ├── error.tsx
│       └── [id]/
└── context/
    └── CartContext.tsx
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Validation

The following commands were run successfully:

```bash
npm run lint
npm run build
```

### Production Build Output

The following is the output from `npm run build`:

```text
▲ Next.js 16.3.8 (Turbopack)
✓ Running next.config.ts took 102ms

✓ Generating static pages using 7 workers (10/10) in 1781ms
✓ Finalizing page optimization in 81ms

Route (app)      Revalidate  Expire
┌ ○ /
├ ○ /_not-found
├ ○ /cart
├ ƒ /checkout
├ ○ /menu                1h      1y
└   /menu/[id]
  ├ ● /menu/1
  ├ ● /menu/2
  ├ ● /menu/3
  └ ● /menu/4

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

The build confirms that the homepage, cart, and not-found page are static; checkout is dynamic; the menu revalidates after one hour; and four dish pages are statically generated.

## Project Scope

This is a frontend learning project. Cart and checkout demonstrate the application flow, but there is no backend or database, and no real payment is processed.

## Learning Objectives

**IBT College Canada CodeOps — Module 3, Day 37: Layouts and Strategies**

The goal is to understand how Next.js layouts, rendering strategies, static generation, revalidation, dynamic rendering, and Suspense affect application performance and navigation.
