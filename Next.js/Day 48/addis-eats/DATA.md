# Data Fetching Strategy (DATA.md) — Addis Eats

| Data Entity | Fetch Location | Key / Strategy | Refresh Rule / Reasoning |
| :--- | :--- | :--- | :--- |
| **Menu & Dishes** | Server | Static / Incremental | Publicly cacheable, indexable for SEO and sitemap generation. |
| **Order History** | Server | Dynamic / Scoped | Private user data scoped strictly to the active session ID. |
| **Order Status** | Server first, then Client | Polled (SWR / React Effect) | Server seeds initial state to eliminate spinners; client polls for live kitchen updates. |
| **Menu Search** | Client | Debounced Input State | Triggered interactively as the user types, optimizing request frequency. |
| **Cart Items** | Client | React Context / LocalStorage | Stored locally in browser state for immediate responsiveness without server roundtrips. |
