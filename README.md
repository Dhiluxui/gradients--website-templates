# Grainient.supply Clone

A high-performance clone of [grainient.supply](https://grainient.supply/), featuring over 1,000+ curated gradients, procedural film grain shaders, real-time WebGL/Canvas simulation engines, and complete design-to-code toolkits for modern web developers.

---

## ⚡ Highlights & Key Features

- **Iconic Visual Aesthetic:**
  - Deep obsidian dark theme (`#09090b`, `#141418`) paired with signature Electric Lime (`#c2f13c`)
  - Procedural film grain overlays and glassmorphic card containers
  - WCAG AA contrast compliance and balanced typography (`text-wrap: balance`)
- **Complete Page Suite:**
  - `index.html`: Hero, Featured Collections showcase, interactive Shader Studio preview, curated gallery, pricing tiers, community testimonials, FAQ accordion, and newsletter.
  - `collections.html`: Full filterable gallery of 1,000+ assets with category pills and live search.
  - `shader.html`: Dedicated real-time Shader Gradient Editor with 4-stop color pickers, speed, turbulence, grain, and code export.
  - `animated-gradients.html`: Living interactive canvas loop library.
  - `noisy-grainy.html`: Dedicated Noisy & Grainy gradients (387 assets).
  - `smooth-blend.html`: Dedicated Smooth Blend mesh gradients (466 assets).
  - `ai-generated.html`: Dedicated Generative Wallpapers (556 assets).
  - `pricing.html`: Transparent tier comparison (Freebie, $59 Lifetime Pro, $299 Studio).
  - `request.html`: Interactive custom gradient request portal.
  - `faq.html`: Detailed licensing and technical FAQ.
  - `sign-in.html`: Vault sign-in page.
  - `404.html`: Custom 404 page with seamless return-to-home actions.
- **Client-Side Computational Engine (Phase 5 Protocol):**
  - Isolated pure functions for color space math (`hexToRgb`, `rgbToHsl`, `lerpColor`, bounds checking, NaN guarding).
  - Procedural noise & deterministic PRNG using Mulberry32.
  - Real-time `requestAnimationFrame` with Delta Time (`dt`) decoupled from DOM cycles to prevent render thrashing.
  - Multi-target code synthesis: Standard CSS (`radial-gradient`), Tailwind CSS arbitrary utility classes, SVG Noise filter URI, and React JSX components.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Serve Production App
```bash
npm run serve
```
Open [http://localhost:5174](http://localhost:5174) in your browser.

---

## 📐 Architecture & Modularity

All files strictly comply with the **450-Line Splitting Protocol**:

```
grainient-app/
├── index.html                  # Main landing page (<350 lines)
├── collections.html            # All collections gallery
├── shader.html                 # Dedicated Shader Tool
├── animated-gradients.html     # Animated canvas loops
├── noisy-grainy.html           # 387 Noisy/Grainy assets
├── smooth-blend.html           # 466 Smooth blend assets
├── ai-generated.html           # 556 Generative wallpapers
├── pricing.html                # Pricing matrix & licenses
├── request.html                # Custom pack requests
├── faq.html                    # FAQ accordion & docs
├── sign-in.html                # Member authentication
├── 404.html                    # Custom 404 page
├── serve.mjs                   # Clean URL Node.js server
├── vite.config.ts              # Multi-page build config
├── tsconfig.json               # Strict TypeScript config
└── src/
    ├── components/
    │   ├── Navbar.ts           # Sticky nav, mobile drawer (<150 lines)
    │   ├── Footer.ts           # Footer & license info (<120 lines)
    │   ├── GradientCard.ts     # Card & hover actions (<110 lines)
    │   ├── Modal.ts            # Inspector modal & tabs (<160 lines)
    │   ├── ShaderStudio.ts     # Real-time studio controls (<220 lines)
    │   └── Toast.ts            # Copied-to-clipboard toast (<60 lines)
    ├── data/
    │   └── gradients.ts        # Gradient dataset & palettes (<150 lines)
    ├── logic/
    │   ├── color/
    │   │   └── colorSpace.ts   # Pure color space math (<120 lines)
    │   ├── noise/
    │   │   └── proceduralNoise.ts # Mulberry32 PRNG & grain (<60 lines)
    │   ├── shader/
    │   │   └── shaderEngine.ts # RAF + dt simulation engine (<150 lines)
    │   └── export/
    │       └── cssGenerator.ts # CSS, Tailwind, SVG, React generator (<70 lines)
    ├── pages/
    │   ├── home.ts             # Home page controller (<140 lines)
    │   ├── collectionsPage.ts  # Collections controller (<100 lines)
    │   └── shaderPage.ts       # Dedicated shader controller (<90 lines)
    └── styles/
        ├── tokens.css          # Phase 1 design tokens (<260 lines)
        └── global.css          # Reset, auto-layout flex/grid (<120 lines)
```
