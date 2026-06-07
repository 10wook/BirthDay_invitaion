# 01 — Project Architecture

> Pokémon Trainer Birthday Adventure — 전체 아키텍처 설계서  
> **상태:** v2 스펙 기준 (Fredoka · Press Start 2P · AudioManager · pokemon.json)

---

## 1. 프로젝트 정의

### 1.1 한 줄 요약

**Trainer Han Young Wook (No.0912)의 Pokédex 엔트리를 탐험하며, Lv.27 레벨업 생일 모험에 참여하는 모바일 퍼스트 인터랙티브 웹 경험.**

### 1.2 이것이 아닌 것

| ❌ 아님 | ✅ 맞음 |
|--------|--------|
| 일반 생일 초대장 | RPG 트레이너 프로필 탐험 |
| SaaS / 기업 랜딩 | 게임 UI 기반 모험 로그 |
| Apple Keynote 스타일 | Pokédex · 트레이너 카드 · 배지 컬렉션 |
| K-pop 생카 / Sanrio | 포켓몬 **영감** 오리지널 디자인 |

> ⚠️ 공식 Pokémon UI 에셋·로고·캐릭터 이미지를 **직접 복제하지 않음**.  
> 게임 디자인 **언어**만 차용한 오리지널 UI.

---

## 2. 메인 캐릭터 (Trainer Data)

| 필드 | 값 |
|------|-----|
| Trainer Name | HAN YOUNG WOOK |
| Trainer Number | 0912 |
| Birthday | September 12 |
| Current Level | 26 |
| Next Level | 27 |
| Region | Seoul |
| Class | Developer |
| Type | AI Trainer |
| Trainer Rank | MASTER TRAINER |

**데이터 소스:** `src/config/trainer.ts` (단일 진실 공급원)

---

## 3. 코어 스토리

> *"Trainer Han Young Wook is preparing for his next evolution."*

방문자는 생일 초대를 받는 것이 아니라, **트레이너의 다음 레벨업을 준비하는 모험**에 합류한다.

### 내러티브 아크

```
발견 (Pokédex Scan)
  → 정체 확인 (Trainer Profile)
  → 성장의 증거 (Memory Badges)
  → 동료 소개 (Party)
  → 여정 기록 (Adventure Log)
  → 추억 수집 (Photo Dex · Video)
  → 레벨업 임박 (Countdown)
  → 모험 참여 (RSVP)
```

---

## 4. 기술 스택

| 영역 | 기술 | 역할 |
|------|------|------|
| Framework | Next.js (App Router) + TypeScript | SSR/SSG, 라우팅 |
| Styling | TailwindCSS v4 | 유틸리티 + CSS 변수 |
| Animation | GSAP + ScrollTrigger | 스크롤 기반 연출 |
| Micro-interaction | Framer Motion | 탭·모달·버튼 |
| Smooth Scroll | Lenis | 모바일 관성 스크롤 |
| Gallery | Swiper | Photo Dex 슬라이드 |
| Icons | Lucide React | UI 아이콘 |
| Audio | Custom AudioManager | BGM + SFX 통합 |

---

## 5. 모바일 퍼스트 원칙

### 5.1 타겟 디바이스

| 우선순위 | 환경 | 비율 |
|----------|------|------|
| 1 | iPhone Safari (카카오톡 인앱) | ~60% |
| 2 | Android Chrome | ~35% |
| 3 | Desktop | ~5% |

### 5.2 레이아웃 규칙

- **Primary width:** 390px ~ 430px
- **Container:** `max-w-[430px] mx-auto`
- **개발 순서:** Mobile → Tablet → Desktop (Desktop은 `md:` 확장만)
- **터치 타겟:** 최소 44×48px
- **성능 목표:** 60fps — `transform` + `opacity` only

### 5.3 카카오톡 인앱 브라우저 대응

- Autoplay audio 금지 → 사용자 인터랙션 후 재생
- `100vh` → `100dvh` fallback
- Lenis: iOS에서 `touchMultiplier` 조정
- Video: `playsInline muted loop`

---

## 6. 디자인 시스템 요약

### 6.1 Color Tokens

| Token | Hex | 용도 |
|-------|-----|------|
| `primary-yellow` | `#FFE37A` | 헤더, 강조, 버튼 |
| `poke-red` | `#FF6B6B` | CTA, Poké Ball 영감 |
| `sky-blue` | `#8ED8FF` | 배경, 카드 |
| `grass-green` | `#B8E986` | 성공, HP |
| `cream` | `#FFF8E8` | 메인 배경 |
| `text` | `#4B4B4B` | 본문 |
| `text-light` | `#7A7A7A` | 보조 텍스트 |
| `dex-border` | `#4B4B4B` | 게임 패널 테두리 |

### 6.2 Typography

| Font | 비율 | 용도 |
|------|------|------|
| **Fredoka** | 25% | Hero Title, Trainer Name, Section Titles |
| **Pretendard** | 70% | 설명, 타임라인, 상세 텍스트 |
| **Press Start 2P** | 5% | No.0912, Lv.26, HP, EXP, PARTY, BADGES |

### 6.3 Mood Keywords

Fun · Friendly · Adventurous · Warm · Nostalgic · Game-like · Memorable

---

## 7. 페이지 아키텍처 (High Level)

```
app/
  layout.tsx          ← fonts, metadata, SmoothScrollProvider
  page.tsx            ← InvitationPage

InvitationPage (Client Orchestrator)
  ├── PokeballDecorations (fixed background)
  ├── PokedexLoadingScreen (gate)
  └── Main Scroll Sections (12 + Ending)
        ├── HeroSection
        ├── TrainerProfileSection
        ├── MemoryBadgesSection      ← v2: Profile 직후
        ├── PartyPokemonSection      ← v2: Badges 직후
        ├── AdventureLogSection      ← v2: Party 직후
        ├── PhotoDexSection
        ├── VideoMemorySection
        ├── NextLevelUpSection
        ├── LocationSection
        ├── JoinAdventureSection
        └── EndingSection

Global Providers
  ├── SmoothScrollProvider (Lenis)
  ├── AudioProvider (AudioManager)
  └── MusicConsentModal + FloatingMusicButton
```

---

## 8. 데이터 레이어

| 파일 | 책임 |
|------|------|
| `src/config/trainer.ts` | 트레이너 프로필·스탯 |
| `src/config/site.ts` | 이벤트·장소·RSVP·미디어 URL |
| `src/config/content.ts` | 배지·갤러리·타임라인·클로징 |
| `src/data/pokemon.json` | 6마리 파티 Pokémon 전체 데이터 |
| `src/config/theme.ts` | 색상·폰트 토큰 (코드 참조용) |

---

## 9. 오디오 아키텍처 (요약)

- **AudioManager** 싱글톤/Context — BGM + SFX 통합
- BGM: `adventure-theme.mp3` (volume 30~40%)
- SFX: 버튼·배지·레벨업 등 8종
- **정책:** 모든 사운드는 사용자 인터랙션 이후에만 재생

→ 상세: `08-audio-specification.md`

---

## 10. 기존 구현 대비 Gap (v2)

| 영역 | 현재 | v2 목표 |
|------|------|---------|
| 폰트 | Bagel Fat One | **Fredoka + Press Start 2P** |
| 섹션 순서 | Profile → Log → Badges → Party | **Profile → Badges → Party → Log** |
| 배지 수 | 6개 | **8개 (2×4)** |
| Party 데이터 | content.ts memory 슬롯 | **pokemon.json 6종** |
| Party UI | 단순 카드 | **Pokédex Detail Modal** |
| Badge UI | 정적 | **클릭 → Modal (photo/story)** |
| BGM 파일 | bgm.mp3 | **adventure-theme.mp3** |
| SFX | 없음 | **AudioManager + 8 SFX** |
| Hero | 정적 | **Floating clouds/stars + Party preview** |
| Music UI | Play/Pause | **+ Volume Control** |

---

## 11. 성공 기준 (Definition of Done)

방문자가 링크를 열었을 때:

> *"Trainer Han Young Wook의 Pokédex Entry No.0912를 발견했고, 다음 생일 모험에 합류하고 있다."*

모든 디자인 결정은 다음 질문에 답해야 한다:

> **"스마트폰에서 재미있는 Pokémon-inspired 트레이너 모험처럼 느껴지는가?"**

---

## 12. 다음 문서

| # | 문서 | 내용 |
|---|------|------|
| 02 | folder-structure | 폴더·에셋 트리 |
| 03 | component-structure | 컴포넌트·Props·데이터 매핑 |
| 04 | page-flow | Mermaid 플로우·인터랙션 |
| 05 | animation-spec | GSAP/Framer 상세 |
| 06 | state-management | State·Context·Storage |
| 07 | audio-specification | BGM·SFX·AudioManager |
| 08 | development-checklist | 단계별 구현 체크리스트 |
