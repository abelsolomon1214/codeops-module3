# Addis Eats — Next.js App Router (Day 39: API Routes, Route Handlers & Server Actions)

A full-stack Ethiopian food ordering application built with **Next.js 16, React 19, TypeScript, Zod, and the App Router**.

In **Day 39**, Addis Eats gains its server half inside the same repository: HTTP Route Handlers (`route.ts`), shared Zod validation (`orderSchema`), `"use server"` Server Actions (`placeOrder` and `cancelOrder`), `useActionState` pending/error states, `revalidatePath` cache invalidation, and un-bypassable server-side authorisation checks.

## Tech Stack

- Next.js 16 (`16.3.8`)
- React 19 (`useActionState`, Server & Client Components, Server Actions)
- TypeScript 5
- Zod (shared client/server schema validation)
- CSS Modules & Tailwind CSS

## API Endpoints & Route Handlers

All endpoints return a single predictable error shape on failure:
`{ "error": "Validation failed", "fieldErrors": { "phone": ["Use 09... or +2519... for your TeleBirr number."] } }`

| Endpoint | HTTP Method | Status Codes | Description |
|---|---|---|---|
| `/api/dishes` | `GET` | `200 OK` | Returns all dishes, or filters by optional `?category=Vegetarian` / `?category=Meat` query string. |
| `/api/dishes/[id]` | `GET` | `200 OK`, `404 Not Found` | Returns a single dish matching the numeric `id`, or `{ "error": "No such dish" }` with status `404`. |
| `/api/orders` | `GET` | `200 OK` | Returns the current list of server-stored orders. |
| `/api/orders` | `POST` | `201 Created`, `400 Bad Request`, `422 Unprocessable Entity` | Validates request body with shared `orderSchema`. Returns `400` on malformed JSON, `422` with `fieldErrors` on invalid fields, or `201` with the created order record. |

## Server Actions (`src/app/actions.ts`)

| Action | Directive | Purpose & Security / Cache Behaviour |
|---|---|---|
| `placeOrder(prevState, formData)` | `"use server"` | Validates form submission using `orderSchema.safeParse()`, creates the order, calls `revalidatePath("/orders")` and `revalidatePath("/checkout")`, and returns `{ ok, order, fieldErrors }` for `useActionState`. |
| `cancelOrder(orderId)` | `"use server"` | Verifies `await getSession()` (throws `401` if not signed in) and verifies `order.userId === user.id` (throws `403` if attempting to cancel another user's order), marks the order cancelled, and calls `revalidatePath("/orders")`. |

## Environment Variables & Secrets

- `.env.local` is ignored by `.gitignore` (`.env*`).
- Server-only secrets (`DATABASE_URL`, `TELEBIRR_SECRET`) do **not** use the `NEXT_PUBLIC_` prefix and are never shipped to the browser bundle.

## Local Setup & Verification

- `npm install`
- `npm run lint`
- `npm run build`
- `npm run dev`
