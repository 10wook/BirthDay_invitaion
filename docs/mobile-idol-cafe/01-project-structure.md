# 프로젝트 구조도 — 아이돌 생일카페 모바일 초대장

## 핵심 원칙

- **Mobile First** (390~430px 기준, iPhone 15 Pro)
- 카카오톡 링크 → 스마트폰 접속 전제
- 파스텔 · 귀여움 · 따뜻함 · Sanrio/생일카페 감성
- 검정/골드/다크/Apple/Luxury 스타일 **금지**

## 아키텍처

```
[카카오톡 링크]
      ↓
[Next.js Static Page /]
      ↓
┌─────────────────────────────────┐
│ SmoothScrollProvider (Lenis)    │
│  ├─ FloatingDecorations (전역)  │
│  ├─ FloatingMusicButton         │
│  └─ MusicConsentModal           │
│       ↓                         │
│  InvitationPage (섹션 조합)      │
└─────────────────────────────────┘
```

## 데이터 흐름

| 레이어 | 역할 |
|--------|------|
| `config/site.ts` | 이름, 날짜, 장소, RSVP, 미디어 경로 |
| `config/content.ts` | 스토리, 갤러리, 타임라인 텍스트 |
| `config/theme.ts` | 파스텔 컬러 토큰 |
| `public/*` | 이미지/영상/음악/아이콘 |

## 반응형 전략

1. **1단계** — 모바일 390px 완성 (주 타겟)
2. **2단계** — 태블릿 768px
3. **3단계** — 데스크탑 1024px+ (max-width 제한)
