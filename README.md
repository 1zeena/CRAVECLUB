# CRAVE CLUB

An expressive food-brand playground with a lime, chocolate and pink visual identity, custom food imagery, floating hero elements, an interactive four-product snack console, and an accessible bag preview.

Built with React 19, TypeScript, TanStack Start, Vite, CSS and Netlify Image CDN. Product images were generated specifically for this project using Netlify AI Gateway. Motion respects reduced-motion preferences, and the menu, options and bag work with a keyboard.

## Local development

Your existing Node **20.18.0** is supported; no Node upgrade or global Netlify CLI installation is needed. From the project folder, run:

```sh
npm install
npm run dev
```

Open the local URL printed in the terminal (normally http://localhost:3000). Existing pnpm users can instead run `pnpm install` and `pnpm dev`; the committed pnpm lockfile pins the compatible dependency graph.

Local development serves the original food images directly. Deployed pages use Netlify Image CDN. If the Netlify CLI is already installed, `netlify dev --port 8889` remains available.

TanStack Start 1.131.35, Vite 6 and their dependency overrides preserve compatibility with Node 20.18.0. Keep the overrides in sync for npm and pnpm, and check Node requirements before upgrading dependencies. The framework's built-in Netlify target generates the server deployment and publishes static assets to `dist`. Netlify continues to build with Node 24; your computer can stay on Node 20.18.0.

## Menu and ordering

The sample menu and USD prices are defined in `src/components/MarketingPage.tsx`. The selection console supports product switching, flavour options, adding to the bag, changing quantities, removing items, totals, and copying a snack list. The bag is temporary browser-session UI state and resets on refresh. It does not submit orders or take payments; this is clearly stated in the menu and bag. Confirm recipes, prices, allergens, currency, and fulfilment details before connecting a real ordering service.

Global styles and responsive layouts live in `src/styles.css`; social metadata lives in `src/data/site.ts`. Food assets live in `public/img/`. The optional `scripts/generate-food.mjs` regenerates assets through the Netlify AI Gateway in an authorized environment without exposing credentials.
