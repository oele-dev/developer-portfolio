# CV

Standalone, print-ready HTML resumes for Osmell Caicedo.

## Variants

| File | Pages | Purpose |
| --- | --- | --- |
| `osmell-caicedo-cv.html` | 1 | General resume, full contact details. |
| `osmell-caicedo-cv-upwork.html` | 1 | Same content without contact details — Upwork forbids direct contact info. |
| `osmell-caicedo-cv-inertia-vue.html` | 2 | Role-targeted resume: Livewire decomposition, Inertia/Vue migrations, legacy modernization. Experience-dominant, full-width sections, automatic print pagination. Vertical rhythm is controlled by `--sp-section` / `--sp-job` / `--sp-bullet`. |

## Not web-published

These files live in `cv/`, outside `app/` and `public/`. Next.js only serves files under those two directories, so none of them is bundled, routed, or deployed by the portfolio app. They are local, static assets you open directly in a browser — nothing in the build pipeline references them.

## How to edit

- **Content**: edit the markup directly inside the variant file. Sections are numbered `.section` blocks built from repeatable `.entry`, `ul.bullets` and `.skill-grid` markup — copy an existing block to add an entry.
- **Design tokens**: at the top of the `<style>` block, under `:root`, as CSS custom properties (`--paper`, `--ink`, `--ink-soft`, `--rule`, `--accent`, the three `--font-*` vars, plus page size/margin). Change a token once and it propagates everywhere it's used.

## How to export a PDF

1. Open the variant you want in Chrome.
2. Press `Cmd+P`.
3. Destination: **Save as PDF**.
4. Margins: **None** (or Default — the page already reserves `0.5in` via `@page`).
5. Enable **Background graphics** (required for the paper background and the accent rules to print).
6. Save.

Target output: **1 Letter page** for the general and Upwork variants, **2 pages** for the role-targeted resume. The latter paginates on its own — do not add fixed page containers to it.

## Design notes

- Ship Log tokens, mirrored from `app/css/globals.scss`: paper `#f3efe7`, ink `#0a0a0a`, accent `#ff4500`.
- Fonts: Instrument Serif (display), IBM Plex Sans (body), IBM Plex Mono (labels), all from Google Fonts with system fallbacks.
- Layout: full-width header over a two-column grid in the general and Upwork variants; the role-targeted resume runs full width with horizontal section headers, so no vertical strip is left empty.
- Single self-contained file: all CSS is inline in one `<style>` tag, no JavaScript, no external assets besides the optional Google Fonts link.
