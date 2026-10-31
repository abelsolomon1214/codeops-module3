# Addis Eats - PERF.md (Performance Budget & Metrics)

## Lighthouse Performance Budget (Target vs Actual)

These metrics were recorded from a throttled (Fast 4G / CPU 4x slowdown) production build to simulate a standard mid-range mobile device.

| Metric | Target Budget | Actual (Production Build) | Assessment |
| :--- | :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | < 2.5s | ~1.8s | Passed |
| **CLS (Cumulative Layout Shift)** | < 0.1 | 0.00 | Passed |
| **INP (Interaction to Next Paint)** | < 200ms | ~85ms | Passed |
| **First Load JS Bundle (Global)** | < 150 kB | ~95 kB | Passed |

---

## Key Performance Optimizations

### 1. Zero Cumulative Layout Shift (CLS) on Images
- **Cause**: Standard HTML `<img>` tags without dimensions cause the layout to jump once the image downloads.
- **Solution**: Replaced all raw images with Next.js `<Image>` components using absolute positioning (`fill`) paired with `objectFit: "cover"` inside a constrained aspect-ratio container. This reserves the exact space before the image arrives.

### 2. Fast LCP on Menu Discovery
- **Cause**: Fetching menu items on the client requires downloading JS, parsing it, executing the fetch, waiting for the network, and then rendering the DOM.
- **Solution**: The `/menu` route is a Server Component rendered statically at build time. The browser receives complete HTML immediately. The hero image is preloaded for instant above-the-fold visibility.

### 3. Immediate Interaction (INP) on Add to Cart
- **Cause**: Heavy state calculations or un-debounced network requests blocking the main thread during user interaction.
- **Solution**: The cart state utilizes a lightweight `useCallback` React Context that updates local memory instantly. No network requests are made when tapping "Add to Cart", yielding sub-100ms visual feedback.

### 4. Dynamic Import for Leaflet Map
- **Cause**: Leaflet.js is a heavy library that assumes `window` exists, causing server-side rendering errors and ballooning the initial JS bundle.
- **Solution**: The `MapPanel` component is dynamically imported using Next.js `dynamic(() => import(...), { ssr: false })`. This completely excludes the mapping library from the initial bundle and only downloads it when the user navigates to the tracking page.
