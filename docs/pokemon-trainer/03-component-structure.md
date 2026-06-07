# 03 — Component Structure

> 섹션별 컴포넌트 · Props · 데이터 · 인터랙션 명세

---

## 1. 페이지 오케스트레이터

### `InvitationPage.tsx`

| State | Type | 설명 |
|-------|------|------|
| `loading` | `boolean` | Pokédex Loading 게이트 |

| Props | — |
|-------|---|
| Children | 없음 (self-contained) |

**v2 변경:** 섹션 순서 재배치 (§2 참조)

---

## 2. 섹션 순서 (v2 Canonical)

| # | Section ID | Component | 스크롤 순서 |
|---|------------|-----------|-------------|
| 0 | — | `PokedexLoadingScreen` | Gate (overlay) |
| 1 | `#hero` | `HeroSection` | 100vh |
| 2 | `#profile` | `TrainerProfileSection` | |
| 3 | `#badges` | `MemoryBadgesSection` | ⬆ v2: Profile 직후 |
| 4 | `#party` | `PartyPokemonSection` | |
| 5 | `#log` | `AdventureLogSection` | ⬆ v2: Party 직후 |
| 6 | `#photos` | `PhotoDexSection` | |
| 7 | `#video` | `VideoMemorySection` | |
| 8 | `#levelup` | `NextLevelUpSection` | |
| 9 | `#location` | `LocationSection` | |
| 10 | `#rsvp` | `JoinAdventureSection` | |
| 11 | `#ending` | `EndingSection` | |

---

## 3. 섹션별 상세

### 3.1 `PokedexLoadingScreen`

**표시 텍스트 (순차):**
```
Scanning Trainer...
██████████ 100%
Trainer Found
Pokédex Entry Loaded
No.0912
[PRESS START]
```

| Props | Type |
|-------|------|
| `onComplete` | `() => void` |

| Data | `trainerConfig.trainerNo` |
| Animation | Progress bar, typewriter, scan line, fade in |
| SFX | `start.mp3` on PRESS START |
| Storage | `sessionStorage.pokedex_loaded` (optional skip) |

---

### 3.2 `HeroSection`

**표시:**
```
POKÉDEX ENTRY
No.0912
HAN YOUNG WOOK
Birthday Adventure
September 12
[PRESS START]
── bottom ──
CURRENT PARTY
🌊 🎉 🔥 🌙 🧬 ⚡
View Party →
```

| Data | `trainerConfig`, `pokemon.json` (emoji preview) |
| Decor | `FloatingClouds`, `SparkleField`, `PokeballDecorations` |
| Interaction | PRESS START → scroll to `#profile` + `start.mp3` |
| Interaction | View Party → scroll to `#party` + `party-open.mp3` |

---

### 3.3 `TrainerProfileSection`

**표시 필드:**
```
Name / Trainer No / Region / Class / Type / Level / Birthday / Trainer Rank
HP ██████████
EXP █████████░
BADGES 8/8
PARTY 6/6
POKÉDEX ENTRY COMPLETE
```

| Data | `trainerConfig` |
| UI | `DexCard`, `StatBar`, `SectionTitle` |
| Font | Labels → Press Start 2P, Values → Pretendard |
| Image | `/images/hero/profile.jpg` |

---

### 3.4 `MemoryBadgesSection`

**레이아웃:** 2 rows × 4 columns = **8 badges**

| # | Badge | Emoji |
|---|-------|-------|
| 1 | Soongsil Badge | 🎓 |
| 2 | AI Badge | 🤖 |
| 3 | Developer Badge | 💻 |
| 4 | Football Badge | ⚽ |
| 5 | Memory Badge | 📷 |
| 6 | Cafe Badge | ☕ |
| 7 | Adventure Badge | 🎮 |
| 8 | Birthday Badge | 🎂 |

| Props (BadgeTile) | Type |
|-------------------|------|
| `badge` | `MemoryBadge` |
| `onClick` | `(id: string) => void` |
| `unlocked` | `boolean` (default true) |

| Modal | `BadgeDetailModal` — description, photo, story, memory |
| SFX | `badge-unlock.mp3` on open |
| Animation | unlock shine, sparkles, scale bounce |

**Data:** `content.ts → memoryBadges[]` (8 items로 확장)

---

### 3.5 `PartyPokemonSection` ⭐ 핵심

**레이아웃:** Mobile 2-column grid, 6 cards

| Pokémon | Emoji | Types |
|---------|-------|-------|
| Lapras | 🌊 | Water / Ice |
| Victini | 🎉 | Psychic / Fire |
| Quilava | 🔥 | Fire |
| Umbreon | 🌙 | Dark |
| Ditto | 🧬 | Normal |
| Zapdos | ⚡ | Electric / Flying |

**카드 표시:** Image · Name · Level · Type · HP Bar

| Props (PokemonCard) | Type |
|---------------------|------|
| `pokemon` | `PokemonEntry` |
| `onClick` | `(id: string) => void` |

| Modal | `PokemonDetailModal` |
| Modal 내용 | Description · Why chosen · Story · Photo · Type info |
| SFX | `pokedex-open.mp3` on card tap |
| Data | **`src/data/pokemon.json`** (single source) |

---

### 3.6 `AdventureLogSection`

**스타일:** Pokémon journey log / field journal

| Year | Title |
|------|-------|
| 2019 | University Journey Started |
| 2023 | AI Projects |
| 2024 | SRNet Research |
| 2025 | RAG Development |
| 2026 | Birthday Adventure |

| Data | `content.ts → adventureLog[]` |
| Animation | ScrollTrigger stagger fade-up |

---

### 3.7 `PhotoDexSection`

| Feature | Swiper loop, autoplay, pagination, swipe |
| Ratio | 9:16 primary, 4:5 secondary |
| Data | `content.ts → galleryImages[]` |

---

### 3.8 `VideoMemorySection`

| Feature | autoplay, loop, muted, scroll reveal |
| Data | `siteConfig.memoryVideoSrc` |
| Fallback | placeholder DexCard when video missing |

---

### 3.9 `NextLevelUpSection`

```
NEXT LEVEL UP
Lv.26 ↓ Lv.27
Days / Hours / Minutes / Seconds
[EXP BAR animation]
```

| Data | `trainerConfig`, `useCountdown(siteConfig.eventDate)` |
| Animation | EXP bar fill, level-up flash |
| SFX | `level-up.mp3` on scroll into view (once) |

---

### 3.10 `LocationSection`

| Display | Address, venue name |
| Buttons | Kakao Map · Naver Map · Google Maps |
| Data | `siteConfig` |

---

### 3.11 `JoinAdventureSection`

| Buttons | Join Adventure · Maybe · Cannot Join |
| Style | Poké Ball inspired |
| Data | `siteConfig.rsvpAttendUrl` etc. |
| SFX | `confirm.mp3` on Join |

---

### 3.12 `EndingSection`

| Display | Closing message, trainer rank badge |
| Data | `content.ts → closingMessage` |

---

## 4. 공통 UI 컴포넌트

| Component | Props | 용도 |
|-----------|-------|------|
| `DexCard` | `children`, `className?`, `variant?` | 게임 패널 |
| `StatBar` | `label`, `value`, `max`, `color?` | HP/EXP |
| `SectionTitle` | `label`, `title`, `subtitle?` | 섹션 헤더 |
| `Button` | `variant`, `onClick`, `sfx?` | CTA + click SFX |
| `BadgeTile` | `badge`, `onClick` | 8-badge grid cell |
| `PokemonCard` | `pokemon`, `onClick` | Party 2-col card |
| `DexModalShell` | `isOpen`, `onClose`, `title` | 모달 프레임 |
| `FloatingMusicButton` | `isPlaying`, `volume`, `onToggle`, `onVolumeChange` | BGM UI |

---

## 5. Layout / Provider 컴포넌트

| Component | 책임 |
|-----------|------|
| `SmoothScrollProvider` | Lenis init, AudioProvider wrap |
| `AudioProvider` | AudioManager lifecycle, consent gate |
| `MusicConsentModal` | "Adventure BGM?" first interaction |
| `FloatingMusicButton` | Fixed bottom-right, play/pause/volume |
| `SectionWrapper` | `id`, `className`, scroll margin |
| `PokeballDecorations` | Fixed z-0 background shapes |

---

## 6. Hooks

| Hook | Returns | 용도 |
|------|---------|------|
| `useLenis` | Lenis ref | Smooth scroll |
| `useCountdown` | `{ days, hours, minutes, seconds }` | Level up |
| `useBackgroundMusic` | play/pause/toggle | → `useAudio`로 통합 |
| `useAudio` | playSfx, playBgm, volume | AudioManager |
| `useGsapScrollTrigger` | register helper | 섹션 애니메이션 |

---

## 7. Dynamic Import 전략

```typescript
// SSR 불필요 + hydration 이슈 방지
const PhotoDexSection = dynamic(..., { ssr: false });
const NextLevelUpSection = dynamic(..., { ssr: false });
```

---

## 8. 컴포넌트 의존성 다이어그램

```
InvitationPage
  ├── PokeballDecorations
  ├── PokedexLoadingScreen
  └── [sections]
        ├── HeroSection
        │     └── FloatingClouds, SparkleField
        ├── TrainerProfileSection
        │     └── DexCard, StatBar
        ├── MemoryBadgesSection
        │     ├── BadgeTile × 8
        │     └── BadgeDetailModal
        ├── PartyPokemonSection
        │     ├── PokemonCard × 6  ← pokemon.json
        │     └── PokemonDetailModal
        ├── AdventureLogSection
        ├── PhotoDexSection (Swiper)
        ├── VideoMemorySection
        ├── NextLevelUpSection ← useCountdown
        ├── LocationSection
        ├── JoinAdventureSection
        └── EndingSection

Providers (layout.tsx / SmoothScrollProvider)
  ├── AudioProvider
  ├── MusicConsentModal
  └── FloatingMusicButton
```
