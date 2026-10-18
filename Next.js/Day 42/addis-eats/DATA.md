# Addis Eats — Client Data Fetching Architecture (DATA.md)

This document details every client-side SWR query implemented in Addis Eats, including its cache key structure, refresh policies, and architectural reasoning.

| Endpoint / Resource | SWR Key Pattern | Refresh Rule / Options | Justification & Architectural Reasoning |
|---|---|---|---|
| **Order Status Tracker** | `"/api/orders/${id}"` | `refreshInterval: 5000`<br>`fallbackData: initialOrder` | **Live Polling with Zero Initial Spinner:** Seeded with server-rendered data on first paint for instant load and SEO. Polls every 5 seconds in the background to reflect kitchen status updates automatically. |
| **Menu Search & Filter** | `"/api/dishes?q=${debouncedTerm}&page=${page}"` | `keepPreviousData: true`<br>Debounced key (300ms) | **Race Safety & Seamless UI:** Prevents request spamming per keystroke via debouncing. `keepPreviousData: true` holds previous results on screen during search transitions so the UI never flashes empty. |
| **Paginated Dish List** | `"/api/dishes?page=${page}"` | Query string sync (`?page=N`)<br>`keepPreviousData: true` | **Shareable & Linkable Paging:** Keeps the page number explicitly in the browser URL query string so users can bookmark or share specific pages. |
