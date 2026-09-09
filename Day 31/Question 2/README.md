# Day 31 - Question 2: Link and NavLink

## Objective

Replace normal navigation links with React Router `Link` and use `NavLink` for the active navigation tab.

## What I Built

This exercise demonstrates:

* `Link` for client-side navigation
* `NavLink` for active navigation state
* Active link styling
* React Router routes

## Navigation

| Link | Component | Path    |
| ---- | --------- | ------- |
| Home | `Link`    | `/`     |
| Menu | `NavLink` | `/menu` |
| Cart | `Link`    | `/cart` |

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

I learned the difference between `Link` and `NavLink`. `Link` provides client-side navigation, while `NavLink` also provides information about whether the current route is active, allowing active navigation items to be styled.
