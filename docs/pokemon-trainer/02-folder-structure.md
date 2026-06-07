# 02 — Folder Structure

> 프로젝트 폴더 구조 · 에셋 관리 · 교체 가능성 설계

---

## 1. 루트 디렉토리

```
BirthDay_invitaion/
├── docs/
│   └── pokemon-trainer/          # v2 설계 문서 (01~08)
├── public/                       # 정적 에셋 (URL 그대로 교체 가능)
│   ├── images/
│   │   ├── hero/                 # Hero 배경, 프로필
│   │   ├── pokemon/              # 파티 Pokémon 일러스트/사진 (6종)
│   │   ├── badges/               # 배지 상세 모달용 사진 (8종)
│   │   ├── gallery/              # Photo Dex 슬라이드
│   │   └── timeline/             # Adventure Log 연도별 (선택)
│   ├── videos/
│   │   ├── hero-bg.mp4           # Hero 배경 (muted loop, optional)
│   │   └── memory.mp4            # Video Memory 섹션
│   ├── music/
│   │   └── adventure-theme.mp3   # BGM (기존 bgm.mp3 → rename)
│   ├── sfx/
│   │   ├── start.mp3
│   │   ├── pokedex-open.mp3
│   │   ├── party-open.mp3
│   │   ├── badge-unlock.mp3
│   │   ├── level-up.mp3
│   │   ├── confirm.mp3
│   │   └── click.mp3
│   └── icons/                    # 커스텀 SVG (optional)
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── InvitationPage.tsx
│   │   ├── audio/                # [NEW] AudioManager UI
│   │   ├── decorations/
│   │   ├── layout/
│   │   ├── modals/               # [NEW] Badge/Pokemon detail
│   │   ├── sections/
│   │   └── ui/
│   ├── config/
│   │   ├── trainer.ts
│   │   ├── site.ts
│   │   ├── content.ts
│   │   └── theme.ts
│   ├── data/
│   │   └── pokemon.json          # [NEW] 파티 6종 데이터
│   ├── hooks/
│   ├── lib/
│   │   ├── gsap.ts
│   │   └── audio/                # [NEW] AudioManager core
│   └── types/
│       ├── index.ts
│       └── pokemon.ts            # [NEW] pokemon.json 타입
├── .env.example
├── vercel.json
└── package.json
```

---

## 2. `src/components/` 상세

```
components/
├── InvitationPage.tsx              # 페이지 오케스트레이터
│
├── audio/
│   ├── AudioProvider.tsx           # Context + AudioManager 연결
│   └── useAudio.ts                 # playSfx, playBgm, setVolume hooks
│
├── decorations/
│   ├── PokeballDecorations.tsx     # 배경 Poké Ball 도형
│   ├── FloatingClouds.tsx          # [NEW] Hero floating clouds
│   └── SparkleField.tsx            # [NEW] 별/스파클 (CSS/GSAP)
│
├── layout/
│   ├── SmoothScrollProvider.tsx    # Lenis + Audio consent
│   ├── MusicConsentModal.tsx
│   ├── FloatingMusicButton.tsx     # Play/Pause + Volume slider
│   └── SectionWrapper.tsx          # 섹션 공통 padding/id
│
├── modals/
│   ├── BadgeDetailModal.tsx        # [NEW] 배지 클릭 → story/photo
│   ├── PokemonDetailModal.tsx      # [NEW] Pokédex entry detail
│   └── DexModalShell.tsx           # [NEW] 공통 게임 UI 모달 프레임
│
├── sections/
│   ├── PokedexLoadingScreen.tsx
│   ├── HeroSection.tsx
│   ├── TrainerProfileSection.tsx
│   ├── MemoryBadgesSection.tsx
│   ├── PartyPokemonSection.tsx
│   ├── AdventureLogSection.tsx
│   ├── PhotoDexSection.tsx
│   ├── VideoMemorySection.tsx
│   ├── NextLevelUpSection.tsx
│   ├── LocationSection.tsx
│   ├── JoinAdventureSection.tsx
│   └── EndingSection.tsx
│
└── ui/
    ├── DexCard.tsx                 # 게임 패널 카드
    ├── StatBar.tsx                 # HP / EXP bar
    ├── SectionTitle.tsx            # Fredoka + Press Start 라벨
    ├── Button.tsx                  # Poké Ball inspired CTA
    ├── BadgeTile.tsx               # [NEW] 배지 1칸 (2×4 grid)
    ├── PokemonCard.tsx             # [NEW] Party 2-col card
    ├── ScrollIndicator.tsx
    └── Modal.tsx
```

---

## 3. `src/lib/audio/` 상세

```
lib/audio/
├── AudioManager.ts                 # 싱글톤: preload, play, stop, volume
├── sfxMap.ts                       # 이벤트 → 파일 경로 매핑
└── constants.ts                    # DEFAULT_BGM_VOLUME = 0.35
```

---

## 4. `src/data/pokemon.json` 스키마 (미리보기)

```json
{
  "party": [
    {
      "id": "lapras",
      "emoji": "🌊",
      "name": "Lapras",
      "level": 30,
      "types": ["Water", "Ice"],
      "keywords": ["Journey", "Adventure", "Companion"],
      "hp": 95,
      "image": "/images/pokemon/lapras.jpg",
      "description": "...",
      "whyChosen": "...",
      "story": "..."
    }
  ]
}
```

→ 전체 6종: Lapras, Victini, Quilava, Umbreon, Ditto, Zapdos  
→ TypeScript 타입: `src/types/pokemon.ts`

---

## 5. `public/` 에셋 교체 가이드

| 경로 | 용도 | 권장 스펙 |
|------|------|-----------|
| `images/hero/profile.jpg` | Trainer Profile | 1:1, 800×800 |
| `images/pokemon/*.jpg` | Party 카드 | 1:1, 512×512 |
| `images/badges/*.jpg` | Badge Modal | 4:3 or 1:1 |
| `images/gallery/*.jpg` | Photo Dex | **9:16** or **4:5** |
| `videos/memory.mp4` | Video Memory | 9:16, H.264, <15MB |
| `music/adventure-theme.mp3` | BGM | loop, 128kbps, <2MB |
| `sfx/*.mp3` | 효과음 | <100KB each |

**교체 방법:** 동일 파일명으로 덮어쓰기 → 재배포 없이 Vercel CDN 캐시 갱신 (vercel.json cache header 참고)

---

## 6. 환경 변수 (`.env.example`)

```env
NEXT_PUBLIC_HOST_NAME=한영욱
NEXT_PUBLIC_EVENT_DATE=2026-09-12T18:00:00+09:00
NEXT_PUBLIC_MUSIC_SRC=/music/adventure-theme.mp3
NEXT_PUBLIC_MEMORY_VIDEO_SRC=/videos/memory.mp4
NEXT_PUBLIC_RSVP_ATTEND_URL=https://forms.google.com/...
```

---

## 7. 삭제·Deprecated (v2)

| 항목 | 처리 |
|------|------|
| `public/music/bgm.mp3` | → `adventure-theme.mp3` rename |
| Bagel Fat One font | → Fredoka + Press Start 2P |
| `content.ts` partySlots | → `pokemon.json` 이관 |
| 구 luxury 테마 `docs/01~05` | 유지 (히스토리), pokemon-trainer가 canonical |

---

## 8. Import 경로 규칙

```typescript
// Config
import { trainerConfig } from "@/config/trainer";
import { siteConfig } from "@/config/site";
import { contentConfig } from "@/config/content";
import pokemonData from "@/data/pokemon.json";

// Audio
import { useAudio } from "@/components/audio/useAudio";
import { SFX } from "@/lib/audio/sfxMap";

// Types
import type { PokemonEntry } from "@/types/pokemon";
```
