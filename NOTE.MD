# Staycation — Technical Test

I took the liberty of rewriting this NOTE.MD since I added quite a few things and wanted to explain my choices here.

---

## Back end

### TypeScript
Habit of mine. It makes me more careful and catches type errors early,
especially useful when dealing with API responses and database rows.

### Architecture: route → service → repository
Classic layered architecture to keep responsibilities separate and the code easy to follow.
Routes handle HTTP, services hold business logic, repositories talk to the database. "Simple, Basic" as we say.

### Environment variables
Moved all secrets (DB credentials, etc.) out of the code into environment variables.
Small step toward production-readiness, but big step for humanity.

### Single endpoint for hotel data: `GET /hotels`
I chose to aggregate everything — reviews, pricing, availability — in one endpoint rather than making the front end deal with multiple calls or data merging.
My take: the front end should be lazy. The back end is responsible for shaping the response.

This endpoint handles:
- hotel info (name, stars, preview, picture)
- aggregated reviews (average score + count)
- lowest available price for the current sale, with remaining stock taken into account
- fallback to the most recent sale when no availability exists on the current one (question 8)
- pagination (personal touch)

### A few extras
- **pino** — structured logging
- **helmet** — sets sensible HTTP headers to cover most common attack vectors
- **rate limiting** — basic protection against API abuse.
  Ideally this would live at the infrastructure level (reverse proxy, API gateway) rather than in the app itself, but good enough for now.
- **graceful shutdown** — the server stops accepting new connections before closing the DB pool, so in-flight requests aren't dropped on SIGTERM.

---

## Front end

Kept the original structure and migrated to TypeScript to type API responses and component props.

API calls are isolated in custom hooks powered by `react-query`: caching, loading state, error handling, and `keepPreviousData` to avoid flickering between pages.

Replaced the deprecated `node-sass` with `sass`, and switched to pnpm for consistency with the back end.

### A few extras
- Skeleton loaders on the hotel list and header while data is loading
- Pagination with auto-scroll to top on page change
- Grey styling on fallback prices (question 8)
- "No availability" state on hotel cards with no openings

---

## Caching strategy (question 9)

The front end already has a lightweight cache via `react-query` (`staleTime: 60s`) — the same paginated page won't be re-fetched for 60 seconds.

On the back end, I'd add a Redis layer on `GET /hotels`, keyed by `hotels:list:{page}:{size}`.

Invalidation triggers:
- new booking or cancellation → stock changes → price may change
- new opening or sale → prices change
- new review → average score changes

On any of these events, all `hotels:list:*` keys would be flushed.
The current sale ID would also be cached separately since it rarely changes.