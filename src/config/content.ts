import type { AdventureEntry, GalleryImage, MemoryBadge } from "@/types";

export const adventureLog: AdventureEntry[] = [
  { year: "2019", title: "University Journey Started", description: "새로운 모험이 시작되었습니다." },
  { year: "2023", title: "AI Projects", description: "AI 트레이너로서 첫 프로젝트를 시작했습니다." },
  { year: "2024", title: "SRNet Research", description: "연구 모험에 도전했습니다." },
  { year: "2025", title: "RAG Development", description: "새로운 기술 스킬을 습득했습니다." },
  { year: "2026", title: "Birthday Adventure", description: "레벨 27로 진화할 준비 중!" },
];

export const memoryBadges: MemoryBadge[] = [
  {
    id: "b1",
    emoji: "🎓",
    name: "Soongsil Badge",
    description: "대학 모험 완료",
    story: "숭실대학교에서 시작된 첫 번째 모험. 새로운 세계를 향한 첫걸음.",
    memory: "캠퍼스에서 만난 친구들과 함께한 시간",
    image: "/images/gallery/01.jpg",
  },
  {
    id: "b2",
    emoji: "🤖",
    name: "AI Badge",
    description: "AI 프로젝트 달성",
    story: "인공지능 트레이너로서의 첫 도전. 모델을 훈련시키는 즐거움.",
    memory: "첫 AI 프로젝트가 성공했던 날",
    image: "/images/gallery/02.jpg",
  },
  {
    id: "b3",
    emoji: "💻",
    name: "Developer Badge",
    description: "코드 마스터",
    story: "밤새 코딩하며 성장한 개발자의 여정.",
    memory: "버그를 잡고 배포에 성공한 순간",
    image: "/images/gallery/03.jpg",
  },
  {
    id: "b4",
    emoji: "⚽",
    name: "Football Badge",
    description: "팀워크의 힘",
    story: "필드 위에서 배운 협동과 열정.",
    memory: "함께 땀 흘리며 이긴 경기",
    image: "/images/gallery/04.jpg",
  },
  {
    id: "b5",
    emoji: "📷",
    name: "Memory Badge",
    description: "추억 수집가",
    story: "소중한 순간들을 사진에 담아두었습니다.",
    memory: "친구들과 찍은 추억의 한 장",
    image: "/images/gallery/05.jpg",
  },
  {
    id: "b6",
    emoji: "☕",
    name: "Cafe Badge",
    description: "카페 모험",
    story: "카페에서의 대화와 아이디어. 작은 공간에서 큰 꿈.",
    memory: "코딩하며 마신 수많은 커피",
    image: "/images/gallery/01.jpg",
  },
  {
    id: "b7",
    emoji: "🎮",
    name: "Adventure Badge",
    description: "게임 모험",
    story: "게임처럼 즐거운 인생. 레벨업을 향해!",
    memory: "친구들과 함께한 게임의 밤",
    image: "/images/gallery/02.jpg",
  },
  {
    id: "b8",
    emoji: "🎂",
    name: "Birthday Badge",
    description: "생일 모험 준비",
    story: "Lv.27로 진화하기 위한 최종 배지.",
    memory: "9월 12일, 함께할 모험",
    image: "/images/hero/profile.jpg",
  },
];

export const galleryImages: GalleryImage[] = [
  { src: "/images/gallery/01.jpg", alt: "Photo Dex 01" },
  { src: "/images/gallery/02.jpg", alt: "Photo Dex 02" },
  { src: "/images/gallery/03.jpg", alt: "Photo Dex 03" },
  { src: "/images/gallery/04.jpg", alt: "Photo Dex 04" },
  { src: "/images/gallery/05.jpg", alt: "Photo Dex 05" },
];

export const closingMessage = "Congratulations Trainer!";
export const closingSubMessage = "See You On September 12!";
