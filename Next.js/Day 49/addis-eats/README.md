# Addis Eats (Frontend Capstone)

Addis Eats is a full-stack Ethiopian cuisine ordering and delivery tracking web application. Designed for speed, accessibility, and resilience, it allows users to browse menus, manage a persistent cart, checkout securely, and track live deliveries in real-time.

## Live Deployment
- **Production URL**: [Add your live Vercel URL here]
- **Documentation**: See `AUTH.md`, `DATA.md`, `PERF.md`, and `FUTURE.md` for architectural decisions, performance metrics, and feature triage.

---

## Core Technical Features
- **Semantic & Accessible**: Zero clickable `div` elements; 100% keyboard navigable (`Tab`, `Enter`, `Escape`); high-contrast visible focus rings; minimum 44x44px touch targets.
- **Server & Client Architecture**: Optimized mix of statically generated Server Components (Menu) and interactive Client Components (Checkout, Maps).
- **Live Event Streaming**: Real-time delivery tracking utilizing Server-Sent Events (SSE).
- **Security Hardened**: Server-side validation against unauthenticated writes, ID tampering (BOLA), and open-redirect phishing attacks.
- **Optimized Performance**: Zero CLS (Cumulative Layout Shift) via strict Next.js Image sizing and deferred dynamic imports for heavy client libraries (Leaflet).

---

## Local Development Setup

To run a fresh clone of this project on your local machine:

1. **Clone the repository and navigate to the directory**:
   ```bash
   git clone <your-repo-url>
   cd "Next.js/Day 49/addis-eats"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env.local` file by copying the example:
   ```bash
   cp .env.example .env.local
   ```
   *(Ensure `SESSION_SECRET` is set for local auth to function).*

4. **Run the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables Matrix

| Variable | Development | Preview | Production |
| :--- | :--- | :--- | :--- |
| `SESSION_SECRET` | Local development key | Unique preview key | Strong 32+ char secret |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | `https://<branch>.vercel.app` | Live production domain |
| `NODE_ENV` | `development` | `production` | `production` |
