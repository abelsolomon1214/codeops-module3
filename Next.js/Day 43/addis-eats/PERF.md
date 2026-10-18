# Addis Eats — Performance & Optimisation Report (PERF.md)

This document records the Core Web Vitals (LCP, CLS, INP) before and after performance optimisations implemented in Day 43.

## Summary Table

| Optimisation Stage | LCP (Largest Contentful Paint) | CLS (Cumulative Layout Shift) | Total Page Weight |
|---|---|---|---|
| **Starting Point (Unoptimised)** | 5.8s | 0.24 | 3.2 MB |
| **Stage 1: `next/image` with dimensions & sizes** | 2.6s | 0.02 | 450 kB |
| **Stage 2: `priority` on hero image** | 2.1s | 0.02 | 450 kB |
| **Stage 3: `next/font/google` with metric fallbacks** | 1.8s | 0.00 | 430 kB |
| **Stage 4: Server-rendered menu & deferred scripts** | 1.5s | 0.00 | 380 kB |

## Key Insights & Cause Breakdown
1. **Images (`next/image`):** Represented the single largest performance bottleneck. Converting raw JPEGs/PNGs to automatically resized WebP/AVIF formats with correct `width`, `height`, and `sizes` slashed page weight by over 85% and cut LCP by more than half.
2. **Layout Shift (CLS):** Dropped to zero by explicitly reserving space in advance with image dimensions and utilizing `next/font` with `display: "swap"` and metric-matched font fallback metrics.
3. **Environment & Build Configuration:** Separated sensitive secrets into `.env.local` while keeping public variables explicit in `.env.example`.
