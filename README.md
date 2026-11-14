# wedding

A wedding invitation for Suryaveer and Ananya, built with React, TypeScript, Vite and Framer Motion.

## Features

- Ivory and burgundy design with generated watercolor illustrations.
- Responsive layouts, animated envelope invitation and scroll reveals.
- Couple profiles, both families and expandable grandparents’ blessings.
- Celebration details, seven vows, venue directions and calendar download.
- RSVP and guestbook stored on the visitor’s device; no backend or automatic delivery to the family.
- Wedding watercolor gallery with animated popups, touch controls and keyboard navigation.
- Optional synthesized classical-style shehnai melody, tabla and tanpura, volume control and reduced-motion support.

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

## Dileep & Arpitha — Garden invitation

A separate invitation is available at `/dileep-arpitha/index.html`. Its source and local assets are in `public/dileep-arpitha/`; Vite includes this folder unchanged in the production build.

- Wedding: 22 November 2026 at 10:25 a.m. IST, R.S. Gardens, Pati, Patancheru.
- Animated floral doors, tap-responsive petals, English/Telugu text, countdown, calendar download, venue directions, and sharing.
- A prominent opening button, a close-up ceremony illustration, and a November calendar with the 22nd highlighted. The calendar download includes reminders one day and one hour before the wedding; guests import it into their own calendar app.
- The couple's supplied “Rang hai rang hai Mangal rang hai” soundtrack starts with the opening tap and loops. Its file is `public/dileep-arpitha/assets/wedding-music.mp3`; `public/dileep-arpitha/config.js` controls the audio path and volume.
- Mobile layouts, keyboard access, and reduced-motion support.
- The second section features the couple's supplied portraits, edited with coordinated sage garden backgrounds and displayed in botanical arch frames. The hero scroll link leads directly to it.

The existing Suryaveer and Ananya invitation remains at the root route. Review the new invitation's family details before sharing it with guests.
