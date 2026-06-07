import type { GalleryImage, StoryItem, TimelineEntry } from "@/types";

export const storyItems: StoryItem[] = [
  {
    id: "story-1",
    text: "함께해서 즐거웠어",
    image: "/images/story/01.jpg",
    imageAlt: "함께해서 즐거웠어",
  },
  {
    id: "story-2",
    text: "올해도 고마워",
    image: "/images/story/02.jpg",
    imageAlt: "올해도 고마워",
  },
  {
    id: "story-3",
    text: "이번 생일도 같이 보내자",
    image: "/images/story/03.jpg",
    imageAlt: "이번 생일도 같이 보내자",
  },
];

export const galleryImages: GalleryImage[] = [
  { src: "/images/gallery/01.jpg", alt: "추억 사진 1" },
  { src: "/images/gallery/02.jpg", alt: "추억 사진 2" },
  { src: "/images/gallery/03.jpg", alt: "추억 사진 3" },
  { src: "/images/gallery/04.jpg", alt: "추억 사진 4" },
  { src: "/images/gallery/05.jpg", alt: "추억 사진 5" },
];

export const timelineEntries: TimelineEntry[] = [
  {
    year: "2024",
    title: "첫 만남",
    description: "우연히 시작된 인연이 특별한 추억이 되었어요 💕",
    image: "/images/timeline/2024.jpg",
  },
  {
    year: "2025",
    title: "함께한 시간",
    description: "많은 순간들을 나누며 더 깊은 우정을 쌓았어요 ✨",
    image: "/images/timeline/2025.jpg",
  },
  {
    year: "2026",
    title: "새로운 시작",
    description: "올해 생일, 소중한 분들과 함께하고 싶어요 🎂",
    image: "/images/timeline/2026.jpg",
  },
];

export const closingMessage = "와주셔서 고마워요 💕";
