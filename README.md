# wedding

A wedding invitation for Suryaveer and Ananya, built with React, TypeScript, Vite and Framer Motion.

## Features

- Ivory and burgundy design with generated watercolor illustrations.
- Responsive layouts, animated envelope invitation and scroll reveals.
- Couple profiles, both families and expandable grandparents’ blessings.
- Celebration details, seven vows, venue directions and calendar download.
- RSVP and guestbook stored on the visitor’s device; no backend or automatic delivery to the family.
- Optional synthesized background music and reduced-motion support.

## Run locally

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Validate and build

```sh
npm run lint
npm run build
npm run preview
```

For static hosting, use `npm ci && npm run build` as the build command and `dist` as the publish directory.

## Customize

Wedding details and profiles are in `src/data/weddingData.ts`. The current page is implemented in `src/App.tsx` with styling in `src/App.css` and `src/index.css`. Images are in `public/images`.

The names, event details and generated illustrations are demonstration content; replace them as needed before sharing a personal invitation.
