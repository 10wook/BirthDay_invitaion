# BirthDay Invitation

한영욱의 **아이돌 생일카페** 감성 모바일 디지털 초대장 💕

> Mobile First · 390px 기준 · 카카오톡 링크 공유용

## 디자인 컨셉

- K-POP 생일카페 / Sanrio / 파스텔톤
- Primary Pink `#FFB7D5` · Cream `#FFF7F2` · Sky Blue · Lavender
- 폰트: Bagel Fat One / Gaegu / Hi Melody

## 기술 스택

- Next.js (App Router) + TypeScript
- TailwindCSS
- GSAP + ScrollTrigger
- Framer Motion
- Lenis (Smooth Scroll)
- Swiper
- Lucide React

## 시작하기

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인

## Vercel 배포

이 프로젝트는 **Vercel에 바로 배포 가능**합니다. Next.js App Router + Static 페이지 구조로 설정되어 있습니다.

### 방법 1: GitHub 연동 (권장)

1. [Vercel](https://vercel.com) 로그인
2. **Add New Project** → GitHub 저장소 `BirthDay_invitaion` 선택
3. Framework Preset: **Next.js** (자동 감지)
4. Build Command: `npm run build` (기본값)
5. **Deploy** 클릭

배포 후 Vercel 대시보드 → **Settings → Environment Variables**에서 `.env.example` 항목을 추가할 수 있습니다.

### 방법 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel          # 프리뷰 배포
vercel --prod    # 프로덕션 배포
```

### 배포 전 체크리스트

- [ ] `public/videos/hero-bg.mp4`, `memory.mp4` 추가 (선택)
- [x] `public/music/bgm.mp3` — placeholder 포함 (교체 가능)
- [ ] `src/config/site.ts` 또는 Vercel 환경 변수에 실제 날짜·장소·RSVP URL 설정
- [ ] `public/images/`에 실제 사진 교체

### 환경 변수

`.env.example` 파일을 참고하세요. Vercel 대시보드에서 설정하면 코드 수정 없이 콘텐츠를 변경할 수 있습니다.

| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_SITE_URL` | 배포 URL (커스텀 도메인) |
| `NEXT_PUBLIC_HOST_NAME` | 초대장 주인 이름 |
| `NEXT_PUBLIC_EVENT_DATE` | ISO 형식 날짜 |
| `NEXT_PUBLIC_RSVP_ATTEND_URL` | 참석 Google Form URL |

## 콘텐츠 교체

| 항목 | 파일 |
|------|------|
| 이름, 날짜, 장소 | `src/config/site.ts` 또는 Vercel 환경 변수 |
| 스토리, 갤러리, 타임라인 | `src/config/content.ts` |
| 이미지 | `public/images/` |
| 영상 | `public/videos/` |
| 배경 음악 | `public/music/bgm.mp3` |

## 설계 문서

`docs/` 폴더 참고

- 01-project-structure.md
- 02-implementation-plan.md
- 03-component-design.md
- 04-animation-design.md
- 05-development-checklist.md
