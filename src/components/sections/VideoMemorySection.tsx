"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger, registerGsapPlugins } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function VideoMemorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    const container = containerRef.current;
    const video = videoRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      gsap.from(container, {
        scale: 0.92,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: section, start: "top 75%" },
      });
      if (video) {
        ScrollTrigger.create({
          trigger: section,
          start: "top 65%",
          onEnter: () => void video.play().catch(() => undefined),
          onLeave: () => video.pause(),
          onEnterBack: () => void video.play().catch(() => undefined),
          onLeaveBack: () => video.pause(),
        });
      }
    }, section);
    return () => ctx.revert();
  }, [failed]);

  return (
    <SectionWrapper id="video-memory">
      <section ref={sectionRef}>
        <SectionTitle subtitle="Replay" title="Video Memory" />
        <div ref={containerRef} className="relative mx-auto aspect-[4/5] max-w-[320px] overflow-hidden rounded-xl border-2 border-dex-border">
          {!failed ? (
            <video ref={videoRef} muted loop playsInline className="h-full w-full object-cover" poster="/images/gallery/01.jpg" onError={() => setFailed(true)}>
              <source src={siteConfig.memoryVideoSrc} type="video/mp4" />
            </video>
          ) : (
            <div className="flex h-full items-center justify-center bg-sky-blue/30 text-sm text-text-light">
              Add /public/videos/memory.mp4
            </div>
          )}
        </div>
      </section>
    </SectionWrapper>
  );
}
