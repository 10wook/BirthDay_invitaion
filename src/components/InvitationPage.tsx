"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";

const StorySection = dynamic(
  () =>
    import("@/components/sections/StorySection").then((m) => m.StorySection),
  { loading: () => <SectionLoader /> },
);

const GallerySection = dynamic(
  () =>
    import("@/components/sections/GallerySection").then(
      (m) => m.GallerySection,
    ),
  { loading: () => <SectionLoader />, ssr: false },
);

const VideoSection = dynamic(
  () =>
    import("@/components/sections/VideoSection").then((m) => m.VideoSection),
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
  { loading: () => <SectionLoader />, ssr: false },
);

const LocationSection = dynamic(
  () =>
    import("@/components/sections/LocationSection").then(
      (m) => m.LocationSection,
    ),
  { loading: () => <SectionLoader /> },
);

const RsvpSection = dynamic(
  () =>
    import("@/components/sections/RsvpSection").then((m) => m.RsvpSection),
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
  return <div className="min-h-[50vh]" />;
}

export function InvitationPage() {
  return (
    <main className="relative">
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
