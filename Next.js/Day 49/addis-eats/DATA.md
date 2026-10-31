# Addis Eats - DATA.md (Data Fetching & Rendering Strategy)

## Query Inventory

### 1. Menu Feed (`/menu`)
- **Execution**: Server Component
- **Method**: Static file system read (fallback simulated JSON)
- **Revalidation Rule**: Static Generation (build time)
- **Rationale**: The menu rarely changes within a single day. Static rendering at build time ensures the fastest possible LCP (Largest Contentful Paint) for unauthenticated users, keeping discovery instant.

### 2. Order Submission (`/checkout`)
- **Execution**: Client Component (Form) calling API Route (`/api/orders`)
- **Method**: `fetch` with `POST` payload
- **Revalidation Rule**: Zero caching (`no-store`), triggers router refresh on success.
- **Rationale**: Writes are inherently dynamic. Handled strictly via client transition (`useTransition`) to disable the submit button and prevent rapid double-clicks (preventing accidental double charges).

### 3. Live Delivery Tracking (`/track/[id]`)
- **Execution**: Server Component (Initial mount) passing to Client Component
- **Method**: Server-Sent Events (SSE) via `/api/orders/[id]/stream`
- **Revalidation Rule**: Persistent live stream (bypasses Next.js App Router cache)
- **Rationale**: Courier GPS coordinates update rapidly. Polling wastes bandwidth; WebSockets carry too much protocol overhead for one-way updates. SSE pushes coordinates natively with zero dependencies. The stream is deferred on mount to prevent browser infinite-loading spinners.

### 4. User Order History (`/orders`)
- **Execution**: Server Component
- **Method**: Direct server-side query with cookie injection
- **Revalidation Rule**: Dynamic rendering (`force-dynamic` / cookie dependency)
- **Rationale**: Requires reading the secure HTTP-only session cookie. Rendering on the server ensures zero client-side layout shifts and completely hides internal API paths from the browser network tab.

---

## Architectural Decision Summary
- **Default to Server**: Any data fetching that does not require user interaction or live real-time updates occurs on the server.
- **Client Fallbacks**: Used strictly for hydration of maps (Leaflet requires `window`) and continuous SSE streams.
