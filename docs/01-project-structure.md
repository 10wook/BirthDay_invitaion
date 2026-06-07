# 프로젝트 구조도

> 생일 파티 프리미엄 디지털 초대장 — 전체 폴더 구조 설계

---

## 1. 루트 디렉토리

```
BirthDay_invitaion/
├── docs/                          # 설계 문서
│   ├── 01-project-structure.md
│   ├── 02-implementation-plan.md
│   ├── 03-component-design.md
│   ├── 04-animation-design.md
│   └── 05-development-checklist.md
├── public/
│   ├── images/
│   │   ├── hero/                  # Hero 배경, 프로필
│   │   ├── story/                 # 스토리 섹션 이미지
│   │   ├── gallery/               # 갤러리 슬라이드
│   │   └── timeline/              # 타임라인 연도별 이미지
│   ├── videos/
│   │   ├── hero-bg.mp4            # Hero 배경 영상
│   │   └── memory.mp4             # 추억 영상
│   └── music/
│       └── bgm.mp3                # 배경 음악 (교체 가능)
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root Layout
│   │   ├── page.tsx               # 메인 페이지 (섹션 조합)
│   │   └── globals.css            # Global Style + Tailwind
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SmoothScrollProvider.tsx
│   │   │   ├── SectionWrapper.tsx
│   │   │   └── FloatingMusicButton.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── ScrollIndicator.tsx
│   │   │   └── SectionTitle.tsx
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── StorySection.tsx
│   │       ├── GallerySection.tsx
│   │       ├── VideoSection.tsx
│   │       ├── TimelineSection.tsx
│   │       ├── CountdownSection.tsx
│   │       ├── LocationSection.tsx
│   │       ├── RsvpSection.tsx
│   │       └── ClosingSection.tsx
│   ├── hooks/
│   │   ├── useLenis.ts
│   │   ├── useGsapScrollTrigger.ts
│   │   ├── useCountdown.ts
│   │   └── useBackgroundMusic.ts
│   ├── lib/
│   │   ├── gsap.ts                # GSAP + ScrollTrigger 등록
│   │   └── utils.ts               # cn(), formatDate 등
│   ├── config/
│   │   ├── site.ts                # 사이트 메타, RSVP URL
│   │   ├── content.ts             # 텍스트, 스토리, 타임라인 데이터
│   │   └── theme.ts               # 색상, 폰트 토큰
│   └── types/
│       └── index.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## 2. 페이지 구조

| 경로 | 설명 |
|------|------|
| `/` | 단일 페이지 스크롤 스토리텔링 초대장 |

모든 섹션이 하나의 페이지에 순차적으로 배치된다.

```
┌─────────────────────────────────────┐
│  Hero (100vh)                       │
├─────────────────────────────────────┤
│  Story (스크롤 스토리)               │
├─────────────────────────────────────┤
│  Gallery (Swiper)                   │
├─────────────────────────────────────┤
│  Video (추억 영상)                   │
├─────────────────────────────────────┤
│  Timeline (연도별)                   │
├─────────────────────────────────────┤
│  Countdown (D-Day)                  │
├─────────────────────────────────────┤
│  Location (지도/길찾기)              │
├─────────────────────────────────────┤
│  RSVP (참석 여부)                    │
├─────────────────────────────────────┤
│  Closing (감사 메시지)               │
└─────────────────────────────────────┘
```

---

## 3. Asset 관리 전략

### 원칙
- **모든 미디어는 `/public` 하위에 배치** — URL 경로로 직접 참조
- **콘텐츠 데이터는 `/src/config/content.ts`에서 중앙 관리**
- 이미지/영상/음악 파일명만 교체하면 UI 자동 반영

### 이미지
```typescript
// content.ts 예시
export const galleryImages = [
  { src: '/images/gallery/01.jpg', alt: '추억 1' },
  { src: '/images/gallery/02.jpg', alt: '추억 2' },
];
```

### 영상
- Hero: `public/videos/hero-bg.mp4` (muted, autoplay, loop)
- Memory: `public/videos/memory.mp4` (ScrollTrigger 진입 시 재생)

### 음악
- `public/music/bgm.mp3` — `site.ts`의 `musicSrc`로 경로 지정

---

## 4. Animation 관리 전략

### 레이어 분리

| 도구 | 역할 |
|------|------|
| **Lenis** | 전역 스무스 스크롤 |
| **GSAP + ScrollTrigger** | 스크롤 기반 섹션 애니메이션 (pin, scrub, parallax) |
| **Framer Motion** | UI 마이크로 인터랙션 (버튼, 모달, hover) |

### 규칙
1. ScrollTrigger 인스턴스는 `useGsapScrollTrigger` 훅에서 생성·정리
2. 컴포넌트 unmount 시 `ScrollTrigger.getAll().forEach(t => t.kill())` 또는 ref 기반 cleanup
3. `data-animate` 속성으로 타겟 요소 마킹
4. `prefers-reduced-motion` 미디어 쿼리 존중

### GSAP 등록 (lib/gsap.ts)
```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
```

---

## 5. Config 중앙화

| 파일 | 내용 |
|------|------|
| `site.ts` | 이름, 날짜, 장소, RSVP URL, 음악 경로 |
| `content.ts` | 스토리 문구, 갤러리, 타임라인 데이터 |
| `theme.ts` | CSS 변수, Tailwind 확장 색상 |

콘텐츠 교체 시 **코드 수정 없이 config 파일만 편집**하면 된다.

---

## 6. 성능 최적화 전략

- `next/image` — 갤러리, 스토리, 타임라인 이미지
- `loading="lazy"` — 뷰포트 밖 이미지
- Dynamic Import — Swiper, 무거운 섹션 (`next/dynamic`, `ssr: false`)
- GSAP ScrollTrigger `refresh()` — Lenis 연동 후 한 번 호출
- 모바일: `will-change` 최소화, transform/opacity 위주 애니메이션
