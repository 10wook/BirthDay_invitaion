# BirthDay Invitation

한영욱의 생일 파티 프리미엄 디지털 초대장

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

## 콘텐츠 교체

| 항목 | 파일 |
|------|------|
| 이름, 날짜, 장소 | `src/config/site.ts` |
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
