# 08 — Development Checklist

> v2 스펙 기준 단계별 구현 체크리스트  
> **선행 조건:** 01~07 설계 문서 검토 완료 후 구현 시작

---

## Phase 0 — 설계 ✅

- [x] 01 Project Architecture
- [x] 02 Folder Structure
- [x] 03 Component Structure
- [x] 04 Page Flow Diagram
- [x] 05 Animation Specification
- [x] 06 State Management Plan
- [x] 07 Audio Specification
- [x] 08 Development Checklist (this doc)

---

## Phase 1 — Foundation (Theme & Data)

### 1.1 Typography
- [ ] `Fredoka` — Google Fonts, `--font-fredoka`, `font-display`
- [ ] `Press Start 2P` — Google Fonts, `--font-press-start`, `font-system`
- [ ] `Pretendard` — CDN, `font-body`
- [ ] Remove `Bagel Fat One`
- [ ] `layout.tsx` font variables 업데이트
- [ ] `globals.css` / `theme.ts` 동기화

### 1.2 Color System
- [x] Primary Yellow `#FFE37A`
- [x] Poke Red `#FF6B6B`
- [x] Sky Blue `#8ED8FF`
- [x] Grass Green `#B8E986`
- [x] Cream `#FFF8E8`
- [x] Text `#4B4B4B`
- [ ] CSS 변수 ↔ Tailwind `@theme` 최종 검증

### 1.3 Data Layer
- [ ] `src/data/pokemon.json` — 6 Pokémon full data
- [ ] `src/types/pokemon.ts` — TypeScript interfaces
- [ ] `content.ts` — memoryBadges **8개** 확장
- [ ] `trainer.ts` — HP/EXP/BADGES 8/8, PARTY 6/6
- [ ] `site.ts` — `musicSrc` → `adventure-theme.mp3`

---

## Phase 2 — Audio System

- [ ] `src/lib/audio/AudioManager.ts`
- [ ] `src/lib/audio/sfxMap.ts`
- [ ] `src/components/audio/AudioProvider.tsx`
- [ ] `src/components/audio/useAudio.ts`
- [ ] `public/music/adventure-theme.mp3`
- [ ] `public/sfx/` — 7 files
- [ ] `FloatingMusicButton` — volume slider
- [ ] `MusicConsentModal` — AudioProvider 연동
- [ ] `useBackgroundMusic` → deprecated / merge into useAudio
- [ ] iOS Safari audio unlock 테스트

---

## Phase 3 — Core UI Components

- [ ] `BadgeTile.tsx` — 2×4 grid cell
- [ ] `PokemonCard.tsx` — 2-col party card + HP bar
- [ ] `DexModalShell.tsx` — shared modal frame
- [ ] `BadgeDetailModal.tsx` — photo, story, memory
- [ ] `PokemonDetailModal.tsx` — dex entry detail
- [ ] `FloatingClouds.tsx` — hero decor
- [ ] `SparkleField.tsx` — stars/sparkles
- [ ] `Button.tsx` — SFX integration

---

## Phase 4 — Sections (v2 Spec)

### 4.1 Loading & Hero
- [x] `PokedexLoadingScreen` — base exists
- [ ] Typewriter + scan animation polish
- [ ] PRESS START → `start.mp3`
- [x] `HeroSection` — base exists
- [ ] CURRENT PARTY preview strip (emoji from pokemon.json)
- [ ] View Party → scroll `#party` + sfx
- [ ] Floating clouds / stars decor

### 4.2 Profile & Badges
- [x] `TrainerProfileSection` — base exists
- [ ] Press Start 2P labels
- [ ] BADGES 8/8, PARTY 6/6 display
- [x] `MemoryBadgesSection` — base exists
- [ ] **8 badges** 2×4 grid
- [ ] Badge tap → `BadgeDetailModal`
- [ ] badge-unlock animation + sfx

### 4.3 Party & Log
- [x] `PartyPokemonSection` — base exists
- [ ] **pokemon.json** data binding
- [ ] 2-column mobile grid, 6 cards
- [ ] Card tap → `PokemonDetailModal`
- [ ] pokedex-open sfx
- [x] `AdventureLogSection` — base exists
- [ ] v2 timeline content (2019~2026)
- [ ] **Reorder:** Party → Log (after badges)

### 4.4 Media Sections
- [x] `PhotoDexSection` — Swiper
- [ ] 9:16 / 4:5 ratio enforcement
- [x] `VideoMemorySection`
- [ ] `memory.mp4` asset or fallback UI
- [x] `NextLevelUpSection`
- [ ] level-up sfx + flash animation
- [x] `LocationSection`
- [ ] Real map URLs
- [x] `JoinAdventureSection`
- [ ] confirm sfx + Google Form URL
- [x] `EndingSection`

---

## Phase 5 — Page Orchestration

- [ ] `InvitationPage` — **section reorder:**
  ```
  Hero → Profile → Badges → Party → Log → Photos → Video → LevelUp → Location → RSVP → Ending
  ```
- [ ] `AudioProvider` wrap in layout/SmoothScrollProvider
- [ ] sessionStorage loading skip (optional)

---

## Phase 6 — Animation Polish

- [ ] Loading progress GSAP
- [ ] Hero stagger + float
- [ ] Badge unlock shine
- [ ] HP/EXP bar ScrollTrigger scrub
- [ ] Party card stagger
- [ ] Level up flash
- [ ] `prefers-reduced-motion` fallback
- [ ] ScrollTrigger refresh on orientation change

---

## Phase 7 — Assets & Content

| Asset | Status | Action |
|-------|--------|--------|
| `images/hero/profile.jpg` | ✅ exists | Replace with real photo |
| `images/pokemon/*.jpg` | ❌ missing | 6 Pokémon images |
| `images/badges/*.jpg` | ❌ missing | 8 badge photos |
| `images/gallery/*.jpg` | ⚠️ partial | 9:16 photos |
| `videos/memory.mp4` | ❌ missing | Add or fallback |
| `music/adventure-theme.mp3` | ⚠️ bgm.mp3 | Rename/replace |
| `sfx/*.mp3` | ❌ missing | Add 7 sfx files |

---

## Phase 8 — Mobile QA

- [ ] iPhone 15 Pro (390px) — primary
- [ ] iPhone SE (375px)
- [ ] Android Chrome (412px)
- [ ] KakaoTalk in-app browser
- [ ] Touch targets ≥ 44px
- [ ] 60fps scroll (no jank)
- [ ] Modal scroll lock
- [ ] Audio after first tap
- [ ] `100dvh` hero height

---

## Phase 9 — Build & Deploy

- [ ] `npm run build` success
- [ ] `npm run lint` pass
- [ ] `.env.example` updated
- [ ] `vercel.json` cache headers for /music, /sfx
- [ ] README → `docs/pokemon-trainer/` 링크
- [ ] Commit on `feat/pokemon-trainer-invitation`
- [ ] PR → main

---

## Progress Summary (2026-06-08)

| Area | Done | Total | % |
|------|------|-------|---|
| Design Docs | 8 | 8 | 100% |
| Sections (base) | 12 | 12 | 100% |
| v2 Features | ~25% | — | — |
| Audio System | 0% | — | 0% |
| pokemon.json | 0% | — | 0% |
| Fonts v2 | 0% | — | 0% |
| Assets | ~30% | — | — |

**다음 구현 우선순위:**
1. Fonts (Fredoka + Press Start 2P)
2. pokemon.json + Party modal
3. AudioManager + SFX
4. Section reorder + 8 badges
5. Animation polish

---

## Definition of Done (Final)

- [ ] 스마트폰에서 Pokédex 탐험 UX 90초 이내 전달
- [ ] 8 badges + 6 party Pokémon interactive
- [ ] BGM + SFX after user interaction
- [ ] pokemon.json으로 party 데이터 편집 가능
- [ ] `npm run build` pass
- [ ] 카카오톡 링크 → iPhone Safari 정상 동작
