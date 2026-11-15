# CRAVE CLUB

An expressive food-brand playground with a lime, chocolate and pink visual identity, custom food imagery, floating hero elements, an interactive four-product snack console, and an accessible bag preview.

Built with React 19, TypeScript, TanStack Start, Vite, CSS and Cloudflare Workers. Product images were generated specifically for this project. Motion respects reduced-motion preferences, and the menu, options and bag work with a keyboard.

## Local development

Use Node **20.19.0 or newer**. From the project folder, run:

```sh
npm install
npm run dev
```

Open the local URL printed in the terminal (normally http://localhost:3000). Existing pnpm users can instead run `pnpm install` and `pnpm dev`; the committed pnpm lockfile pins the compatible dependency graph.

Local and deployed pages serve food images from `public/img/`.

Cloudflare Workers runs the TanStack Start server and static assets. Use `npm run deploy` to build and deploy with Wrangler; `npm run cf-typegen` regenerates Cloudflare binding types. Authenticate Wrangler with `npx wrangler login` before deploying. Keep npm and pnpm dependency overrides aligned when upgrading dependencies.

## Menu and ordering

The sample menu and EGP prices are defined in `src/components/MarketingPage.tsx`. The selection console supports product switching, flavour options, adding to the bag, changing quantities, removing items, totals, and copying a snack list. The bag is temporary browser-session UI state and resets on refresh. It does not submit orders or take payments; this is clearly stated in the menu and bag. Confirm recipes, prices, allergens, currency, and fulfilment details before connecting a real ordering service.

Global styles and responsive layouts live in `src/styles.css`; social metadata lives in `src/data/site.ts`. Food assets live in `public/img/`. The optional `scripts/generate-food.mjs` regenerates assets using environment-injected gateway credentials without exposing them.
