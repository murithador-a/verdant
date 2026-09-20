# Verdant Clean — Premium Cleaning Services in Lagos

A complete, production-quality marketing website for **Verdant Clean**, a fictional premium
cleaning company. Designed and built as a flagship portfolio piece — Apple × Linear × premium
hospitality × modern architecture studio.

> **We make spaces feel new.**

## Highlights

- **Cinematic hero** — full-viewport imagery, staged GSAP intro, ambient Three.js glass-orbs
  canvas (lazy-loaded, reduced on mobile, disabled for reduced motion), scroll parallax.
- **Scroll-driven transformation** — a pinned GSAP ScrollTrigger sequence that takes a room
  from *lived-in → being cleaned → completely refreshed* as you scroll.
- **Interactive before/after** — room tabs plus a fully keyboard-accessible draggable
  comparison slider (native range input, touch-friendly).
- **Full conversion system** — every major CTA opens WhatsApp with a pre-filled message via
  one reusable component (`src/components/WhatsAppCTA.tsx` + `src/lib/whatsapp.ts`).
- **Editorial sections** — services, dark "Why Verdant", process, membership-style plans,
  commercial, animated stats, testimonials, team, stylised Lagos coverage map, journal with
  an accessible article reader, FAQ accordion, and a full-bleed final CTA.
- **Craft details** — Lenis smooth scrolling, film grain, scroll progress bar, floating
  WhatsApp pill, loader veil, custom Lagos map SVG, JSON-LD structured data, complete SEO/OG
  metadata.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- GSAP + ScrollTrigger, Lenis smooth scroll
- Three.js (lazy-loaded ambient 3D)
- Manrope + Inter (self-hosted via Fontsource)

## Getting started

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/   # One component per section + shared UI (Reveal, icons, Logo, …)
  lib/          # site.ts (all copy/content), whatsapp.ts, motion.ts, cn.ts
  App.tsx       # Composition + smooth-scroll setup
  main.tsx      # Entry (fonts, styles)
  index.css     # Tailwind theme, tokens, keyframes, a11y styles
public/images/  # Art-directed imagery (16 assets)
```

## Accessibility & performance

- Semantic landmarks, skip link, labelled controls, keyboard-operable slider/accordion/menu.
- `prefers-reduced-motion` respected throughout (static fallbacks, no smooth scroll).
- Lazy-loaded imagery, code-split 3D, self-hosted variable fonts, ~2.7 MB total imagery.

---

© 2026 Verdant Clean. Built by [MurkingDev](https://murking.vercel.app) · [LinkedIn](https://www.linkedin.com/in/murithadorabdulmaliq).
