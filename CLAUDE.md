# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev          # Start development server at http://localhost:3000

# Production
npm run build        # Create production build
npm start            # Run production server

# Code Quality
npm run lint         # Run ESLint
```

## Architecture Overview

This is a Next.js 14 developer portfolio using the App Router with a data-driven architecture. All portfolio content (projects, skills, experience, education) is stored as JavaScript objects in `/utils/data/` - there is no backend or database.

### Project Structure

```
app/
├── components/          # React components organized by feature
│   ├── navbar.jsx
│   ├── footer.jsx
│   ├── helper/         # Reusable utilities (GlowCard, AnimationLottie)
│   └── homepage/       # Section components (hero, about, experience, etc.)
├── css/                # Global SCSS styles
│   ├── globals.scss    # Tailwind directives + custom CSS variables
│   └── card.scss       # GlowCard effects (conic gradients, hover animations)
├── layout.js           # Root layout with GTM, ToastContainer, Speed Insights
└── page.js             # Homepage - orchestrates all sections

utils/
├── data/               # Portfolio content (edit these to update content)
│   ├── personal-data.js    # Name, email, social links, resume URL
│   ├── projects-data.js    # Project objects with name, description, tools, images
│   ├── skills.js           # Array of skill names
│   ├── experience.js       # Work experience entries
│   └── educations.js       # Education entries
├── skill-image.js      # Maps skill names to SVG icons (50+ icons)
└── check-email.js      # Email validation regex

public/
├── image/              # Project screenshots referenced in projects-data.js
├── lottie/             # Lottie animation JSON files
└── svg/                # SVG icons organized by category (skills/, education/, etc.)
```

### Key Architectural Patterns

**Data-Driven Content**: To update portfolio content, edit the JavaScript objects in `/utils/data/`. Components import and render this data.

**Hybrid Styling**: Uses Tailwind CSS for layouts and utilities, SCSS for complex effects (glow cards, gradients). Custom CSS variables in `globals.scss` control colors and positioning.

**Client vs Server Components**: Most interactive components use `"use client"` directive (forms, animations, mouse tracking). The homepage is a server component.

**Component Reusability**:
- `GlowCard` (app/components/helper/glow-card.jsx): Wraps content with mouse-tracking glow effect
- `AnimationLottie` (app/components/helper/animation-lottie.jsx): Standardized Lottie animation wrapper

**Image Organization**: Project images are imported in `projects-data.js` from `/public/image/`. Next.js Image component handles optimization.

### Styling System

**Color Scheme** (defined in `globals.scss`):
- Primary accent: `#16f2b3` (cyan-green)
- Secondary: `pink-500`, `violet-600`
- Background: `#0d1224` (dark navy)
- Text: white with gray accents

**Responsive Breakpoints**: Uses Tailwind defaults plus custom `4k` breakpoint (1980px) in `tailwind.config.js`.

**Advanced Effects**: The GlowCard component uses CSS custom properties (`--x`, `--y`, `--glow-left`, `--glow-top`) updated via pointer events for interactive hover effects.

## Third-Party Integrations

### EmailJS (Contact Form)
Contact form uses EmailJS for serverless email sending. Required environment variables:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```

See `.env.example` for template. Contact form is in `app/components/homepage/contact/contact-form.jsx`.

### Analytics & Performance
- **Google Tag Manager**: Configured in `layout.js` via `NEXT_PUBLIC_GTM` env variable
- **Vercel Speed Insights**: Auto-included in layout

### Dev.to Blog Integration
Blog section fetches posts from Dev.to API using `devUsername` from `personal-data.js`.

## Common Development Tasks

### Adding a New Project
1. Add project image to `/public/image/`
2. Import image at top of `utils/data/projects-data.js`
3. Add project object to `projectsData` array following existing schema:
   ```javascript
   {
     id: <next_id>,
     name: 'Project Name',
     description: 'Description',
     tools: ['Tech1', 'Tech2'],
     role: 'Your Role',
     code: 'github_url',  // or '' if private
     demo: 'demo_url',    // or '' if none
     image: importedImage,
   }
   ```

### Adding a New Skill
1. Add skill name to `utils/data/skills.js` array
2. Ensure corresponding SVG exists in `/public/svg/skills/` (filename should match skill name, lowercase)
3. If icon doesn't exist in `utils/skill-image.js`, add case to switch statement

### Updating Personal Information
Edit `utils/data/personal-data.js` - changes reflect immediately on hero, about, and contact sections.

### Modifying Styles
- **Layout/spacing**: Use Tailwind utilities in component JSX
- **Complex effects**: Edit `app/css/card.scss` or `app/css/globals.scss`
- **Colors**: Update CSS variables in `globals.scss` root/body selectors

## Image Domains
External images are configured in `next.config.js`:
- `res.cloudinary.com` (for external hosted images)
- `media.dev.to` (for blog post images)

Add additional domains here if needed for Next.js Image component optimization.

## Path Aliases
`jsconfig.json` configures `@/` alias pointing to project root. Use `@/utils/data/personal-data` instead of relative paths.

## Notes
- This portfolio has no light mode - only dark theme
- No API routes or backend - all content is static at build time (except Dev.to blog)
- Skills section uses `react-fast-marquee` for horizontal scrolling
- Projects section uses sticky positioning with staggered z-index
- Lottie animations located in `/public/lottie/` are referenced by filename in section components

## Resume (CV)
A print-ready, self-contained HTML resume lives in `cv/osmell-caicedo-cv.html` (Resuminator-style two-column clone). It is intentionally **not web-published** — it lives outside `app/` and `public/`, so Next.js never serves or bundles it. To export a PDF, open it in Chrome and print to PDF; see `cv/README.md` for details.
