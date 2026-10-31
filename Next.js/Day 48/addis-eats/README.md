# Addis Eats (Day 48: Harden, Then Ship)

Full-stack Ethiopian cuisine ordering and delivery tracking web application built with Next.js 15, React 19, TypeScript, and Leaflet.

## Live Deployment
- **Production URL**: [Add your live Vercel URL here after deploying]
- **Preview Deployments**: Automated on pull requests and branch pushes.

---

## Day 48 Hardening & Accessibility Features
- **Semantic Elements Only**: Zero clickable `div` elements; all actions use native `<button>` or `<Link>` elements.
- **Accessible Keyboard Navigation**: Every flow is navigable via `Tab`, `Enter`, `Space`, and `Escape`.
- **Visible Focus Rings**: High-contrast, non-destructive `:focus-visible` styling across all inputs, links, and buttons.
- **Touch-First Design**: Minimum 44x44px interactive targets with no critical actions trapped behind `:hover`.
- **Form Hardening**: Submissions handled through native `<form onSubmit={...}>` events with proper numeric phone inputs (`type="tel"`, `inputMode="numeric"`).
- **Double-Submit Prevention**: Asynchronous actions disable submit buttons and render active pending states.

---

## Local Development Setup

1. **Clone and navigate to the directory**:
   ```bash
   cd "Next.js/Day 48/addis-eats"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   ```

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

---

## Production Pre-Flight Checklist
- [x] Type checking passes cleanly (`npx tsc --noEmit`)
- [x] Production build succeeds locally (`npm run build`)
- [x] No sensitive secrets prefixed with `NEXT_PUBLIC_`
- [x] Touch targets measure at least 44x44px
- [x] End-to-end checkout works using only keyboard navigation
- [x] Verified in a private window without an active session
