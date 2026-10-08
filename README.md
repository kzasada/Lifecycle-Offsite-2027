# Lifecycle Offsite 2027

A practice site for Webflow's Source app: a fictional three-day offsite itinerary with search, stop detail pages, an FAQ, and Sanity-backed editorial content. All data is made up.

Stack: Next.js 16 (App Router), TypeScript, CSS Modules on CSS custom properties, Sanity 6 (embedded Studio).

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

The site runs before Sanity is set up, using default content from `data/site-defaults.json`. `/studio` shows "Sanity isn't connected yet" until a project ID is set.

Checks: `npm run lint`, `npm run typecheck`, `npm run build`. Needs Node 22.12+.

## Data refresh

`npm run data:refresh` rewrites the committed snapshot: `data/stops.json`, `data/days.json`, `data/site-defaults.json` (each with `generatedAt`) and the Sanity seed `sanity/seed/seed.ndjson`. Edit the source content in `scripts/refresh-data.mjs`, then rerun. The site renders stops from these files with static imports.

## Sanity setup

You do these account steps yourself:

1. Log in: `npx sanity login`.
2. Create a project and a `production` dataset: `npx sanity projects create` (or at sanity.io/manage).
3. Put the project ID in `.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID`.
4. Add CORS origin `http://localhost:3000` (with credentials) in sanity.io/manage > API > CORS origins. Add your Webflow Cloud URL later.
5. Seed content: `npx sanity dataset import sanity/seed/seed.ndjson --dataset production --missing`.
6. Restart `npm run dev`, open `/studio`, then the seeded content appears on the site.

Requirements for Source: `sanity.config.ts` and `sanity.cli.ts` at the root, a single workspace, Sanity >=5.15 and <7. Don't downgrade Sanity to silence `npm audit` warnings from the CLI.

Site content is fetched on the server only (`sanity/client.ts`): published perspective, no CDN, no-store, no token.

## Webflow Cloud

- `next.config.ts` sets no `basePath` or `assetPrefix`; Webflow Cloud applies them from the mount path. If the app is mounted below the domain root, set `NEXT_PUBLIC_BASE_PATH` (e.g. `/offsite`) so the Studio path is right.
- `.env.local` never reaches the build. Set `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `NEXT_PUBLIC_BASE_PATH` in Webflow Cloud, and redeploy after any change.
- Add the deployed URL as a Sanity CORS origin.
- No ISR, no `use cache`, no `dynamicParams = false`. Images are `unoptimized` because Webflow Cloud doesn't resize external images.
- The Studio loads client-only to keep the server bundle under 10 MB.

### Deploy checklist

Run before every Webflow Cloud deploy, and before pushing a deploy fix. `next build` alone does not exercise the adapter.

1. Confirm the Next.js version is supported by Webflow Cloud (its docs say 15+ and don't mention 16).
2. `npm run build` passes.
3. The adapter build passes: `SKIP_WRANGLER_CONFIG_CHECK=yes npx opennextjs-cloudflare build`. This needs `open-next.config.ts` and a top-level `esbuild` dev dependency, both committed. `.open-next/` is build output and git-ignored.
4. Env vars are set in Webflow Cloud, then redeploy: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `NEXT_PUBLIC_BASE_PATH` (leave empty at the domain root, never `/`).
5. After the first deploy, add the deployed URL as a Sanity CORS origin with credentials on.
6. Verify `/`, `/faq` and `/studio` return 200, then edit content in the Studio and confirm it appears on the live site.

## File map

| Path | Purpose |
|---|---|
| `app/layout.tsx`, `fonts.ts`, `tokens.css`, `globals.css` | Root layout, `next/font` setup, all design tokens |
| `app/(site)/` | Site routes: `/`, `/stops/[slug]`, `/faq`, not-found |
| `app/studio/[[...tool]]/` | Embedded Sanity Studio (static, client-only) |
| `components/` | Header, footer, stop card, search browser, tags (CSS Modules) |
| `lib/content.ts` | Sanity fetch with default-content fallback |
| `lib/stops.ts`, `lib/types.ts` | Stop data access and types |
| `data/` | Committed JSON snapshot |
| `scripts/refresh-data.mjs` | Writes `data/` and the seed file |
| `sanity/` | Env, server-only client, schema types, `seed/seed.ndjson` |
| `sanity.config.ts`, `sanity.cli.ts` | Sanity config (one workspace) and CLI config |
| `docs/brand/` | Brand guide and design tokens JSON for Source's Brand System |
| `itinerary.md` | Original itinerary copy |

`.webflow/` and `brand/` are created and managed by Source; they are ignored by lint and type-check, and `.webflow/tasks/` is git-ignored.
