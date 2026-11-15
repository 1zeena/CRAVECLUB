# CRAVE CLUB project guide

## Architecture

This is a TanStack Start and React 19 brand website deployed on Cloudflare Workers. There is no custom backend, persistence, authentication or payment service. The single landing route imports `MarketingPage`. TanStack handles document rendering and routing.

- `src/components/MarketingPage.tsx`: snack data, hero, menu console, brand story, footer and native-dialog bag preview.
- `src/components/NotFoundPage.tsx`: branded fallback.
- `src/routes/__root.tsx`: HTML document, global CSS, favicon and share metadata.
- `src/routes/index.tsx`: landing route.
- `src/data/site.ts`: finished brand name and description.
- `src/styles.css`: responsive art direction and motion preferences.
- `public/img/`: generated food advertising images served as static assets.
- `scripts/generate-food.mjs`: optional generation utility using the Gemini SDK and environment-injected gateway credentials. Never print credentials or model responses containing image data.

## Conventions and decisions

Keep the lime/chocolate/pink palette and Barlow Condensed / DM Sans / Kalam typography consistent. Use CSS transforms and opacity for motion. Preserve visible focus states, native dialog focus containment, button pressed states, reduced-motion support and touch-friendly controls. Browser APIs belong in event handlers and effects, never SSR initializers. Do not edit generated route types.

Snack and bag state is deliberately temporary React UI state. Sample prices and unavailable checkout are disclosed. Do not represent copying a list as placing an order, and do not invent confirmed allergen information or a real social account. Use Cloudflare primitives if real persistence or backend ordering is added later.

Images were generated on white studio backgrounds and processed into transparent PNG cutouts to integrate with colored stages. The hero's primary image loads eagerly; menu imagery loads lazily.

## Development

Support Node 22.12.0 or newer locally with npm or pnpm. Local command: `npm run dev`; deploy with `npm run deploy` after authenticating Wrangler. Keep npm and pnpm dependency overrides aligned. Cloudflare Workers runs the TanStack Start server and serves static assets. Follow run-specific restrictions on running builds, development servers and tests. Review source changes and configuration directly when those commands are prohibited.
