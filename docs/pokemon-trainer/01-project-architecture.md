# Project Architecture — Pokémon Trainer Birthday Invitation

## Concept
Pokédex-inspired trainer profile + birthday adventure invitation. Original design language only — no official assets.

## Stack
Next.js App Router · TypeScript · Tailwind · GSAP · Framer Motion · Lenis · Swiper

## Flow
```
Pokédex Loading → Hero Entry → Trainer Profile → Adventure Log
→ Memory Badges → Party → Photo Dex → Video → Next Level Up
→ Location → Join Adventure → Ending
```

## Mobile First
- Target: 390–430px (iPhone 15 Pro)
- max-width container 430px centered

## State
- `PokedexLoadingScreen`: local useState, sessionStorage optional
- Countdown: client-only (ssr:false)
- Music: existing useBackgroundMusic hook
