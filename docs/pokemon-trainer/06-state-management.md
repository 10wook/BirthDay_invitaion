# 06 — State Management Plan

> React State · Context · Storage · Hydration 전략

---

## 1. 설계 원칙

| 원칙 | 설명 |
|------|------|
| **No global store** | Redux/Zustand 불필요 — 단일 페이지, config-driven |
| **Colocate state** | 섹션 로컬 state 우선 |
| **Context for cross-cutting** | Audio, Lenis만 Provider |
| **Config as source of truth** | trainer.ts, content.ts, pokemon.json |
| **Hydration safe** | countdown, audio, random → client-only |

---

## 2. State Map (전체)

| State | Scope | Storage | Owner |
|-------|-------|---------|-------|
| `loading` | Page | memory | `InvitationPage` |
| `selectedBadgeId` | Section | memory | `MemoryBadgesSection` |
| `selectedPokemonId` | Section | memory | `PartyPokemonSection` |
| `isPlaying` (BGM) | Global | memory | `AudioProvider` |
| `bgmVolume` | Global | localStorage | `AudioProvider` |
| `sfxEnabled` | Global | localStorage | `AudioProvider` |
| `hasAudioConsent` | Global | sessionStorage | `AudioProvider` |
| `showMusicModal` | Global | memory | `SmoothScrollProvider` |
| `countdown` | Section | memory (computed) | `useCountdown` |
| `pokedexLoaded` | Page | sessionStorage | `PokedexLoadingScreen` |

---

## 3. Provider 계층

```
RootLayout
└── SmoothScrollProvider
      ├── useLenis()                    // Lenis instance
      └── AudioProvider                 // [NEW]
            ├── AudioManager singleton
            ├── MusicConsentModal
            ├── FloatingMusicButton
            └── {children} InvitationPage
```

---

## 4. `InvitationPage` State

```typescript
const [loading, setLoading] = useState(true);

// PokedexLoadingScreen.onComplete → setLoading(false)
// sessionStorage 'pokedex_loaded' === '1' → skip loading (optional)
```

**Skip loading logic (optional v2):**
```typescript
useEffect(() => {
  if (sessionStorage.getItem('pokedex_loaded') === '1') {
    setLoading(false);
  }
}, []);
```

---

## 5. `AudioProvider` State

```typescript
interface AudioContextValue {
  // BGM
  isPlaying: boolean;
  isReady: boolean;
  bgmVolume: number;           // 0.0 ~ 1.0, default 0.35
  playBgm: () => Promise<void>;
  pauseBgm: () => void;
  toggleBgm: () => void;
  setBgmVolume: (v: number) => void;

  // SFX
  sfxEnabled: boolean;
  playSfx: (key: SfxKey) => void;

  // Consent
  hasConsented: boolean;
  setConsented: (v: boolean) => void;
}
```

**Persistence:**
```typescript
localStorage.setItem('bgm_volume', String(volume));
localStorage.setItem('sfx_enabled', String(enabled));
sessionStorage.setItem('audio_consent', 'accepted' | 'declined');
```

---

## 6. `AudioManager` Singleton

```typescript
class AudioManager {
  private bgm: HTMLAudioElement | null;
  private sfxPool: Map<SfxKey, HTMLAudioElement>;
  private unlocked: boolean = false;

  unlock() { this.unlocked = true; }  // first user gesture
  preload(urls: string[]): void;
  playBgm(src: string, volume: number): Promise<void>;
  pauseBgm(): void;
  playSfx(key: SfxKey): void;         // clone node for overlap
  setBgmVolume(v: number): void;
}
```

**Lifecycle:**
- `AudioProvider` mount → preload all sfx + bgm metadata
- First click anywhere → `unlock()`
- Unmount → pause all, remove listeners

---

## 7. Section Local State

### MemoryBadgesSection
```typescript
const [activeBadge, setActiveBadge] = useState<string | null>(null);
// activeBadge !== null → <BadgeDetailModal badge={...} />
```

### PartyPokemonSection
```typescript
const [activePokemon, setActivePokemon] = useState<string | null>(null);
// data from pokemon.json, find by id
```

### NextLevelUpSection
```typescript
const countdown = useCountdown(siteConfig.eventDate);
const [levelUpPlayed, setLevelUpPlayed] = useState(false);
// ScrollTrigger onEnter → play level-up sfx once
```

---

## 8. Config Data Flow (Read-Only)

```
trainer.ts ──────────► TrainerProfile, Hero, Loading, NextLevelUp
site.ts ─────────────► Location, JoinAdventure, Video, Audio paths
content.ts ──────────► Badges, AdventureLog, Gallery, Ending
pokemon.json ────────► PartyPokemon, Hero party preview
theme.ts ────────────► (reference only, CSS vars in globals.css)
```

**No runtime mutation of config.**  
Edit JSON/TS files → rebuild/redeploy.

---

## 9. Hydration Safety

| Component | Strategy |
|-----------|----------|
| `NextLevelUpSection` | `dynamic(..., { ssr: false })` |
| `PhotoDexSection` | `dynamic(..., { ssr: false })` |
| `useCountdown` | client-only, initial render placeholder `--` |
| `AudioProvider` | client-only, no audio on SSR |
| `PokedexLoadingScreen` | client-only overlay |

---

## 10. Modal State & Scroll Lock

```typescript
// when modal open:
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
    lenis?.stop();
  } else {
    document.body.style.overflow = '';
    lenis?.start();
  }
}, [isOpen]);
```

---

## 11. Event Bus (Optional — Lightweight)

SFX 트리거를 decouple하려면:

```typescript
// lib/events.ts
type AppEvent =
  | { type: 'SFX'; key: SfxKey }
  | { type: 'SCROLL_TO'; target: string };

export const appEvents = new EventTarget();
```

**v2 권장:** `useAudio().playSfx()` 직접 호출 (단순). Event bus는 필요 시만.

---

## 12. v1 → v2 Migration

| v1 | v2 |
|----|-----|
| `useBackgroundMusic` hook standalone | → `AudioProvider` + `useAudio` |
| `SmoothScrollProvider` owns music | → Audio logic to `AudioProvider` |
| No SFX state | → `sfxEnabled` + preload map |
| No modal state | → badge/pokemon local state |
| 6 badges in content | → 8 badges, extend content.ts |

---

## 13. Testing State Scenarios

- [ ] First visit: loading → hero → consent modal
- [ ] Return visit (session): skip loading optional
- [ ] Decline music: SFX still works on button tap
- [ ] Accept music: BGM loops at 35% volume
- [ ] Volume slider persists after refresh
- [ ] Modal open/close: scroll lock works
- [ ] Countdown: no hydration mismatch
