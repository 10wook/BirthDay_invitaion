import type { AdventureEntry, GalleryImage, MemoryBadge, PartySlot } from "@/types";

export const adventureLog: AdventureEntry[] = [
  { year: "2019", title: "University Journey Started", description: "새로운 모험이 시작되었습니다." },
  { year: "2023", title: "AI Projects", description: "AI 트레이너로서 첫 프로젝트를 시작했습니다." },
  { year: "2024", title: "SRNet Research", description: "연구 모험에 도전했습니다." },
  { year: "2025", title: "RAG Development", description: "새로운 기술 스킬을 습득했습니다." },
  { year: "2026", title: "Birthday Adventure", description: "레벨 27로 진화할 준비 중!" },
];

export const memoryBadges: MemoryBadge[] = [
  { id: "b1", emoji: "🎓", name: "Soongsil Badge", description: "대학 모험 완료" },
  { id: "b2", emoji: "🤖", name: "AI Badge", description: "AI 프로젝트 달성" },
  { id: "b3", emoji: "⚽", name: "Football Badge", description: "팀워크의 힘" },
  { id: "b4", emoji: "💻", name: "Developer Badge", description: "코드 마스터" },
  { id: "b5", emoji: "📷", name: "Memory Badge", description: "추억 수집가" },
  { id: "b6", emoji: "🎂", name: "Birthday Badge", description: "생일 모험 준비" },
];

export const partySlots: PartySlot[] = [
  { id: "p1", slotNo: 1, nickname: "Memory #1", memory: "함께한 첫 추억", story: "모험의 시작", image: "/images/gallery/01.jpg" },
  { id: "p2", slotNo: 2, nickname: "Memory #2", memory: "웃었던 날", story: "행복한 순간", image: "/images/gallery/02.jpg" },
  { id: "p3", slotNo: 3, nickname: "Memory #3", memory: "특별한 하루", story: "잊지 못할 기억", image: "/images/gallery/03.jpg" },
  { id: "p4", slotNo: 4, nickname: "Memory #4", memory: "함께한 여정", story: "우정의 힘", image: "/images/gallery/04.jpg" },
  { id: "p5", slotNo: 5, nickname: "Memory #5", memory: "성장의 기록", story: "한 단계 더", image: "/images/gallery/05.jpg" },
  { id: "p6", slotNo: 6, nickname: "Memory #6", memory: "다음 모험", story: "레벨 업 준비!", image: "/images/story/01.jpg" },
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
