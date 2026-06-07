"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { registerGsapPlugins } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { Calendar, MapPin } from "lucide-react";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.from(content.querySelectorAll("[data-hero-line]"), {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.9,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.2,
      });

      gsap.to(content, {
        y: -40,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-pastel-bg relative z-[2] flex h-[100dvh] min-h-[640px] items-center justify-center overflow-hidden"
    >
      {/* 장식 */}
      <span className="absolute left-[6%] top-[8%] text-3xl opacity-70 animate-float">
        🎈
      </span>
      <span className="absolute right-[8%] top-[10%] text-2xl opacity-70 animate-heart">
        💕
      </span>
      <span className="absolute left-[10%] bottom-[20%] text-xl opacity-60 animate-sparkle">
        ✨
      </span>
      <span className="absolute right-[6%] bottom-[25%] text-2xl opacity-60 animate-cloud">
        ☁️
      </span>

      <div
        ref={contentRef}
        className="relative z-10 flex w-full max-w-[430px] flex-col items-center px-5 text-center"
      >
        {/* 프로필 */}
        <div
          data-hero-line
          className="relative mb-5 h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-[0_8px_24px_rgba(255,183,213,0.5)]"
        >
          {!imgError ? (
            <Image
              src={siteConfig.profileImageSrc}
              alt={siteConfig.hostName}
              fill
              className="object-cover"
              priority
              sizes="128px"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary-pink text-4xl">
              🎂
            </div>
          )}
          <span className="absolute -right-1 -top-1 text-lg">🎀</span>
        </div>

        <p data-hero-line className="font-accent text-lg text-primary-pink">
          HAPPY BIRTHDAY
        </p>

        <h1
          data-hero-line
          className="font-display mt-1 text-[32px] leading-tight text-text"
        >
          {siteConfig.hostName}
        </h1>

        <p
          data-hero-line
          className="font-accent mt-2 text-xl text-text-light"
        >
          {siteConfig.partyTitle} 🎉
        </p>

        <div
          data-hero-line
          className="cute-card mt-6 w-full px-5 py-4 text-left"
        >
          <p className="flex items-center gap-2 font-body text-base text-text">
            <Calendar size={16} className="shrink-0 text-primary-pink" />
            {siteConfig.eventDateDisplay} · {siteConfig.eventTime}
          </p>
          <p className="mt-2 flex items-center gap-2 font-body text-base text-text">
            <MapPin size={16} className="shrink-0 text-primary-pink" />
            {siteConfig.venue}
          </p>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
