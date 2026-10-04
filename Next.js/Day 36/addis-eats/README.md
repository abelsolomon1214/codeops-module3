# Addis Eats — Next.js App Router

A portfolio-style Ethiopian food ordering frontend built with **Next.js 16**, **React**, **TypeScript**, and the **App Router**.

The project demonstrates Next.js file-based routing, dynamic routes, nested route files, loading and error UI, `notFound()`, `next/link`, colocated components, and responsive frontend design.

## Tech Stack

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* Next.js App Router
* ESLint

## Routes

| Route          | File                         | Purpose                                 |
| -------------- | ---------------------------- | --------------------------------------- |
| `/`            | `src/app/page.tsx`           | Addis Eats homepage                     |
| `/menu`        | `src/app/menu/page.tsx`      | Menu with category filtering            |
| `/menu/[id]`   | `src/app/menu/[id]/page.tsx` | Dynamic dish detail page                |
| `/cart`        | `src/app/cart/page.tsx`      | Shopping cart screen                    |
| `/checkout`    | `src/app/checkout/page.tsx`  | Checkout form and frontend confirmation |
| Invalid routes | `src/app/not-found.tsx`      | Custom 404 page                         |

## App Router Features Demonstrated

### File-Based Routing

Routes are created from the folder and file structure inside `src/app`.

```text
src/app/
├── page.tsx
├── layout.tsx
├── not-found.tsx
├── cart/
│   └── page.tsx
├── checkout/
│   └── page.tsx
└── menu/
    ├── page.tsx
    ├── loading.tsx
    ├── error.tsx
    ├── CategoryBar.tsx
    ├── DishList.tsx
    └── [id]/
        └── page.tsx
```

### Dynamic Routes

The `/menu/[id]` route uses the dynamic `[id]` segment to display individual dishes.

Examples:

```text
/menu/1
/menu/2
/menu/3
/menu/4
```

The dynamic page reads the route parameter from `params` and uses `notFound()` when the requested dish does not exist.

### Navigation

Internal navigation uses Next.js `Link` instead of regular HTML `<a>` elements.

### Loading and Error UI

The menu route includes:

* `loading.tsx` — loading interface for the menu segment
* `error.tsx` — error boundary with a retry action

### Colocated Components

Reusable menu components are colocated inside the menu route:

* `CategoryBar.tsx`
* `DishList.tsx`

These components support the menu's interactive category filtering without becoming separate routes.

## Main Features

* Responsive Ethiopian food restaurant interface
* Homepage with featured dishes
* Menu category filtering
* Dynamic dish detail pages
* Shopping cart interface
* Checkout form
* Frontend-only order confirmation
* Custom 404 page
* Loading and error UI
* Responsive layouts for desktop and mobile
* Optimized images using `next/image`

## Important Note

This project is a **frontend learning project**.

The cart, checkout, and order confirmation are demonstrations of the user interface and Next.js application flow. No real payment is processed and there is no backend or database.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Validation

The project was checked using:

```bash
npm run lint
npm run build
```

Both commands pass successfully.

## Learning Goal

This project was created as part of **IBT Software Development & QA Engineering — Day 36: Next.js Intro & File-Based Routing**.

The main goal is to understand how Next.js App Router conventions map files and folders to application routes and how those conventions differ from React Router.
