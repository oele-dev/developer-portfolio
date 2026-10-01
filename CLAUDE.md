# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev          # Development server at http://localhost:3000
npm run build        # Production build
npm start            # Run the production build
npm run lint         # ESLint
```

## Architecture Overview

Next.js 14 App Router portfolio, English and Spanish via `next-intl` (`/` and `/es`). No backend: content lives in `utils/data/` and `messages/`.

The homepage tells one story in four chapters after a hero: **Foundation** (Laravel experience), **Craft** (how I work: performance and AI), **Building** (my own products) and **Next** (goals and contact). A bronze particle sculpture sits behind the copy, built from my portrait in the hero and changing shape per chapter.

```
app/
├── [locale]/
│   ├── layout.js          # Font, metadata, JSON-LD, stage canvas, header, footer, client islands
│   └── page.js            # Hero + four ChapterSection blocks
├── components/
│   ├── chapters/
│   │   ├── chapter-section.jsx     # Server. One chapter; the hero gets the only <h1>
│   │   ├── item-list.jsx           # Server. Experience/project/principle rows with status pill
│   │   ├── screenshot.jsx          # Server. <details> + next/image disclosure
│   │   ├── site-header.jsx         # Client. Logo with name reveal, chapter links, locale, camera button
│   │   ├── mobile-chapter-nav.jsx  # Client. Bottom pill + jump menu on mobile
│   │   ├── chapter-observer.jsx    # Client. Active chapter, reading bar, GTM chapter events
│   │   ├── proof-card.jsx          # Client. Live particle count and fps, only once the sculpture runs
│   │   ├── contact-form.jsx        # Client. EmailJS form
│   │   ├── sculpture.jsx           # Client. Loads the engine on idle; adds `no-3d` to <body> on failure
│   │   ├── sculpture-engine.js     # Three.js engine (framework-free)
│   │   ├── sculpture-shapes.js     # Per-chapter grayscale depth maps
│   │   └── events.js               # DOM event names + GTM `track()`
│   ├── protected-email.jsx         # Joins the address after mount so scrapers miss it
│   ├── title-pulse.jsx
│   └── toast-provider.jsx
└── css/
    ├── globals.scss       # Color tokens, base styles
    └── _chapters.scss     # Effects utilities can't express: veils, side flips, sheen, disclosures

utils/data/
├── chapters.js           # Chapter order, sculpture side and motion per chapter
├── projects-data.js      # Projects with `chapter`, `status`, `screenshot`, EN/ES copy
├── experience.js         # Jobs with short `summary` (homepage) and long `description`
└── personal-data.js      # Name, email parts, socials, resume URL

messages/en.json, es.json # All UI copy; headlines use <em> for the cobalt phrase
public/image/             # Screenshots and portrait.jpg (sculpture source)
public/llms.txt           # Plain-text summary for AI agents; keep in sync with the page
```

### Key Patterns

**Chapters are server components; interactivity lives in small client islands.** The page works without JavaScript; JS adds the active-chapter state, the mobile menu and the sculpture.

**Islands talk through DOM events, not a React provider** (`app/components/chapters/events.js`). `ChapterObserver` emits `chapter:change`; the header, mobile nav and sculpture listen. The camera button emits `sculpture:toggle-camera`; the engine answers with `sculpture:camera`. No island imports another, so the sculpture can fail without breaking navigation.

**The sculpture is optional.** `sculpture.jsx` dynamic-imports the engine on `requestIdleCallback`, so text paints first and Three.js ships in its own chunk. Any error adds `no-3d` to `<body>`, which hides the canvas, veils and camera button.

**Sculpture rendering.** Each particle samples one pixel of a 180×180 grid (120 on mobile). Brightness drives color and relief. Ink (dot size and opacity) follows darkness for photos and brightness for chapter shapes, so a portrait reads like an engraving on the light background. Colors come from the `--sculpt-*` CSS tokens.

### Styling System

Tailwind for layout and typography, SCSS for effects. Light theme only for now.

- Background travertine `--paper #e8e3db`, text `--ink #1c1917`, body `--ink-body #44403c`, muted `--ink-soft #615a53`
- Accent cobalt `--accent #2340ff`, used for one phrase per headline, links, chapter numbers and the "Live" pill
- Sculpture bronze `--sculpt-lo #3a2618` to `--sculpt-hi #a87a45`, always darker than the background
- Font: Instrument Sans via `next/font`, 17px base, perfect-fourth scale
- Tailwind is 3.3: use arbitrary values for `text-wrap` and for opacity on CSS-variable colors (`color-mix(...)`)

## Common Tasks

### Add a project
1. Add a 16:10 screenshot to `public/image/` (optional).
2. Add an entry to `utils/data/projects-data.js` with `chapter`, `status`, `statusLabel`, `url`, `name`, `summary`, `alt` and `screenshot: { src, width, height }`. Write both `en` and `es`.
3. If it is a product, add it to `public/llms.txt` under "My products".

### Change chapter copy
Edit `messages/en.json` and `messages/es.json`. Wrap the highlighted phrase in `<em>` inside the headline.

### Change a chapter's sculpture shape or motion
Shapes: `sculpture-shapes.js` (draw bright = closer). Motion and side: `utils/data/chapters.js`.

## Third-Party Integrations

- **EmailJS** (contact form): `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`. See `.env.example`.
- **Google Tag Manager**: `NEXT_PUBLIC_GTM`. The page pushes `chapter_view` (once per chapter) and `camera_on` to `dataLayer`.
- **Vercel Speed Insights**: included in the layout.

## Path Aliases
`@/` points to the project root.

## Resume (CV)
A print-ready, self-contained HTML resume lives in `cv/osmell-caicedo-cv.html`. It is intentionally **not web-published**: it lives outside `app/` and `public/`, so Next.js never serves or bundles it. To export a PDF, open it in Chrome and print to PDF; see `cv/README.md`.
