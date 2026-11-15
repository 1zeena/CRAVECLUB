# CRAVE CLUB project guide

## Architecture

This is a TanStack Start and React 19 brand website deployed on Netlify. There is no custom backend, persistence, authentication or payment service. The single landing route imports `MarketingPage`. TanStack handles document rendering and routing.

- `src/components/MarketingPage.tsx`: snack data, hero, menu console, brand story, footer and native-dialog bag preview.
- `src/components/NotFoundPage.tsx`: branded fallback.
- `src/routes/__root.tsx`: HTML document, global CSS, favicon and share metadata.
- `src/routes/index.tsx`: landing route.
- `src/data/site.ts`: finished brand name and description.
- `src/styles.css`: responsive art direction and motion preferences.
- `public/img/`: four generated food advertising images; render via Netlify Image CDN.
- `scripts/generate-food.mjs`: optional generation utility using the Gemini SDK and environment-injected gateway credentials. Never print credentials or model responses containing image data.

## Conventions and decisions

Keep the lime/chocolate/pink palette and Barlow Condensed / DM Sans / Kalam typography consistent. Use CSS transforms and opacity for motion. Preserve visible focus states, native dialog focus containment, button pressed states, reduced-motion support and touch-friendly controls. Browser APIs belong in event handlers and effects, never SSR initializers. Do not edit generated route types.

Snack and bag state is deliberately temporary React UI state. Sample prices and unavailable checkout are disclosed. Do not represent copying a list as placing an order, and do not invent confirmed allergen information or a real social account. Use Netlify primitives if real persistence or backend ordering is added later.

Images were generated on white studio backgrounds and processed into transparent PNG cutouts to integrate with colored stages. Keep image dimensions and CDN resizing to limit layout shift and asset weight. The hero's primary image loads eagerly; menu imagery loads lazily.

## Development

Support Node 20.18.0 locally with npm or pnpm; Netlify builds use Node 24. Local command: `npm run dev`; the optional Netlify CLI command is `netlify dev --port 8889`. Keep npm and pnpm dependency overrides aligned. TanStack Start 1.131.35 uses its built-in Netlify target and publishes assets to `dist`. The Netlify pipeline performs build validation. Follow run-specific restrictions on running builds, development servers and tests. Review source changes and configuration directly when those commands are prohibited.
