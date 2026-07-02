# CV

Standalone, print-ready HTML resume for Osmell Caicedo — a Resuminator-style two-column clone (blue/rounded, teal initials avatar).

## Not web-published

This file lives in `cv/`, outside `app/` and `public/`. Next.js only serves files under those two directories, so `osmell-caicedo-cv.html` is never bundled, routed, or deployed by the portfolio app. It is a local, static asset you open directly in a browser — nothing in the build pipeline references it.

## How to edit

- **Content**: edit the markup directly inside `osmell-caicedo-cv.html`. Sections are grouped as `Experience`, `Projects`, `Skills`, `Education`, each using repeatable `.entry` / `.project` / `.skill-group` blocks — copy an existing block to add an entry.
- **Design tokens**: at the top of the `<style>` block, under `:root`, as CSS custom properties (`--color-heading`, `--color-blue`, `--color-teal`, `--color-text`, `--color-muted`, `--font-family`, plus page size/margin vars). Change a token once and it propagates everywhere it's used.

## How to export a PDF

1. Open `osmell-caicedo-cv.html` in Chrome.
2. Press `Cmd+P`.
3. Destination: **Save as PDF**.
4. Margins: **None** (or Default — the page already reserves `0.5in` via `@page`).
5. Enable **Background graphics** (required for the blue rules and teal avatar to print).
6. Save.

Target output: exactly **1 Letter page**.

## Design notes

- Color tokens: name/heading `#334155`, accent blue `#2563eb`, teal avatar `#5eead4`, muted text `#64748b`.
- Font: Poppins (Google Fonts), falls back to `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.
- Layout: full-width header (name/subtitle/contact left, circular "OC" initials avatar right) over a two-column grid — left ≈58% Experience, right ≈42% Projects → Skills → Education.
- Single self-contained file: all CSS is inline in one `<style>` tag, no JavaScript, no external assets besides the optional Google Fonts link.
