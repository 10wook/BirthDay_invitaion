import type { AdventureEntry, GalleryImage, MemoryBadge } from "@/types";

export const adventureLog: AdventureEntry[] = [
  { year: "2019", title: "대학 모험 시작", description: "새로운 모험이 시작되었습니다." },
  { year: "2023", title: "AI 프로젝트", description: "AI 트레이너로서 첫 프로젝트를 시작했습니다." },
  { year: "2024", title: "SRNet 연구", description: "연구 모험에 도전했습니다." },
  { year: "2025", title: "RAG 개발", description: "새로운 기술 스킬을 습득했습니다." },
  { year: "2026", title: "생일 모험", description: "레벨 27로 진화할 준비 중!" },
];

export const memoryBadges: MemoryBadge[] = [
  {
    id: "b1",
    emoji: "🏫",
    name: "초등학교",
    description: "첫 모험의 시작",
    story: "처음으로 학교라는 세계에 발을 들였던 시절. 작은 교실에서 시작된 첫 번째 모험.",
    memory: "운동장을 뛰어다니며 친구들과 보낸 하루",
    image: "/images/hyw_pics/isu_elementary.png",
    imageStyle: "contain",
  },
  {
    id: "b2",
    emoji: "📖",
    name: "중학교",
    description: "성장의 시기",
    story: "조금씩 커가며 새로운 관심사와 꿈을 키워 나갔던 시절.",
    memory: "교실 뒤편에서 나눴던 수다와 웃음",
    image: "/images/hyw_pics/isu_middle.png",
    imageStyle: "contain",
  },
  {
    id: "b3",
    emoji: "🎒",
    name: "고등학교",
    description: "열정 가득한 시절",
    story: "목표를 향해 달리던 가장 치열하고 뜨거웠던 모험.",
    memory: "시험 끝나고 함께 보낸 소중한 시간",
    image: "/images/hyw_pics/IMG_8308.jpg",
  },
  {
    id: "b4",
    emoji: "🎓",
    name: "대학교",
    description: "캠퍼스 모험",
    story: "경영학과와 AI융합학부에서 배우며 트레이너로 성장했던 대학 시절. 새로운 세계를 향한 큰 모험.",
    memory: "캠퍼스에서 만난 친구들과 함께한 시간",
    image: "/images/hyw_pics/IMG_0272.JPG",
  },
  {
    id: "b5",
    emoji: "💻",
    name: "부트캠프",
    description: "집중 수련",
    story: "짧지만 강렬했던 몰입의 시간. 실력을 한 단계 끌어올린 수련의 기간.",
    memory: "밤새 코딩하며 성장했던 순간",
    image: "/images/hyw_pics/IMG_4711.JPG",
  },
  {
    id: "b6",
    emoji: "⚽",
    name: "운동",
    description: "체력 단련",
    story: "몸과 마음을 단련하며 팀워크와 끈기를 배웠던 시기.",
    memory: "함께 땀 흘리며 이긴 경기",
    image: "/images/hyw_pics/IMG_9366.jpg",
  },
  {
    id: "b7",
    emoji: "🏢",
    name: "회사",
    description: "새로운 챕터",
    story: "사회인 트레이너로서 새로운 모험을 시작한 시기.",
    memory: "동료들과 함께 만든 첫 성과",
    image: "/images/hyw_pics/IMG_1461.jpg",
  },
  {
    id: "b8",
    emoji: "✈️",
    name: "여행",
    description: "새로운 지역 탐험",
    story: "낯선 곳을 향해 떠난 모험. 길 위에서 만난 풍경과 사람들.",
    memory: "함께 걸었던 여행길의 추억",
    image: "/images/hyw_pics/IMG_5901.jpg",
  },
];

export const galleryImages: GalleryImage[] = [
  { src: "/images/hyw_pics/IMG_1108.JPG",  alt: "한영욱 01" },
  { src: "/images/hyw_pics/IMG_1135.jpg",  alt: "한영욱 02" },
  { src: "/images/hyw_pics/IMG_1525.jpg",  alt: "한영욱 03" },
  { src: "/images/hyw_pics/IMG_2633.jpg",  alt: "한영욱 04" },
  { src: "/images/hyw_pics/IMG_2652.JPG",  alt: "한영욱 05" },
  { src: "/images/hyw_pics/IMG_2805.jpg",  alt: "한영욱 06" },
  { src: "/images/hyw_pics/IMG_4711.JPG",  alt: "한영욱 07" },
  { src: "/images/hyw_pics/IMG_4744.jpg",  alt: "한영욱 08" },
  { src: "/images/hyw_pics/IMG_6057.jpg",  alt: "한영욱 09" },
  { src: "/images/hyw_pics/IMG_7445.JPG",  alt: "한영욱 10" },
  { src: "/images/hyw_pics/IMG_8308.jpg",  alt: "한영욱 11" },
  { src: "/images/hyw_pics/IMG_9366.jpg",  alt: "한영욱 12" },
  { src: "/images/hyw_pics/IMG_9520.JPG",  alt: "한영욱 13" },
];

export const closingMessage = "축하해요, 트레이너!";
export const closingSubMessage = "9월 12일에 만나요!";
