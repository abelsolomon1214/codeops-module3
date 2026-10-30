# Addis Eats — Client-Side Query Justifications (Day 41)

| Query Key / Endpoint | Library | Refresh Rule / Stale Time | Why |
|---|---|---|---|
| `/api/orders/[id]` | SWR | `refreshInterval: 5000` (Poll every 5s) | Kitchen status updates dynamically in the background without requiring manual page refreshes. |
| `/api/dishes?q={term}&page={page}` | SWR | Debounced (300ms), `keepPreviousData: true` | Prevents firing network requests on every keystroke and stops the UI from flashing empty during pagination or search. |
