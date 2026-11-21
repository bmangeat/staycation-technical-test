## Backend

I chose to migrate the project to TypeScript. I'm used to typed JavaScript now, so I felt obliged to set it up in the project. It makes it easier to handle type errors and also easier to match the types with the database.
About architecture, it's quite simple and standard (route -> service -> repository) to keep responsibilities separate and the code easier to follow. Routes handle HTTP, services hold business logic and repositories talk to the database.

I moved all the secrets (DB credentials, etc.) out of the code. Small step toward production-readiness, but big step for humanity.

I chose to aggregate everything (reviews, pricing, availability) in one endpoint rather than making the front end deal with multiple calls or data merging.
My opinion: the front end should be lazy. The back end is responsible for shaping the response.
This endpoint handles:
- hotel info (name, stars, preview, picture)
- aggregated reviews (average score + count)
- lowest available price for the current sale, with remaining stock taken into account
- fallback to the most recent sale when no availability exists on the current one (question 8)
- pagination (personal touch)

A few extras I usually set up on my projects:
- **pino**: structured logging
- **helmet**: sets sensible HTTP headers to cover most common attacks
- **rate limiting**: basic protection against API abuse. Ideally this would live at the infrastructure level rather than in the app itself, but good enough for now.

---

## Front end

Kept the original structure and migrated to TypeScript to type API responses and component props.

API calls are isolated in custom hooks powered by `react-query`, mainly for caching, loading state and error handling.

Switched to pnpm for consistency with the back end.

I also added a personal touch on the front end:
- Skeleton loaders on the hotel list and header while data is loading
- Pagination with auto-scroll to top on page change
- Grey styling on fallback prices (question 8) -> see note below
- "No availability" state on hotel cards with no openings
- Set in grey scale and display a "not available" label if the hotel has no price. Don't know if that's what you want. Another choice could be to remove those hotels from the list

> **Note on question 8:**
> I was unsure about the expected UI here. The back end correctly identifies fallback prices via `isCurrentSale: false`, and the field is typed and sent to the front end. However, I didn't have a clear picture of how this should look visually —> should the entire card be greyed out? Just the price section? Should there be an explicit label? I went with a subtle opacity reduction on the price block and a small "Prix indicatif" label. Hope it's OK.

---

## Caching strategy (question 9)

The front end already has a light cache with `react-query`: the same paginated page won't be re-fetched for 60 seconds.

On the back end, I'd add a Redis layer on `GET /hotels`, and the key would carry the page and the size.

I will need to invalidate, so below are the triggers I would use:
- new booking or cancellation -> stock changes -> price may change
- new opening or sale -> prices change
- new review -> average score changes

On any of these events, all the keys beginning with `hotels:list:*` would be flushed.