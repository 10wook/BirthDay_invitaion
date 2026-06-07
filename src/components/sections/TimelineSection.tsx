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
      const line = section.querySelector("[data-timeline-line]");
      const entries = section.querySelectorAll("[data-timeline-entry]");

      gsap.from(line, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      entries.forEach((entry, index) => {
        gsap.from(entry, {
          x: index % 2 === 0 ? -80 : 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: entry,
            start: "top 80%",
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
        <SectionTitle subtitle="Journey" title="함께한 시간" />

        <div className="relative">
          <div
            data-timeline-line
            className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-gold/60 via-gold/30 to-transparent md:left-1/2 md:block md:-translate-x-1/2"
          />

          <div className="flex flex-col gap-20 md:gap-28">
            {timelineEntries.map((entry, index) => (
              <div
                key={entry.year}
                data-timeline-entry
                className={`relative flex flex-col gap-8 md:flex-row md:items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="hidden md:absolute md:left-1/2 md:top-1/2 md:z-10 md:block md:h-3 md:w-3 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-full md:bg-gold md:shadow-[0_0_20px_rgba(201,169,98,0.5)]" />

                <div className="flex-1 md:px-12">
                  <span className="font-serif text-5xl text-gold/80 md:text-6xl">
                    {entry.year}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl text-ivory md:text-3xl">
                    {entry.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-warm-gray">
                    {entry.description}
                  </p>
                </div>

                <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-sm md:max-w-md">
                  <Image
                    src={entry.image}
                    alt={entry.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
