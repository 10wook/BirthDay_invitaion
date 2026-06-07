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
}

export interface StoryItem {
  id: string;
  text: string;
  image: string;
  imageAlt: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  image: string;
}

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}
