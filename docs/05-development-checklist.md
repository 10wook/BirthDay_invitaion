# 개발 체크리스트

> 단계별 완료 확인용 체크리스트

---

## Phase 0 — 설계

- [x] 프로젝트 구조도 (`01-project-structure.md`)
- [x] 구현 단계 계획서 (`02-implementation-plan.md`)
- [x] 컴포넌트 설계서 (`03-component-design.md`)
- [x] 애니메이션 설계서 (`04-animation-design.md`)
- [x] 개발 체크리스트 (`05-development-checklist.md`)

---

## Phase 1 — 프로젝트 셋업

- [x] Next.js App Router + TypeScript 생성
- [x] TailwindCSS 설정
- [x] GSAP, Lenis, Framer Motion, Swiper, Lucide 설치
- [x] 폴더 구조 생성 (`src/components`, `src/hooks`, `src/config`, `public/*`)
- [x] `site.ts`, `content.ts`, `theme.ts` 작성
- [x] `npm run dev` 정상 실행
- [x] `npm run build` 성공

---

## Phase 2 — 공통 레이아웃

- [x] Google Font 적용 (Cormorant Garamond + Noto Sans KR)
- [x] globals.css CSS 변수 (cream, beige, gold, warm-gray)
- [x] tailwind.config.ts 테마 확장
- [x] Root layout.tsx 메타 태그
- [x] SmoothScrollProvider (Lenis)
- [x] SectionWrapper 컴포넌트
- [x] 배경 노이즈/그라데이션

---

## Phase 3 — Hero Section

- [x] 100vh 풀스크린 레이아웃
- [x] 배경 영상 (muted, autoplay, loop, playsInline)
- [x] 이름, 제목, 날짜, 장소 표시
- [x] 텍스트 stagger fade-in (GSAP)
- [x] 패럴랙스 scroll scrub
- [x] Scroll Down 안내 (ScrollIndicator)

---

## Phase 4 — Story Section

- [x] content.ts 스토리 데이터 바인딩
- [x] Fade In + Slide Up (ScrollTrigger)
- [x] 이미지 Zoom In / clip reveal
- [x] next/image lazy loading

---

## Phase 5 — Gallery Section

- [x] Swiper 설치 및 dynamic import
- [x] Autoplay (delay 4000ms)
- [x] Pagination dots
- [x] Navigation arrows (desktop)
- [x] 모바일 touch swipe
- [x] 슬라이드 전환 애니메이션
- [x] hover scale effect

---

## Phase 6 — Video Section

- [x] memory 영상 embed
- [x] muted, loop 속성
- [x] ScrollTrigger 진입 시 play
- [x] ScrollTrigger 이탈 시 pause
- [x] Fade-in 등장 애니메이션

---

## Phase 7 — Timeline Section

- [x] 2024 / 2025 / 2026 데이터
- [x] Vertical timeline line
- [x] 좌우 교차 slide-in
- [x] ScrollTrigger per entry
- [x] next/image for timeline photos

---

## Phase 8 — Countdown Section

- [x] useCountdown 훅
- [x] Day / Hour / Minute / Second 표시
- [x] 1초 간격 실시간 업데이트
- [x] 목표 날짜 site.ts 연동
- [x] 등장 애니메이션

---

## Phase 9 — Location Section

- [x] venue 이름 + 주소 표시
- [x] 카카오맵 링크 버튼
- [x] 네이버지도 링크 버튼
- [x] 구글맵 링크 버튼
- [ ] (선택) 지도 embed iframe

---

## Phase 10 — RSVP Section

- [x] "참석 가능" 버튼
- [x] "참석 불가" 버튼
- [x] Google Form URL (site.ts 설정)
- [x] Framer Motion 버튼 인터랙션
- [x] 새 탭 열기

---

## Phase 11 — Background Music

- [x] public/music/bgm.mp3 경로 config
- [x] 첫 진입 MusicConsentModal
- [x] 수락 시 autoplay
- [x] FloatingMusicButton (하단 고정)
- [x] ON/OFF toggle
- [x] Lucide Music / VolumeX 아이콘

---

## Phase 12 — Closing Section

- [x] "함께 해주셔서 감사합니다" 메시지
- [x] Text Reveal (clip-path)
- [x] Particle 효과 (canvas)
- [x] Fade out 마무리

---

## 성능 & 품질

- [x] next/image 전체 적용
- [x] Lazy loading (below fold)
- [x] Dynamic import (Swiper, heavy sections)
- [x] GSAP ScrollTrigger cleanup (ctx.revert)
- [x] Lenis destroy on unmount
- [x] prefers-reduced-motion 지원
- [ ] Mobile viewport 테스트 (375px)
- [ ] Tablet 테스트 (768px)
- [ ] Desktop 테스트 (1280px+)
- [ ] Lighthouse Performance > 80 (목표)

---

## 콘텐츠 교체 가이드

| 변경 항목 | 파일 |
|-----------|------|
| 이름, 날짜, 장소 | `src/config/site.ts` |
| 스토리 문구 | `src/config/content.ts` |
| 갤러리 이미지 | `public/images/gallery/` + `content.ts` |
| Hero 영상 | `public/videos/hero-bg.mp4` |
| 추억 영상 | `public/videos/memory.mp4` |
| 배경 음악 | `public/music/bgm.mp3` |
| RSVP Form URL | `src/config/site.ts` |
| 지도 링크 | `src/config/site.ts` |

---

## 현재 진행 상태

| 단계 | 상태 |
|------|------|
| 0 — 설계 | ✅ 완료 |
| 1 — 셋업 | ✅ 완료 |
| 2 — 레이아웃 | ✅ 완료 |
| 3–12 | ✅ 완료 |
