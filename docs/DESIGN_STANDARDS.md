# NBA "Signature" Design Standards

The Neelus Boarding Adventure (NBA) application utilizes a bespoke, premium design language internally referred to as the **"BBA Dog-Tech Matrix"** aesthetic. 

This document serves as the single source of truth for all UI/UX development to ensure visual continuity.

---

## 1. Core Identity & Inspiration
The app's design is heavily inspired by its parent company, **BBA Consulting Services, LLC**. The visual theme merges high-end enterprise technology (circuits, blueprints) with the domain of pet care (subtle paw prints, bones).

**The Vibe:** Premium, trustworthy, state-of-the-art, and slightly futuristic but grounded in utility.

## 2. Color Palette (The BBA Orbs)
Avoid flat colors and rely on our established lighting components and gradients.

- **Primary Background:** Slate 950 (`#020617`). All pages should feel dark and moody.
- **Architectural Azure (Blue):** `cyan-400` / `blue-600`. Used for the main interactive elements, text gradients, and technical blueprint lines.
- **Networking Copper (Orange):** `amber-500` / `amber-600`. Used for urgent notifications, verification widgets, and networking/connection cues.
- **Circuit Silver (Gray):** `slate-400` / `slate-500`. Used for secondary text, borders, and circuit board traces.

## 3. The Ambient Watermark
Pages must render with the `<AmbientBackground />` component. This component projects:
1. Low-opacity mix-blend screens of our three core colors.
2. A very faint (3% opacity) SVG pattern map overlay that interweaves architectural blueprints, circuit nodes, and dog elements.

## 4. UI Elements & Glassmorphism
- **Cards & Containers:** We use standard CSS classes (`premium-glass` in `index.css`) rather than inline Tailwind `@apply` strings for containers. This ensures deep blur (`backdrop-filter: blur(24px)`) and a slate transparent background (`rgba(15, 23, 42, 0.4)`).
- **Typography:** Headings use `font-black tracking-tight` (or `tighter`). Section headers use `uppercase tracking-[0.2em]`.
- **Buttons:** Primary buttons should use Cyan 500, black text, and cast a soft, pulsing shadow (`shadow-[0_0_20px_rgba(34,211,238,0.2)]`).

## 5. Development Guidelines
- Always refer to `index.css` for source-of-truth utility logic. 
- Avoid overriding the global layout. Wrappers are standardized in `App.tsx`.
- Whenever adding new visual features, consult these guidelines to ensure they look like a $1M software suite, not a quick MVP.
