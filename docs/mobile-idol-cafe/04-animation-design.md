# 애니메이션 설계서

## 원칙

- transform + opacity only
- Canvas/Three.js 금지
- duration 0.5~1.0s, ease: power2.out
- prefers-reduced-motion 존중

## GSAP ScrollTrigger

| 섹션 | 효과 |
|------|------|
| Hero | stagger fade up, scale in |
| Story | fade up + scale in |
| Gallery | fade in |
| Video | scale in |
| Timeline | 좌우 slide |
| Countdown | fade up stagger |
| Location/RSVP | fade up |

## Framer Motion

- 버튼 tap scale 0.97
- 모달 fade + scale
- 카운트다운 digit change

## CSS (장식)

| 효과 | 구현 |
|------|------|
| Balloon float | `@keyframes float` translateY |
| Heart pulse | scale 1~1.1 |
| Sparkle | opacity blink |
| Cloud drift | translateX slow |

## Lenis

- duration 1.0 (모바일 부드럽게)
- ScrollTrigger.update 연동
