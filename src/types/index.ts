export interface SiteConfig {
  hostName: string;
  partyTitle: string;
  eventDate: string;
  eventDateDisplay: string;
  eventTime: string;
  venue: string;
  venueName: string;
  address: string;
  heroVideoSrc: string;
  memoryVideoSrc: string;
  musicSrc: string;
  kakaoMapUrl: string;
  naverMapUrl: string;
  googleMapUrl: string;
  mapEmbedUrl?: string;
  rsvpAttendUrl: string;
  rsvpDeclineUrl: string;
  rsvpMaybeUrl: string;
  profileImageSrc: string;
}

export interface TrainerConfig {
  name: string;
  nameKo: string;
  trainerNo: string;
  birthday: string;
  birthdayDisplay: string;
  level: number;
  nextLevel: number;
  region: string;
  trainerClass: string;
  type: string;
  hp: number;
  exp: number;
  rank: string;
}

export interface AdventureEntry {
  year: string;
  title: string;
  description: string;
}

export interface MemoryBadge {
  id: string;
  emoji: string;
  name: string;
  description: string;
}

export interface PartySlot {
  id: string;
  slotNo: number;
  nickname: string;
  memory: string;
  story: string;
  image: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}
