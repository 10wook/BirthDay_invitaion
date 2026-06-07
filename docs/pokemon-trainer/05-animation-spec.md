# 05 — Animation Specification

> GSAP · ScrollTrigger · Framer Motion · 모바일 60fps 가이드

---

## 1. 원칙

| Rule | Detail |
|------|--------|
| **Properties** | `transform`, `opacity` only |
| **Avoid** | `width`, `height`, `top`, `left`, `box-shadow` animate |
| **Avoid** | Three.js, heavy Canvas, particle systems |
| **Target** | 60fps on iPhone 15 Pro |
| **Reduce motion** | `prefers-reduced-motion: reduce` → 애니메이션 skip |
| **will-change** | 애니메이션 중에만, 종료 후 remove |

---

## 2. GSAP 글로벌 설정

```typescript
// src/lib/gsap.ts
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  toggleActions: "play none none reverse",
  markers: false, // dev only: process.env.NODE_ENV === 'development'
});

ScrollTrigger.config({
  limitCallbacks: true, // mobile perf
});
```

**Lenis 연동:**
```typescript
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
```

---

## 3. 섹션별 애니메이션

### 3.1 Pokédex Loading Screen

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Scan line | `y: [-100%, 100%]` loop | 1.2s | linear |
| Progress bar | `width: 0% → 100%` | 2.5s | power2.out |
| Text messages | opacity stagger 0 → 1 | 0.4s each | power1.out |
| Typewriter "Scanning..." | char reveal | 50ms/char | — |
| No.0912 | scale 0.8→1 + opacity | 0.5s | back.out(1.7) |
| PRESS START btn | pulse scale 1→1.05 loop | 1.5s | sine.inOut |
| Exit | overlay opacity 1→0 | 0.6s | power2.in |

---

### 3.2 Hero Section

| Element | Animation | Trigger |
|---------|-----------|---------|
| Title "POKÉDEX ENTRY" | fade up y:40→0 | on mount |
| Trainer No | typewriter Press Start 2P | stagger +0.2s |
| Name HAN YOUNG WOOK | scale in 0.9→1 | +0.3s |
| Subtitle | fade up | +0.5s |
| PRESS START | bounce idle | infinite |
| Clouds | float x ±20px | infinite 8s |
| Stars/Sparkles | opacity twinkle | random 2~4s |
| Party preview strip | fade up on scroll near bottom | ScrollTrigger |
| Parallax decor | y shift on scroll | scrub 0.5 |

**Stagger:** `stagger: 0.15`, `delay: 0.3`

---

### 3.3 Trainer Profile

| Element | Animation | Trigger |
|---------|-----------|---------|
| Profile image | clip-path circle reveal | ScrollTrigger start |
| Stat rows | fade up stagger | +0.1s each |
| HP bar | width 0→value% | scrub |
| EXP bar | width 0→value% | scrub +0.2s |
| BADGES 8/8 counter | count up 0→8 | ScrollTrigger once |
| "ENTRY COMPLETE" stamp | scale 1.5→1 + rotate | back.out |

---

### 3.4 Memory Badges

| Element | Animation | Trigger |
|---------|-----------|---------|
| Section title | fade up | enter |
| Badge grid (8) | scale 0→1 stagger 0.08s | ScrollTrigger |
| Badge shine | pseudo sweep left→right | on unlock / enter |
| Tap feedback | scale 0.95→1 | Framer whileTap |
| Modal open | scale 0.8→1 + opacity | Framer AnimatePresence |
| Sparkle burst | 4 particles opacity+scale | badge-unlock moment |

**Badge Unlock Sequence (modal open):**
```
1. badge scale 1→1.2→1 (0.3s)
2. shine sweep (0.4s)
3. modal fade in (0.25s)
4. EXP +10 text float up (optional)
```

---

### 3.5 Party Pokémon

| Element | Animation | Trigger |
|---------|-----------|---------|
| Cards (6) | fade up y:30 stagger 0.1s | ScrollTrigger |
| HP bar per card | width scrub | per card |
| Card hover/tap | scale 0.97 | Framer whileTap |
| Modal | slide up from bottom | Framer spring |
| Type badges | fade in stagger | modal open +0.2s |

---

### 3.6 Adventure Log

| Element | Animation | Trigger |
|---------|-----------|---------|
| Timeline line | scaleY 0→1 | ScrollTrigger scrub |
| Year nodes | scale in + fade | stagger 0.15s |
| Connector dots | opacity pulse | sequential |

---

### 3.7 Photo Dex

| Element | Animation | Trigger |
|---------|-----------|---------|
| Section | fade in | enter |
| Swiper slides | built-in transition | fade 600ms |
| Pagination dots | scale active | Swiper |

---

### 3.8 Video Memory

| Element | Animation | Trigger |
|---------|-----------|---------|
| Container | scale 0.95→1 + opacity | ScrollTrigger 60% |
| Play indicator | fade out on play | video 'playing' event |

---

### 3.9 Next Level Up

| Element | Animation | Trigger |
|---------|-----------|---------|
| "NEXT LEVEL UP" | text reveal clip | ScrollTrigger |
| Lv.26 → Lv.27 | arrow bounce y | infinite 1s |
| Countdown digits | flip / fade on change | each tick |
| EXP bar | width pulse glow | scrub + loop shimmer |
| Level up flash | full-screen yellow flash opacity | once on enter |
| Confetti substitute | 6 emoji particles float | CSS only, no canvas |

**Level Up Flash:**
```typescript
gsap.fromTo('.level-flash',
  { opacity: 0.6 },
  { opacity: 0, duration: 0.8, ease: 'power2.out' }
);
// + playSfx('level-up')
```

---

### 3.10 Location & RSVP

| Element | Animation | Trigger |
|---------|-----------|---------|
| Map buttons | fade up stagger | enter |
| Join button | pulse scale | idle 2s loop |
| Button tap | scale 0.95 | Framer whileTap |

---

### 3.11 Ending

| Element | Animation | Trigger |
|---------|-----------|---------|
| Message | word-by-word fade | ScrollTrigger |
| Rank badge | rotate -5→0 + scale | back.out |

---

## 4. Framer Motion 패턴

### Modal (Badge / Pokémon)
```typescript
const modalVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25 } },
  exit: { opacity: 0, scale: 0.9, y: 10, transition: { duration: 0.2 } },
};
```

### Button Tap
```typescript
whileTap={{ scale: 0.95 }}
whileHover={{ scale: 1.02 }} // desktop only
```

---

## 5. Floating Background (CSS + GSAP)

| Element | Method |
|---------|--------|
| Clouds | GSAP x oscillation, `will-change: transform` |
| Poké Balls | slow rotate + float, 3~5 instances |
| Stars | CSS `@keyframes twinkle`, random delay |

**Performance:** max 8 floating elements, `pointer-events: none`

---

## 6. ScrollTrigger 모바일 최적화

```typescript
ScrollTrigger.create({
  trigger: element,
  start: "top 85%",      // mobile: earlier trigger
  end: "bottom 20%",
  invalidateOnRefresh: true,
});
```

- `orientationchange` → `ScrollTrigger.refresh()`
- Image load → `ScrollTrigger.refresh()`
- Lenis stop during modal open (optional)

---

## 7. prefers-reduced-motion

```typescript
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReduced) {
  gsap.globalTimeline.clear();
  // show final states immediately
}
```

---

## 8. 애니메이션 — 사운드 동기화

| Animation Event | SFX |
|-----------------|-----|
| Loading complete + START | `start.mp3` |
| Badge modal open | `badge-unlock.mp3` |
| Pokémon modal open | `pokedex-open.mp3` |
| Level up flash start | `level-up.mp3` |
| Any Button onClick | `click.mp3` (optional, low volume) |

→ AudioManager.playSfx() 호출은 animation `onComplete` 또는 `onStart`에서

---

## 9. 구현 우선순위

| Priority | Animation | Impact |
|----------|-----------|--------|
| P0 | Loading progress + gate | First impression |
| P0 | Hero stagger + float | Brand feel |
| P0 | Badge unlock + modal | Core interaction |
| P0 | Party card + dex modal | Core interaction |
| P1 | EXP/HP bar scrub | Game feel |
| P1 | Level up flash + countdown | Birthday hook |
| P2 | Adventure log timeline | Story |
| P2 | Parallax decor | Polish |
| P3 | Sparkle particles | Delight |

---

## 10. 테스트 체크리스트

- [ ] iPhone Safari 390px — 60fps scroll
- [ ] 카카오톡 인앱 브라우저
- [ ] Android Chrome
- [ ] orientation change — no layout break
- [ ] reduced-motion — graceful degrade
- [ ] modal open — scroll locked
- [ ] ScrollTrigger refresh after dynamic import
