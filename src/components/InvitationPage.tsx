"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";

const StorySection = dynamic(
  () => import("@/components/sections/StorySection").then((m) => m.StorySection),
  { loading: () => <SectionLoader /> },
);

const GallerySection = dynamic(
  () =>
    import("@/components/sections/GallerySection").then((m) => m.GallerySection),
  { ssr: false, loading: () => <SectionLoader /> },
);

const VideoSection = dynamic(
  () => import("@/components/sections/VideoSection").then((m) => m.VideoSection),
  { loading: () => <SectionLoader /> },
);

const TimelineSection = dynamic(
  () =>
    import("@/components/sections/TimelineSection").then(
      (m) => m.TimelineSection,
    ),
  { loading: () => <SectionLoader /> },
);

const CountdownSection = dynamic(
  () =>
    import("@/components/sections/CountdownSection").then(
      (m) => m.CountdownSection,
    ),
  { ssr: false, loading: () => <SectionLoader /> },
);

const LocationSection = dynamic(
  () =>
    import("@/components/sections/LocationSection").then(
      (m) => m.LocationSection,
    ),
  { loading: () => <SectionLoader /> },
);

const RsvpSection = dynamic(
  () => import("@/components/sections/RsvpSection").then((m) => m.RsvpSection),
  { loading: () => <SectionLoader /> },
);

const ClosingSection = dynamic(
  () =>
    import("@/components/sections/ClosingSection").then(
      (m) => m.ClosingSection,
    ),
  { loading: () => <SectionLoader /> },
);

function SectionLoader() {
  return <div className="min-h-[40vh]" />;
}

export function InvitationPage() {
  return (
    <main className="relative z-[2] mx-auto max-w-[430px] md:max-w-2xl">
      <HeroSection />
      <StorySection />
      <GallerySection />
      <VideoSection />
      <TimelineSection />
      <CountdownSection />
      <LocationSection />
      <RsvpSection />
      <ClosingSection />
    </main>
  );
}
