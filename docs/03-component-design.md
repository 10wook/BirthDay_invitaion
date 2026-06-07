# 컴포넌트 설계서

> 재사용 가능한 UI/섹션 컴포넌트 명세

---

## 1. Layout 컴포넌트

### SmoothScrollProvider
| 항목 | 내용 |
|------|------|
| 역할 | Lenis 초기화, GSAP ScrollTrigger 연동 |
| Props | `children: ReactNode` |
| 훅 | `useLenis` |
| Cleanup | Lenis destroy, ScrollTrigger refresh |

### SectionWrapper
| 항목 | 내용 |
|------|------|
| 역할 | 섹션 공통 패딩, max-width, id 앵커 |
| Props | `id`, `className`, `children`, `fullHeight?` |
| 스타일 | `min-h-screen` 옵션, `px-6 md:px-12` |

### FloatingMusicButton
| 항목 | 내용 |
|------|------|
| 역할 | 하단 고정 음악 ON/OFF |
| Props | `isPlaying`, `onToggle` |
| UI | Lucide `Music` / `VolumeX`, gold border, backdrop-blur |

---

## 2. UI 컴포넌트

### Button
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}
```
- Primary: gold bg, dark text
- Secondary: outline gold
- Ghost: transparent, hover underline

### Modal (MusicConsentModal)
```typescript
interface ModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
  title: string;
  description: string;
}
```
- Framer Motion `AnimatePresence`
- backdrop blur, fade + scale

### ScrollIndicator
- ChevronDown 아이콘 + "Scroll" 텍스트
- CSS bounce animation
- Hero 하단 중앙

### SectionTitle
```typescript
interface SectionTitleProps {
  subtitle?: string;
  title: string;
  align?: 'left' | 'center';
}
```
- Cormorant Garamond serif, gold accent line

---

## 3. Section 컴포넌트

### HeroSection
| 요소 | 데이터 소스 |
|------|-------------|
| 이름 | `site.hostName` |
| 제목 | `site.partyTitle` |
| 날짜 | `site.eventDate` |
| 장소 | `site.venue` |
| 배경 영상 | `site.heroVideoSrc` |

**Refs**: `sectionRef`, `videoRef`, `titleRefs[]`
**애니메이션**: mount stagger, scroll parallax

---

### StorySection
```typescript
interface StoryItem {
  id: string;
  text: string;
  image: string;
  imageAlt: string;
}
```
- `content.storyItems` map
- 각 item: text + image 2-column (mobile stack)

---

### GallerySection
```typescript
interface GalleryImage {
  src: string;
  alt: string;
}
```
- Swiper `slidesPerView: 1.2` (mobile), `2.5` (desktop)
- `Autoplay`, `Pagination`, `Navigation`
- Dynamic import wrapper

---

### VideoSection
| Props | 기본값 |
|-------|--------|
| videoSrc | `/videos/memory.mp4` |
| poster | `/images/video-poster.jpg` |

- IntersectionObserver 또는 ScrollTrigger `onEnter` → play

---

### TimelineSection
```typescript
interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  image: string;
}
```
- Vertical line + dot
- Odd: image left, text right / Even: reversed

---

### CountdownSection
- `useCountdown(targetDate)` → `{ days, hours, minutes, seconds }`
- 4-column grid, serif numbers

---

### LocationSection
```typescript
interface LocationConfig {
  address: string;
  venueName: string;
  kakaoMapUrl: string;
  naverMapUrl: string;
  googleMapUrl: string;
  mapEmbedUrl?: string;
}
```
- Button × 3 (길찾기)
- Optional iframe embed

---

### RsvpSection
```typescript
interface RsvpConfig {
  attendUrl: string;    // Google Form with prefill
  declineUrl: string;
  message?: string;
}
```
- 두 버튼 → `window.open(url, '_blank')`

---

### ClosingSection
- `content.closingMessage`
- Particle canvas or CSS floating dots
- GSAP text reveal

---

## 4. Hooks

### useLenis
```typescript
function useLenis(): Lenis | null
```
- requestAnimationFrame loop
- ScrollTrigger.update proxy

### useGsapScrollTrigger
```typescript
function useGsapScrollTrigger(
  callback: (ctx: gsap.Context) => void,
  deps?: DependencyList
): RefObject<HTMLElement>
```
- gsap.context + cleanup

### useCountdown
```typescript
function useCountdown(targetDate: Date): CountdownValues
```
- setInterval 1s, cleanup on unmount

### useBackgroundMusic
```typescript
function useBackgroundMusic(src: string): {
  isPlaying: boolean;
  toggle: () => void;
  play: () => void;
  pause: () => void;
}
```

---

## 5. Config 타입 (types/index.ts)

```typescript
export interface SiteConfig {
  hostName: string;
  partyTitle: string;
  eventDate: string;       // ISO
  eventDateDisplay: string;
  venue: string;
  heroVideoSrc: string;
  musicSrc: string;
}

export interface StoryItem { ... }
export interface GalleryImage { ... }
export interface TimelineEntry { ... }
export interface LocationConfig { ... }
export interface RsvpConfig { ... }
```

---

## 6. 컴포넌트 트리

```
layout.tsx
└── SmoothScrollProvider
    ├── FloatingMusicButton
    ├── MusicConsentModal
    └── page.tsx
        ├── HeroSection
        ├── StorySection
        ├── GallerySection
        ├── VideoSection
        ├── TimelineSection
        ├── CountdownSection
        ├── LocationSection
        ├── RsvpSection
        └── ClosingSection
```

---

## 7. 네이밍 규칙

- 섹션: `{Name}Section.tsx`
- UI: PascalCase, 단일 책임
- 훅: `use` prefix
- Config: camelCase export constants
- CSS: Tailwind utility-first, `cn()` for merge
