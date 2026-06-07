"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { registerGsapPlugins } from "@/lib/gsap";
import { timelineEntries } from "@/config/content";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      section.querySelectorAll("[data-timeline-entry]").forEach((entry, i) => {
        gsap.from(entry, {
          x: i % 2 === 0 ? -30 : 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: entry,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="timeline">
      <section ref={sectionRef}>
        <SectionTitle subtitle="🗓 Timeline" title="함께한 시간" />

        <div className="flex flex-col gap-8">
          {timelineEntries.map((entry) => (
            <div
              key={entry.year}
              data-timeline-entry
              className="cute-card overflow-hidden p-0"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={entry.image}
                  alt={entry.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 430px) 90vw, 400px"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <span className="font-display text-2xl text-primary-pink">
                  {entry.year}
                </span>
                <h3 className="font-accent mt-1 text-xl text-text">
                  {entry.title}
                </h3>
                <p className="font-body mt-2 text-base leading-relaxed text-text-light">
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}
