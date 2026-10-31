# Addis Eats - FUTURE.md (Capstone Triage & Deferred Scope)

## Triage Philosophy (MoSCoW Framework)
During the final build day (Day 49), features were ruthlessly prioritized. To protect functionality, security, accessibility, and documentation (20% of the rubric), all non-essential items ("Coulds") were deliberately cut prior to the halfway mark.

---

## Intentionally Deferred Features ("Coulds")

### 1. Multi-Theme Switching (Dark / High-Contrast Mode)
- **Status**: Cut during Day 49 triage.
- **Rationale**: The default Ethiopian heritage palette (warm emerald, terracotta, gold) satisfies WCAG AA color contrast standards (ratio > 4.5:1). Adding a secondary theme toggle risks hydration mismatches and distracts from core order flow reliability.
- **Future Implementation**: Implement CSS variables mapped to `prefers-color-scheme` in a persistent React context.

### 2. Live WebSockets Alternative for Courier Tracking
- **Status**: Cut during Day 47/49.
- **Rationale**: Delivery updates are strictly one-directional (server pushing GPS coordinates and status changes to the client). Server-Sent Events (`EventSource`) solved this with zero external protocol overhead, built-in reconnection, and simple HTTP framing. WebSockets would require bi-directional state overhead unnecessary for food delivery tracking.

### 3. Integrated TeleBirr / Chapa Payment Gateway Checkout
- **Status**: Cut in favor of Cash / TeleBirr on Delivery flow.
- **Rationale**: Full third-party payment integration introduces sandbox keys, callback webhooks, and network latency outside local testability. The phone input is strictly validated with `type="tel"` and `inputMode="numeric"` to record the TeleBirr account number for on-delivery settlement.

### 4. Interactive Dish Reviews & Photo Uploads
- **Status**: Cut during Day 49 triage.
- **Rationale**: Media upload endpoints require multipart form handling, AWS S3 / Cloudinary credentials, and image moderation. Static dish assets served via Next.js `<Image>` with responsive `sizes` and modern format conversion provide superior LCP scores without storage sprawl.

---

## Architectural Lessons
Cutting features out loud demonstrates engineering maturity: delivering a complete, robust, verified application with zero broken routes beats an ambitious application with half-implemented flows.
