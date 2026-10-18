# Addis Eats — Authentication & Authorization Architecture (AUTH.md)

This document outlines the three-layer security model implemented across Addis Eats.

| Route / Action | Layer 1: Middleware | Layer 2: Page / Layout | Layer 3: Action / Handler | What Each Layer Proves |
|---|---|---|---|---|
| **`/menu`** | None (Public) | None | None | Publicly indexable and accessible to all visitors. |
| **`/checkout`** | Redirects if no session cookie | Verifies session & user claims | Validates stock & user ownership before write | Middleware stops unauthenticated routing; Action secures financial/order placement. |
| **`/orders`** | Redirects if no session cookie | Verifies session, scopes query (`getOrdersForUser(user.id)`) | Validates record ownership on cancellation | Prevents horizontal privilege escalation (viewing other users' orders). |
| **`/kitchen`** | None (Protected at page level) | Checks `user.role === "staff"` (403 if unauthorized) | Server-side role validation on writes | Ensures staff-only operational access is enforced at the server component level. |
