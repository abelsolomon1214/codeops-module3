# Addis Eats — Rendering Strategy

| Route | Rendering strategy | Why |
|---|---|---|
| `/` | Static | The homepage content does not depend on an individual request. |
| `/menu` | Static with revalidation | The menu can be cached and periodically refreshed rather than rendered for every request. |
| `/menu/[id]` | Static generation with `generateStaticParams` | Dish pages can be generated at build time for known dish IDs. |
| `/cart` | Dynamic client-side state | Cart contents are specific to the user and managed in client-side state. |
| `/checkout` | Forced dynamic rendering | Reading the request's `session` cookie requires request-time rendering. |
| Not-found page | Static where possible | The not-found UI does not require request-specific data. |

## Menu Revalidation

The menu uses a revalidation window so cached menu content can be refreshed periodically when the underlying data changes.

## Dish Pages

`generateStaticParams` generates a page for each known dish ID during the build.

## Checkout

Checkout uses forced dynamic rendering because `cookies()` reads the incoming request's `session` cookie.

## Streaming

The menu sidebar renders immediately, while a React `Suspense` boundary allows the dish list to load separately.

## Nested Menu Layout

The menu layout owns the sidebar and its counter. The counter should preserve its state when navigating from `/menu` to `/menu/[id]`.
