# 애니메이션 설계서

> GSAP ScrollTrigger + Framer Motion + Lenis 통합 애니메이션 명세

---

## 1. 전역 설정

### Lenis + ScrollTrigger 연동
```typescript
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### Easing 표준
| 용도 | Easing |
|------|--------|
| 등장 | `power3.out` |
| 퇴장 | `power2.in` |
| Scrub | `none` (scroll-linked) |
| UI hover | `[0.25, 0.1, 0.25, 1]` (Framer) |

### Duration 표준
- Micro: 0.3–0.5s
- Section reveal: 0.8–1.2s
- Hero stagger: 1.5s total

---

## 2. 섹션별 애니메이션

### Hero Section

| 효과 | 구현 | Trigger |
|------|------|---------|
| 텍스트 Stagger Fade In | `gsap.from(titleRefs, { y: 60, opacity: 0, stagger: 0.15 })` | mount |
| 배경 Parallax | `gsap.to(video, { y: 100, scrollTrigger: { scrub: 1 } })` | scroll |
| Hero Fade Out | `gsap.to(hero, { opacity: 0.3, scale: 0.95, scrub: true })` | scroll exit |
| Scroll Indicator | CSS `@keyframes bounce` | infinite |

```javascript
ScrollTrigger.create({
  trigger: heroRef,
  start: 'top top',
  end: 'bottom top',
  scrub: 1,
  animation: gsap.to(heroContent, { y: -80, opacity: 0 }),
});
```

---

### Story Section

| 효과 | 구현 |
|------|------|
| Fade In | `opacity: 0 → 1` |
| Slide Up | `y: 80 → 0` |
| Image Zoom In | `scale: 1.15 → 1`, `clip-path: inset(100% 0 0 0) → inset(0)` |

```javascript
storyItems.forEach((item, i) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });
});
```

---

### Gallery Section

| 효과 | 구현 |
|------|------|
| Section Fade In | ScrollTrigger on section enter |
| Slide Transition | Swiper `effect: 'creative'` or `fade` |
| Image Hover Scale | Framer `whileHover={{ scale: 1.05 }}` |

---

### Video Section

| 효과 | 구현 |
|------|------|
| Container Fade In | `gsap.from(container, { opacity: 0, scale: 0.9 })` |
| Play on Enter | ScrollTrigger `onEnter: () => video.play()` |
| Pause on Leave | `onLeaveBack: () => video.pause()` |

---

### Timeline Section

| 효과 | 구현 |
|------|------|
| Left Slide In | odd items: `x: -100 → 0` |
| Right Slide In | even items: `x: 100 → 0` |
| Line Draw | `scaleY: 0 → 1` on vertical line |
| Pin (optional) | `pin: true, scrub: 1` for dramatic effect |

```javascript
gsap.from(entry, {
  scrollTrigger: { trigger: entry, start: 'top 80%' },
  x: index % 2 === 0 ? -80 : 80,
  opacity: 0,
  duration: 1,
});
```

---

### Countdown Section

| 효과 | 구현 |
|------|------|
| Numbers Fade In | ScrollTrigger once |
| Digit Update | Framer `AnimatePresence` key change |

---

### Location / RSVP

| 효과 | 구현 |
|------|------|
| Stagger Buttons | `gsap.from(buttons, { y: 30, opacity: 0, stagger: 0.1 })` |
| Button Hover | Framer `whileTap={{ scale: 0.97 }}` |

---

### Closing Section

| 효과 | 구현 |
|------|------|
| Text Reveal | `clip-path: inset(0 100% 0 0) → inset(0)` or letter stagger |
| Particles | Canvas dots floating upward, random opacity |
| Final Fade | `gsap.to(particles, { opacity: 0, delay: 2 })` |

```javascript
gsap.fromTo(text, 
  { clipPath: 'inset(0 100% 0 0)' },
  { clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: 'power4.inOut',
    scrollTrigger: { trigger: text, start: 'top 70%' }
  }
);
```

---

## 3. ScrollTrigger 패턴 카탈로그

| 패턴 | 사용 섹션 |
|------|-----------|
| **Fade In** | Story, Gallery, Countdown |
| **Fade Up** | Story, Timeline |
| **Scale / Zoom** | Story images, Gallery hover |
| **Parallax** | Hero video, background layers |
| **Text Reveal** | Hero, Closing |
| **Image Reveal** | Story clip-path |
| **Horizontal Scroll** | (optional) Gallery strip |
| **Pin Section** | Timeline (optional) |
| **Scrub Animation** | Hero exit parallax |

---

## 4. Framer Motion 사용 범위

| 컴포넌트 | Motion |
|----------|--------|
| Modal | `initial/animate/exit` fade + scale |
| Buttons | `whileHover`, `whileTap` |
| FloatingMusicButton | rotate on toggle |
| Countdown digits | `AnimatePresence` |

**원칙**: 스크롤 연동은 GSAP, UI 피드백은 Framer Motion

---

## 5. Cleanup 체크리스트

```typescript
useEffect(() => {
  const ctx = gsap.context(() => { /* animations */ }, containerRef);
  return () => ctx.revert(); // kills all ScrollTriggers in context
}, []);
```

- Lenis: `lenis.destroy()` on unmount
- Swiper: `swiper.destroy()` if manual init
- Audio: `audio.pause()`, remove listeners
- Canvas particles: cancelAnimationFrame

---

## 6. Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

JS:
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  gsap.globalTimeline.timeScale(100); // skip to end
}
```

---

## 7. 모바일 성능

- `transform` + `opacity` only (avoid layout thrashing)
- ScrollTrigger `invalidateOnRefresh: true`
- 이미지 lazy load before trigger fire
- Hero video: `playsInline`, `muted`, lower resolution on mobile
- Particle count: desktop 80, mobile 30
