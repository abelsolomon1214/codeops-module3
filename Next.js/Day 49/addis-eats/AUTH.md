# Addis Eats - AUTH.md (Authentication & Security Architecture)

## Protected Routes & Layers

| Route Path | Layer | Verification Method |
| :--- | :--- | :--- |
| `/dashboard` | Middleware (Edge) | Verifies JWT session cookie existence via `jose`. |
| `/api/orders/*` | Server Component / Action | Parses JWT, validates userId against token signature. |
| `/orders` | Server Component | Direct database query strictly scoped to `session.userId`. |
| `/kitchen` | Role Middleware | Rejects if JWT `role` !== `"admin"` / `"kitchen"`. |

---

## Security Verification (The Three Attacks)

During the Day 49 Verification Battery, the following three critical attacks were tested against the deployed production build. All three were successfully refused.

### 1. Attack 1: Unauthenticated Console Write
- **Attack Vector**: Attempting to execute a protected write action (e.g., placing an order or modifying a status) directly from the browser console via `fetch()` while logged out.
- **Result**: HTTP 401 Unauthorized / HTTP 403 Forbidden.
- **Defense Line**: 
  ```typescript
  // In server actions/APIs:
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  ```

### 2. Attack 2: Broken Object Level Authorization (ID Tampering)
- **Attack Vector**: Signed in as User A, manipulating a client payload or URL parameter to request or modify Order ID belonging to User B.
- **Result**: HTTP 403 Forbidden / Not Found.
- **Defense Line**: The database query inherently binds the record to the authenticated session ID.
  ```typescript
  // In API route / Server Action:
  const order = await getOrderById(orderId);
  if (order.customerId !== session.userId) {
    throw new Error("Forbidden: Order belongs to another account");
  }
  ```

### 3. Attack 3: Open Redirect (Phishing Injection)
- **Attack Vector**: Crafting a malicious URL such as `/signin?next=https://malicious-phishing-site.com` to redirect a user after successful authentication.
- **Result**: Navigates to a safe fallback (e.g., `/menu` or `/dashboard`) or strictly sanitizes the URL to a relative path.
- **Defense Line**:
  ```typescript
  // In authentication callback/action:
  const redirectUrl = formData.get("next");
  const isLocalRoute = typeof redirectUrl === "string" && redirectUrl.startsWith("/");
  redirect(isLocalRoute ? redirectUrl : "/menu");
  ```
