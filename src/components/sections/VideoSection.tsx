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
        scale: 0.92,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      if (video) {
        ScrollTrigger.create({
          trigger: section,
          start: "top 65%",
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
    <SectionWrapper id="video">
      <section ref={sectionRef}>
        <SectionTitle subtitle="🎬 Moments" title="소중한 순간" />

        <div
          ref={containerRef}
          className="relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-3xl border-2 border-secondary-pink shadow-[0_8px_24px_rgba(255,183,213,0.35)]"
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
            <div className="flex h-full flex-col items-center justify-center bg-secondary-pink/30 p-6 text-center">
              <span className="text-4xl">🎥</span>
              <p className="font-body mt-3 text-base text-text-light">
                /public/videos/memory.mp4
                <br />
                파일을 추가해 주세요
              </p>
            </div>
          )}
        </div>
      </section>
    </SectionWrapper>
  );
}
