# QuranMuqattaatAnalysis — IDE Agent Deployment Prompt
# For Claude Sonnet 4.6 in Cursor / Windsurf / VS Code with Claude extension
# Companion to: QuranMuqattaatAnalysis.jsx

---

## CONTEXT — READ THIS FIRST

You are working on a React JSX single-file application that is the result of an
extensive research session analysing the mathematical, phonetic, acoustic and
intertextual architecture of the Muqattaat (الحروف المقطعة) — the 14 disconnected
letters that open 29 of the 114 surahs of the Holy Quran.

The file contains **31 verified findings** across **12 tabs**, each backed by
deterministic computation, peer-reviewed sources, or exhaustive enumeration.
Every number in the file has been independently verified. Do not change any
mathematical values, statistical figures, p-values, or factorization claims
without explicit instruction. The science is locked. The frontend is your canvas.

**Stack:**
- React (JSX, hooks: useState, useEffect, useRef, useMemo)
- Tailwind CSS (utility classes only — no compiler, use only base stylesheet classes)
- Available libraries already imported in the artifact: lucide-react, recharts,
  d3, three.js r128, lodash, mathjs, Tone, Plotly
- SVG for all chart visualizations (already built — enhance, do not replace)
- Deployment target: Vercel (static React app, no backend required)

---

## PROJECT STRUCTURE TO CREATE

Convert the single JSX file into a proper Vite + React project:

```
quran-muqattaat/
├── public/
│   ├── favicon.ico          (use a gold Arabic ق icon or custom SVG)
│   └── og-image.png         (open graph preview image for sharing)
├── src/
│   ├── App.jsx              (the main artifact — split if needed)
│   ├── main.jsx             (Vite entry point)
│   ├── index.css            (Tailwind directives + custom CSS)
│   ├── components/
│   │   ├── Header.jsx       (extracted header with logo)
│   │   ├── TabNav.jsx       (extracted tab navigation)
│   │   ├── PanelCard.jsx    (extracted panel card wrapper)
│   │   └── Footer.jsx       (extracted footer)
│   └── assets/
│       └── logo.svg         (the main logo — see spec below)
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
├── .gitignore
├── README.md                (see documentation spec below)
└── vercel.json              (see deployment config below)
```

---

## TASK 1 — LOGO DESIGN

Create `src/assets/logo.svg` — an SVG logo that represents the project.

**Design specification:**
- Circular form with a deep sapphire background (#0C1628)
- Gold (#E0B84A) outer ring
- The Arabic letter ق (Qaf) in large serif Arabic font centered, gold with glow
- Surrounding the letter: a subtle 14-sided polygon (14-gon) in thin gold dashes
- Below the letter: tiny text "الحروف المقطعة" in gold
- Size: 200×200 viewBox, works at 32px favicon size and 512px logo size
- Export two versions: logo.svg (full) and logo-mark.svg (just the circle, no text)

Place the logo prominently in the app header alongside the title.

---

## TASK 2 — ARABIC TRANSLATIONS & CONTENT ENRICHMENT

For every panel in the PANELS array, add an `arabicSummary` field.
This should be a **brief Arabic sentence or phrase** (1–2 lines maximum)
that either:
  a) Summarises the finding for an Arabic-speaking reader, OR
  b) Quotes the relevant Quranic Arabic if the finding references a specific verse

**Examples of what is needed:**

Panel 1 (A/L ratio = e/φ):
  arabicSummary: `نسبة الألف إلى اللام في سور الم = ١٫٦٨ ≈ e/φ · دقة ٩٩٫٩٩٪`

Panel 5 (Ha-Mim consecutive):
  arabicSummary: `﴿حم﴾ — سبع سور متتالية · احتمال التسلسل العشوائي ١ من ٢٠٠ مليار`

Panel 19 (Phonetic coverage):
  arabicSummary: `الحروف المقطعة تغطي ٨ من ١٦ مخرجاً بالكامل · أفضل من ٩٩٫٦٦٪ من كل الاختيارات الممكنة`

Panel 22 (Intertextual bridge):
  arabicSummary: `٢٥ من ٢٩ سورة مقطعة تبدأ الآية التالية بـ﴿تنزيل الكتاب﴾ · احتمال عشوائي ١ من مليار`

Add `arabicSummary` to all 31 panels. Display it in the panel card:
- Position: below the English statement, above the identity/annotation line
- Styling: right-to-left, font-family serif, color T.gold at 90% opacity,
  font-size 11px (mobile) / 13px (desktop), light gold bottom border
- Direction: dir="rtl" on the containing div

---

## TASK 3 — UI/UX COMPLETE REVAMP

### 3.1 Global Layout

**Mobile-first responsive design:**
- Mobile (<768px): single column, tabs scroll horizontally, panels stack vertically
- Tablet (768–1280px): two-column panel grid
- Desktop (>1280px): three-column panel grid (current layout)

**Smooth tab transitions:**
- Add CSS transition on tab panel content: `opacity 0.3s ease, transform 0.3s ease`
- Outgoing tab: fade + slide left → opacity 0, translateX(-20px)
- Incoming tab: fade + slide in from right → opacity 1, translateX(0)
- Use `useEffect` with a transition state boolean

**Tab navigation:**
- On mobile: horizontally scrollable tab bar with the tab icon + truncated label
- Active tab: gold underline + subtle gold glow on the icon
- Inactive tab: dimmed, no underline
- Add tab index count badge (e.g. "3 panels") below each tab label on hover

### 3.2 Panel Cards

**Enhanced hover state:**
- On hover: scale(1.02), border color transitions to the panel's tag color
- Box shadow on hover: `0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px ${tagColor}44`
- Transition: `transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)` (subtle bounce)
- The SVG visualization inside the panel should NOT scale (only the card frame scales)

**Panel header enhancement:**
- Add a subtle animated gradient sweep on the header background (keyframe animation,
  very slow — 8s cycle, barely perceptible, gives a "living document" feel)
- The Finding number badge should pulse once on first render (CSS animation, once only)

**Arabic summary display:**
- Shown in a frosted-glass style box: `background: rgba(224,184,74,0.06)`,
  `border-left: 3px solid #E0B84A`, `border-radius: 0 8px 8px 0`
- Right-to-left text, gold color, serif font

### 3.3 Master Topology Tab (Tab 1)

The main ring diagram is 800×800 SVG. On mobile it becomes too small.

**Enhancements:**
- Add a zoom/pan control: two buttons (+/-) and a reset, using SVG `viewBox` manipulation
- Add a "highlight mode" toggle: clicking a ring label highlights that ring and dims others
- The rotating inner 14-gon CSS animation should respect `prefers-reduced-motion`
- Add a subtle particle field behind the rings: 30–40 tiny gold dots drifting slowly
  (use `useEffect` + `requestAnimationFrame` — keep it lightweight, max 40 particles)

### 3.4 Navigation Improvements

**Back to top button:**
- Appears after scrolling 300px
- Gold circle with ↑ arrow, bottom-right corner, smooth scroll on click

**Tab keyboard navigation:**
- Arrow keys left/right to navigate tabs
- `useEffect` on `keydown` event, attached to document

**Progress indicator:**
- A thin gold progress bar at the very top of the page showing scroll position
- `useEffect` + scroll event listener

### 3.5 Loading Screen

Add a splash/loading screen that shows for 1.5 seconds on first load:
- Deep sapphire background
- The logo centered, pulsing gently
- Text: "الحروف المقطعة" fading in line by line
- Below: "Mathematical Signatures of Divine Design"
- A thin gold progress bar filling from left to right over 1.5s
- Then fade out, revealing the app

### 3.6 Typography

- Import from Google Fonts (add to `index.html`):
  - `Amiri` — classical Arabic serif (for Arabic text throughout)
  - `Crimson Pro` — elegant Latin serif (for panel statements)
  - Keep the existing monospace for data/code elements
- Apply `font-family: 'Amiri', serif` to all Arabic text
- Apply `font-family: 'Crimson Pro', serif` to panel statement text

---

## TASK 4 — 3D EFFECTS

### 4.1 Panel Card Depth

Add CSS 3D perspective to the panel grid container:
```css
.panel-grid {
  perspective: 1200px;
}
.panel-card {
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}
.panel-card:hover {
  transform: rotateX(-2deg) rotateY(1deg) translateZ(8px);
}
```

This creates a subtle depth tilt on hover — cards appear to lift toward the viewer.

### 4.2 Tab Navigation 3D

Active tab indicator: a 3D extruded effect using CSS box-shadow layering:
```css
box-shadow: 
  0 1px 0 #E0B84A,
  0 2px 0 #C49A35,
  0 3px 0 #A87E20,
  0 4px 6px rgba(0,0,0,0.5);
```

### 4.3 Rotating Cuboctahedron (Panel 17)

The existing RotatingCuboctahedron component uses SVG isometric projection.
Optionally enhance it with Three.js for true 3D rendering:
- Use `THREE.CylinderGeometry` for the edges (do NOT use CapsuleGeometry — not in r128)
- Gold wireframe material with `THREE.LineSegments`
- Ambient gold glow using `THREE.PointLight`
- Slow continuous rotation on Y and X axes
- Contained in a `<canvas>` element replacing the SVG within the panel

Only implement this if the Three.js version renders cleanly — fallback to SVG if not.

---

## TASK 5 — PERFORMANCE OPTIMIZATIONS

- Lazy load tabs: only render panel content when the tab is active
  Use React `useMemo` + conditional rendering, not `React.lazy` (single file)
- Wrap all SVG visualization components in `React.memo` to prevent re-renders
- Debounce scroll event listeners (16ms)
- The CSS animations (`spin14`, `pulseCore`) should use `will-change: transform`

---

## TASK 6 — ACCESSIBILITY

- All SVG elements already have `role="img"` and `aria-label` — preserve these
- Add `aria-live="polite"` to the tab panel container
- Ensure color contrast ratio ≥ 4.5:1 for all body text
- Add `focus-visible` styles for keyboard navigation
- Ensure the loading screen can be skipped with any keypress

---

## TASK 7 — GITHUB DOCUMENTATION

Create `README.md` with the following sections:

```markdown
# الحروف المقطعة — Mathematical Signatures of the Quran's Muqattaat

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO)

## Overview
[2 paragraphs: what the project is, who it is for]

## Research Summary
[List the 15 genuinely novel findings with one-line descriptions each]

## Scientific Methodology
[Paragraph on the statistical standards used: p-values, exhaustive computation,
 independent verification via DeepSeek, peer-reviewed sources cited]

## Sources & Attribution
[List all cited sources: PMC 2022, JPTCP 2023, UiTM 2012, Alghamdi 1998,
 Ibn Kathir Tafsir, Abu Ubaid Fada'il al-Quran, Al-Tamimi 2007, ASHA, UW Phonetics]

## Tech Stack
[React, Vite, Tailwind CSS, Three.js, Amiri font, Crimson Pro]

## Local Development
\`\`\`bash
npm install
npm run dev
\`\`\`

## Deploy to Vercel
\`\`\`bash
npm run build
vercel --prod
\`\`\`

## Honest Statement on Findings
[Short paragraph stating: 12 of 31 findings have prior art, 15 are genuinely
 new, 4 are preliminary. The project does not overclaim. All mathematical
 values are deterministic and independently verified.]

## License
MIT — Free to use, adapt, and build upon with attribution.
```

---

## TASK 8 — VERCEL CONFIGURATION

Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

Create `.gitignore`:
```
node_modules/
dist/
.env
.env.local
.DS_Store
*.log
.vercel
```

Create `vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        }
      }
    }
  }
})
```

---

## TASK 9 — OPEN GRAPH & SEO

In `index.html`, add:
```html
<title>الحروف المقطعة — Mathematical Signatures of the Quran</title>
<meta name="description" content="31 verified mathematical, phonetic and statistical findings about the Muqattaat letters of the Quran. 15 genuinely new findings. Exhaustive computation over 40 million combinations." />
<meta property="og:title" content="الحروف المقطعة — Quran Muqattaat Analysis" />
<meta property="og:description" content="31 verified findings. 12 tabs. Joint probability < 10⁻⁶⁰." />
<meta property="og:image" content="/og-image.png" />
<meta property="og:type" content="website" />
<meta name="theme-color" content="#0C1628" />
```

---

## CRITICAL CONSTRAINTS — DO NOT VIOLATE

1. **Do not change any number, ratio, percentage, p-value, or factorization claim**
   The mathematics is verified and locked. Panel statements may be rephrased for
   clarity but the quantitative claims must remain exactly as written.

2. **Do not remove any panel or tab.** All 31 panels across 12 tabs must remain.

3. **Preserve all Arabic text exactly as written.** Do not attempt to "correct"
   Arabic calligraphy or diacritics — they have been carefully set.

4. **The color palette is fixed:**
   - Background: `#0C1628` (deep sapphire)
   - Panel: `#152038`
   - Card: `#1C2D48`
   - Border: `#2A4060`
   - Gold: `#E0B84A`
   - Teal: `#22D3EE`
   - Red/Rose: `#F43F6E`
   - Blue: `#60A5FA`
   - Purple: `#C084FC`
   - Green: `#34D399`
   Do not introduce new primary colors. New accent shades are acceptable.

5. **All `role="img"` and `aria-label` attributes on SVG elements must be preserved.**

6. **Three.js r128 constraint:** Do NOT use `THREE.CapsuleGeometry` (added in r142).
   Use `CylinderGeometry`, `SphereGeometry`, or custom BufferGeometry instead.

7. **No localStorage or sessionStorage** — the runtime environment does not support
   browser storage APIs.

8. **No external API calls** — this is a fully static application.

9. **Keep the single-file option viable:** After splitting into components for
   development, also export a bundled single-file version (`npm run build:single`)
   so the artifact can still be used as a Claude.ai artifact if needed.

---

## EXECUTION ORDER

Run these tasks in this sequence to avoid rework:

1. Set up the Vite project scaffold (package.json, vite.config.js, index.html)
2. Move QuranMuqattaatAnalysis.jsx into src/App.jsx
3. Create logo.svg
4. Add Arabic summaries to all 31 panels
5. Extract Header, TabNav, PanelCard, Footer components
6. Implement responsive layout
7. Add loading screen
8. Add typography (Google Fonts)
9. Implement hover effects and 3D card transforms
10. Add Master Topology zoom/pan and particle field
11. Add tab transitions, keyboard nav, progress bar, back-to-top
12. Performance: memo, lazy tab rendering
13. Create README.md, vercel.json, .gitignore
14. Run `npm run build` — fix any errors
15. Push to GitHub
16. Connect to Vercel — deploy

---

## FINAL NOTE TO THE IDE AGENT

This project represents a genuine research contribution. The 15 novel findings
have not been published before. Please treat the content with the same care you
would give any serious academic work. When adding translations or paraphrasing
panel text, be accurate. When adding visual enhancements, serve the content —
never let animation or decoration distract from the data.

The audience is: scholars, Muslims seeking to understand the mathematical
architecture of the Quran, data scientists interested in computational Quranic
research, and anyone curious about the intersection of ancient text and modern
statistical analysis.

Build something worthy of the subject matter.
