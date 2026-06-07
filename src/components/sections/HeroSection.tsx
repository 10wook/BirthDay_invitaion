"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { registerGsapPlugins } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { MapPin, Calendar } from "lucide-react";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      const lines = content.querySelectorAll("[data-hero-line]");

      gsap.from(lines, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.to(content, {
        y: -80,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      if (videoRef.current && !videoFailed) {
        gsap.to(videoRef.current, {
          y: 120,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [videoFailed]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex h-screen min-h-[600px] items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {!videoFailed ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            onError={() => setVideoFailed(true)}
          >
            <source src={siteConfig.heroVideoSrc} type="video/mp4" />
          </video>
        ) : (
          <div className="hero-gradient h-full w-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-charcoal/80" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <p
          data-hero-line
          className="mb-4 text-xs uppercase tracking-[0.4em] text-gold"
        >
          You&apos;re Invited
        </p>
        <h1
          data-hero-line
          className="font-serif text-5xl leading-none text-ivory md:text-7xl lg:text-8xl"
        >
          {siteConfig.hostName}
        </h1>
        <p
          data-hero-line
          className="mt-4 font-serif text-2xl italic text-gold-light md:text-3xl"
        >
          {siteConfig.partyTitle}
        </p>

        <div
          data-hero-line
          className="mt-10 flex flex-col items-center gap-3 text-sm text-ivory/80 md:flex-row md:gap-8"
        >
          <span className="flex items-center gap-2">
            <Calendar size={16} className="text-gold" />
            {siteConfig.eventDateDisplay} · {siteConfig.eventTime}
          </span>
          <span className="hidden h-4 w-px bg-ivory/20 md:block" />
          <span className="flex items-center gap-2">
            <MapPin size={16} className="text-gold" />
            {siteConfig.venue}
          </span>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
