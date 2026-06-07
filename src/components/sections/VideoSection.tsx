"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger, registerGsapPlugins } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    const container = containerRef.current;
    const video = videoRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      gsap.from(container, {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      if (video) {
        ScrollTrigger.create({
          trigger: section,
          start: "top 60%",
          end: "bottom 20%",
          onEnter: () => void video.play().catch(() => undefined),
          onLeave: () => video.pause(),
          onEnterBack: () => void video.play().catch(() => undefined),
          onLeaveBack: () => video.pause(),
        });
      }
    }, section);

    return () => ctx.revert();
  }, [videoFailed]);

  return (
    <SectionWrapper id="video" className="bg-cream/5">
      <section ref={sectionRef}>
        <SectionTitle subtitle="Moments" title="소중한 순간들" />

        <div
          ref={containerRef}
          className="relative mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-sm"
        >
          {!videoFailed ? (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              poster="/images/gallery/01.jpg"
              onError={() => setVideoFailed(true)}
            >
              <source src={siteConfig.memoryVideoSrc} type="video/mp4" />
            </video>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-beige/10">
              <p className="text-sm text-warm-gray">
                /public/videos/memory.mp4 파일을 추가해 주세요
              </p>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
        </div>
      </section>
    </SectionWrapper>
  );
}
