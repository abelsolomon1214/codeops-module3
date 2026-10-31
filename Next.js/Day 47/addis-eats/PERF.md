# Performance Budget & Optimisation (PERF.md) — Addis Eats

## Metrics Table

| Measure | Target | Before | After | Cause of Change |
| :--- | :--- | :--- | :--- | :--- |
| **LCP (Throttled)** | Under 2.5s | 3.2s | 1.8s | Optimized Next.js image loading and priority hints on hero dish. |
| **CLS** | Under 0.1 | 0.15 | 0.02 | Explicit dimensions defined on dish images and layout containers. |
| **First Load JS (`/menu`)** | Under 120 kB | 142 kB | 115 kB | Code-splitting client components and tree-shaking unused icons. |
| **Largest Image Size** | Under 150 kB | 320 kB | 128 kB | Converted heavy PNG assets to optimized WebP format. |
| **Lighthouse Performance** | 90 or better | 76 | 94 | Combined image compression, font optimization, and font-display swap. |
