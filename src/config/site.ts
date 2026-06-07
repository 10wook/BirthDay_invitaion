import type { SiteConfig } from "@/types";

function env(key: string, fallback: string): string {
  return process.env[key]?.trim() || fallback;
}

export const siteConfig: SiteConfig = {
  hostName: env("NEXT_PUBLIC_HOST_NAME", "한영욱"),
  partyTitle: env("NEXT_PUBLIC_PARTY_TITLE", "Birthday Adventure"),
  eventDate: env("NEXT_PUBLIC_EVENT_DATE", "2026-09-12T18:00:00+09:00"),
  eventDateDisplay: env("NEXT_PUBLIC_EVENT_DATE_DISPLAY", "2026년 9월 12일 (토)"),
  eventTime: env("NEXT_PUBLIC_EVENT_TIME", "오후 6시"),
  venue: env("NEXT_PUBLIC_VENUE", "서울"),
  venueName: env("NEXT_PUBLIC_VENUE_NAME", "Adventure Meet Point"),
  address: env("NEXT_PUBLIC_ADDRESS", "서울특별시 강남구 테헤란로 123"),
  heroVideoSrc: env("NEXT_PUBLIC_HERO_VIDEO_SRC", "/videos/hero-bg.mp4"),
  memoryVideoSrc: env("NEXT_PUBLIC_MEMORY_VIDEO_SRC", "/videos/memory.mp4"),
  musicSrc: env("NEXT_PUBLIC_MUSIC_SRC", "/music/bgm.mp3"),
  kakaoMapUrl: env("NEXT_PUBLIC_KAKAO_MAP_URL", "https://map.kakao.com/"),
  naverMapUrl: env("NEXT_PUBLIC_NAVER_MAP_URL", "https://map.naver.com/"),
  googleMapUrl: env("NEXT_PUBLIC_GOOGLE_MAP_URL", "https://maps.google.com/"),
  mapEmbedUrl: process.env.NEXT_PUBLIC_MAP_EMBED_URL?.trim() || undefined,
  rsvpAttendUrl: env("NEXT_PUBLIC_RSVP_ATTEND_URL", "https://forms.google.com/"),
  rsvpDeclineUrl: env("NEXT_PUBLIC_RSVP_DECLINE_URL", "https://forms.google.com/"),
  rsvpMaybeUrl: env("NEXT_PUBLIC_RSVP_MAYBE_URL", "https://forms.google.com/"),
  profileImageSrc: env("NEXT_PUBLIC_PROFILE_IMAGE", "/images/hero/profile.jpg"),
};

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
