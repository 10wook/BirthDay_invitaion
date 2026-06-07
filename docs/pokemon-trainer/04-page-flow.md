# 04 — Page Flow Diagram

> 사용자 여정 · 스크롤 플로우 · 인터랙션 · 사운드 트리거

---

## 1. 전체 사용자 여정

```mermaid
flowchart TD
    START([카카오톡 링크 클릭]) --> LOAD[Pokédex Loading Screen]
    LOAD -->|PRESS START + start.mp3| HERO[Hero — Pokédex Entry]
    HERO -->|scroll / PRESS START| PROFILE[Trainer Profile]
    PROFILE --> BADGES[Memory Badges 8/8]
    BADGES -->|tap badge + badge-unlock.mp3| BADGE_MODAL[Badge Detail Modal]
    BADGE_MODAL -->|close| BADGES
    BADGES --> PARTY[Party Pokémon 6/6]
    PARTY -->|tap card + pokedex-open.mp3| POKE_MODAL[Pokédex Detail Modal]
    POKE_MODAL -->|close| PARTY
    PARTY --> LOG[Adventure Log]
    LOG --> PHOTOS[Photo Dex Swiper]
    PHOTOS --> VIDEO[Video Memory]
    VIDEO --> LEVEL[Next Level Up + level-up.mp3]
    LEVEL --> LOC[Location Maps]
    LOC --> RSVP[Join Adventure + confirm.mp3]
    RSVP --> END[Ending]
    END --> DONE([모험 완료])

    HERO -->|View Party + party-open.mp3| PARTY
    HERO -->|Music Consent| BGM[BGM adventure-theme.mp3]
```

---

## 2. 로딩 게이트 플로우

```mermaid
sequenceDiagram
    participant U as User
    participant L as PokedexLoadingScreen
    participant A as AudioManager
    participant M as Main Page

    U->>L: 페이지 진입
    L->>L: Scanning Trainer... (typewriter)
    L->>L: Progress 0→100% (GSAP)
    L->>L: Trainer Found / Entry Loaded
    L->>L: No.0912 표시
    U->>L: PRESS START 클릭
    L->>A: playSfx('start')
    L->>M: onComplete() → loading=false
    M->>U: Hero Section fade in
    Note over M: 800ms 후 Music Consent Modal
```

---

## 3. 오디오 동의 플로우

```mermaid
flowchart LR
    A[첫 사용자 인터랙션] --> B{Music Consent Modal}
    B -->|Music ON| C[playBgm adventure-theme]
    B -->|No thanks| D[BGM mute]
    C --> E[FloatingMusicButton 표시]
    D --> E
    E --> F[Play/Pause + Volume]
    F --> G[SFX는 별도 — 버튼마다 playSfx]
```

**정책:** BGM·SFX 모두 **사용자 gesture 이후**만 재생 (iOS Safari autoplay policy)

---

## 4. 섹션별 스크롤 플로우 (Mobile)

```
┌─────────────────────────┐
│  Pokédex Loading (gate) │  fixed overlay, 100vh
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│  Hero          100vh    │  #hero — floating decor
│  CURRENT PARTY preview  │
└───────────┬─────────────┘
            ▼ scroll
┌─────────────────────────┐
│  Trainer Profile        │  #profile — stat screen
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│  Memory Badges  2×4     │  #badges — tap → modal
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│  Party Pokémon  2×3     │  #party — tap → dex modal
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│  Adventure Log          │  #log — timeline
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│  Photo Dex   Swiper     │  #photos — 9:16
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│  Video Memory           │  #video — scroll play
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│  Next Level Up          │  #levelup — countdown
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│  Location               │  #location — map links
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│  Join Adventure         │  #rsvp — 3 buttons
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│  Ending                 │  #ending — closing
└─────────────────────────┘

[FloatingMusicButton] ─── fixed bottom-right (전 구간)
```

---

## 5. 인터랙션 맵

| 트리거 | 액션 | SFX | Scroll Target |
|--------|------|-----|---------------|
| Loading PRESS START | 게이트 해제 | `start.mp3` | `#hero` |
| Hero PRESS START | 프로필로 이동 | `start.mp3` | `#profile` |
| Hero View Party | 파티로 이동 | `party-open.mp3` | `#party` |
| Badge tap | Modal open | `badge-unlock.mp3` | — |
| Pokémon card tap | Dex modal open | `pokedex-open.mp3` | — |
| Generic button | — | `click.mp3` | — |
| Level Up in view | EXP animation | `level-up.mp3` (once) | — |
| Join Adventure | Google Form | `confirm.mp3` | external |
| Music ON | BGM start | — | — |
| Floating btn | toggle BGM | — | — |

---

## 6. Modal 스택

```mermaid
stateDiagram-v2
    [*] --> PageScroll
    PageScroll --> BadgeModal: badge click
    BadgeModal --> PageScroll: close / backdrop
    PageScroll --> PokemonModal: card click
    PokemonModal --> PageScroll: close / backdrop
    PageScroll --> MusicConsent: 800ms after load
    MusicConsent --> PageScroll: accept / decline
```

- Modal z-index: `z-50`
- Backdrop: semi-transparent cream + blur
- Close: X button + backdrop tap + Escape key

---

## 7. Hero → Party Shortcut

Hero 하단 **CURRENT PARTY** 프리뷰:

```
🌊 🎉 🔥 🌙 🧬 ⚡
View Party →
```

- Emoji는 `pokemon.json`에서 `emoji` 필드 추출
- Lenis `scrollTo('#party', { offset })` 사용
- ScrollTrigger refresh after navigation

---

## 8. Video Memory Scroll Behavior

```mermaid
stateDiagram-v2
    [*] --> Paused
    Paused --> Playing: ScrollTrigger onEnter (50% visible)
    Playing --> Paused: ScrollTrigger onLeave
    Playing --> Playing: loop muted
```

---

## 9. Countdown Tick Flow

```
useCountdown(eventDate) — client only (dynamic import, ssr:false)
  → setInterval 1000ms
  → days / hours / minutes / seconds
  → EXP bar width = f(time remaining)
  → eventDate 도달 시 "LEVEL UP!" flash
```

---

## 10. v1 → v2 플로우 변경점

| 항목 | v1 (현재 코드) | v2 (스펙) |
|------|----------------|-----------|
| Profile 다음 | Adventure Log | **Memory Badges** |
| Badges 다음 | Party | **Party** (동일) |
| Party 다음 | Photo Dex | **Adventure Log** |
| Badge 수 | 6 | **8** |
| Party modal | 없음 | **Pokédex Detail** |
| Hero party preview | 없음 | **CURRENT PARTY strip** |

---

## 11. 성공 UX 시나리오 (90초)

1. **0–5s:** Pokédex 스캔 → "Trainer Found" → PRESS START
2. **5–15s:** Hero — No.0912, 이름, floating decor
3. **15–30s:** Profile — HP/EXP/BADGES 8/8 확인
4. **30–45s:** Badge 탭 → 추억 스토리 1~2개 열람
5. **45–60s:** Party 카드 탭 → Lapras/Victini 상세
6. **60–75s:** Photo Dex 스와이프 + Video
7. **75–90s:** Countdown 확인 → Join Adventure

> 목표: **90초 안에 "트레이너 Pokédex 탐험" 감각** 전달
