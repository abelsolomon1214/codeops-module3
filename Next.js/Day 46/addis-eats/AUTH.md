# Authentication & Authorisation (AUTH.md) — Addis Eats

## Route Protection Matrix

| Route | Who May See | Protected By | What That Proves |
| :--- | :--- | :--- | :--- |
| `/menu` | Everyone | Nothing | It is public and indexable |
| `/orders` | The owner | Middleware + Page Check + Scoped Query | Signed in, and viewing only their own records |
| `/checkout` | Any signed-in user | Middleware + Page Check | Signed in — the write operation performs final validation |
| `/kitchen` | Staff only | Page Check + Role Check in every Server Action | Signed in, and explicitly permitted |

## Security Attacks & Defenses

1. **Signed-Out Write Attempt (`cancelOrder`)**
   - *Test*: Called `cancelOrder("ord_812")` from the browser console while signed out.
   - *Result*: Refused cleanly (did not crash).
   - *Defense Line*: Verified session cookie existence and validity inside the server action (`getSession()`).

2. **Cross-Account Write Attempt**
   - *Test*: Called `cancelOrder("<another user's order id>")` while signed in as user A.
   - *Result*: Refused on ownership verification.
   - *Defense Line*: Database query includes `userId: session.userId` scoping, ensuring unauthorized records cannot be mutated.

3. **Open Redirect Attempt (`/signin?next=`)**
   - *Test*: Navigated to `/signin?next=https://example.com`.
   - *Result*: Safely landed on `/` instead of an external domain.
   - *Defense Line*: Sanitized the `next` redirect query parameter to ensure relative internal routing only.
