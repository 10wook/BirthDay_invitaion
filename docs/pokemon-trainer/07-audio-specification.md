# 07 — Audio Specification

> BGM · SFX · AudioManager · 사용자 인터랙션 정책

---

## 1. 개요

| Layer | 역할 |
|-------|------|
| **AudioManager** | preload, play, stop, volume — 싱글톤 클래스 |
| **AudioProvider** | React Context, consent, persistence |
| **useAudio** | 컴포넌트에서 playSfx / playBgm 접근 |
| **FloatingMusicButton** | Play · Pause · Volume slider |

---

## 2. 파일 구조

```
public/
├── music/
│   └── adventure-theme.mp3      # BGM (~1–2MB, loopable)
└── sfx/
    ├── start.mp3                  # PRESS START
    ├── pokedex-open.mp3           # Pokémon card / dex open
    ├── party-open.mp3             # View Party / party screen
    ├── badge-unlock.mp3           # Badge tap / unlock
    ├── level-up.mp3               # Next Level Up section
    ├── confirm.mp3                # Join Adventure
    └── click.mp3                  # Generic button (optional)
```

**v1 마이그레이션:** `bgm.mp3` → rename `adventure-theme.mp3`  
**site.ts:** `musicSrc: "/music/adventure-theme.mp3"`

---

## 3. SFX Map

```typescript
// src/lib/audio/sfxMap.ts
export const SFX = {
  START: '/sfx/start.mp3',
  POKEDEX_OPEN: '/sfx/pokedex-open.mp3',
  PARTY_OPEN: '/sfx/party-open.mp3',
  BADGE_UNLOCK: '/sfx/badge-unlock.mp3',
  LEVEL_UP: '/sfx/level-up.mp3',
  CONFIRM: '/sfx/confirm.mp3',
  CLICK: '/sfx/click.mp3',
} as const;

export type SfxKey = keyof typeof SFX;
```

---

## 4. 트리거 매핑

| UI Event | SFX Key | Volume |
|----------|---------|--------|
| Loading — PRESS START | `START` | 0.6 |
| Hero — PRESS START | `START` | 0.6 |
| Hero — View Party → | `PARTY_OPEN` | 0.5 |
| Party — card tap | `POKEDEX_OPEN` | 0.5 |
| Badge — tile tap | `BADGE_UNLOCK` | 0.55 |
| Next Level Up — scroll enter | `LEVEL_UP` | 0.7 |
| Join Adventure — click | `CONFIRM` | 0.6 |
| Generic buttons | `CLICK` | 0.3 |

---

## 5. BGM Specification

| Property | Value |
|----------|-------|
| File | `adventure-theme.mp3` |
| Style | 8-bit RPG adventure / route music |
| Loop | `audio.loop = true` |
| Volume | **0.30 ~ 0.40** (default **0.35**) |
| Fade in | 800ms on play |
| Fade out | 400ms on pause |

```typescript
const DEFAULT_BGM_VOLUME = 0.35;
const SFX_VOLUME = 0.55;
```

---

## 6. AudioManager API

```typescript
// src/lib/audio/AudioManager.ts

class AudioManager {
  private static instance: AudioManager;
  private unlocked = false;
  private bgmAudio: HTMLAudioElement | null = null;
  private sfxCache = new Map<string, HTMLAudioElement>();

  static getInstance(): AudioManager;

  /** 첫 사용자 gesture 후 호출 */
  unlock(): void;

  /** 앱 시작 시 preload */
  preload(urls: string[]): Promise<void>;

  /** BGM */
  async playBgm(src: string, volume?: number): Promise<void>;
  pauseBgm(): void;
  setBgmVolume(volume: number): void;
  isBgmPlaying(): boolean;

  /** SFX — overlap 허용 (clone) */
  playSfx(src: string, volume?: number): void;

  /** 전체 mute (consent decline) */
  muteAll(): void;
}
```

**SFX overlap:** `audio.cloneNode()` → play → onended remove

---

## 7. 사용자 인터랙션 정책

### 7.1 Autoplay Rules

| Platform | BGM Autoplay | SFX Autoplay |
|----------|--------------|--------------|
| iOS Safari | ❌ blocked | ❌ blocked |
| Android Chrome | ❌ usually blocked | ❌ blocked |
| Desktop | ⚠️ inconsistent | ⚠️ inconsistent |

**→ 모든 오디오는 `unlock()` 이후에만 재생**

### 7.2 Consent Flow

```
Page Load
  → (no audio)
  → User taps PRESS START (loading) → unlock() + start.mp3 ✅
  → 800ms later: MusicConsentModal
      → Music ON → playBgm()
      → No thanks → BGM off, SFX still allowed
```

### 7.3 SFX without BGM consent

사용자가 BGM 거부해도 **SFX는 허용** (게임 UX 필수).  
단, 첫 `unlock()`은 loading START 클릭으로 충족.

---

## 8. FloatingMusicButton UI

```
┌──────────────────┐
│  🎵  ▶/⏸       │
│  ───●───── vol  │  range input 0~100%
└──────────────────┘
```

| Feature | Detail |
|---------|--------|
| Position | fixed bottom-right, z-40 |
| Show when | `hasConsented && isReady` |
| Play/Pause | toggle BGM |
| Volume | slider → `setBgmVolume` → localStorage |
| Min touch | 48×48px |

---

## 9. MusicConsentModal (v2 copy)

```
🎵
Adventure BGM?
Play background music for the full experience

[ Music ON ]   ← poke-red CTA
[ No thanks ]
```

---

## 10. Placeholder / Fallback Strategy

SFX 파일 없을 때:
- `AudioManager.playSfx` → silent fail (console.warn dev only)
- BGM 없을 때 → `isReady: false`, FloatingMusicButton hidden

**개발용 placeholder 생성:**
- 짧은 8-bit beep (100–300ms) royalty-free
- 또는 Web Audio API oscillator fallback (dev only)

---

## 11. Recommended SFX Sources (Royalty-Free)

| Source | Style |
|--------|-------|
| [freesound.org](https://freesound.org) | UI beeps, game confirm |
| [opengameart.org](https://opengameart.org) | RPG menu sounds |
| [Kenney.nl](https://kenney.nl/assets) | UI Audio pack |
| Self-generated | Bfxr / ChipTone — 8-bit SFX |

> ⚠️ 공식 Pokémon SFX 사용 금지 (저작권)

---

## 12. Performance

| Rule | Detail |
|------|--------|
| Preload | BGM + SFX on AudioProvider mount |
| SFX size | < 100KB each |
| BGM size | < 2MB, 128kbps mp3 |
| Concurrent SFX | max 4 simultaneous |
| Mobile | no Web Audio API synthesis in prod |

---

## 13. Environment Variables

```env
NEXT_PUBLIC_MUSIC_SRC=/music/adventure-theme.mp3
NEXT_PUBLIC_BGM_VOLUME=0.35
NEXT_PUBLIC_SFX_ENABLED=true
```

---

## 14. Integration Checklist

- [ ] `AudioManager.ts` 구현
- [ ] `AudioProvider.tsx` + `useAudio.ts`
- [ ] `sfxMap.ts` 경로 정의
- [ ] `public/sfx/` 7 files 추가
- [ ] `bgm.mp3` → `adventure-theme.mp3` rename
- [ ] `SmoothScrollProvider` → AudioProvider 위임
- [ ] `FloatingMusicButton` volume slider
- [ ] 각 섹션 SFX 트리거 연결
- [ ] iOS Safari 실기 테스트

---

## 15. Button.tsx SFX Integration

```typescript
<Button
  onClick={() => {
    playSfx('CLICK');
    onClick?.();
  }}
  sfx="START"  // optional override
/>
```

Centralized in Button component to avoid duplicate calls.
