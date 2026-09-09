# Day 31 - Question 3: Nested Layout with Outlet

## Objective

Build a shared `Layout` component containing a header, navigation, `Outlet`, and footer, then nest application screens inside the layout.

## What I Built

This exercise demonstrates:

* `Layout` component
* Nested routes
* `Outlet`
* Shared header
* Shared navigation
* Shared footer
* React Router client-side navigation

## Route Structure

| Path    | Component |
| ------- | --------- |
| `/`     | Home      |
| `/menu` | Menu      |
| `/cart` | Cart      |

All three screens are nested inside the `Layout` route.

## Technologies

* React
* Vite
* React Router DOM v6
* JavaScript
* CSS

## How to Run

```bash
npm install
npm run dev
```

## Learning Outcome

I learned how nested routes work in React Router and how `Outlet` provides the location where a child route is rendered inside a shared layout.
