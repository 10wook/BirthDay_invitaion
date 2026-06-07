"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/gsap";
import { memoryBadges } from "@/config/content";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function MemoryBadgesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      section.querySelectorAll("[data-badge]").forEach((el, i) => {
        gsap.from(el, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="memory-badges">
      <section ref={sectionRef}>
        <SectionTitle subtitle="Achievements" title="Memory Badges" />
        <div className="grid grid-cols-2 gap-3">
          {memoryBadges.map((badge) => (
            <div
              key={badge.id}
              data-badge
              className="dex-card flex flex-col items-center p-4 text-center"
            >
              <span className="text-3xl">{badge.emoji}</span>
              <p className="mt-2 text-sm font-bold text-text">{badge.name}</p>
              <p className="mt-1 text-xs text-text-light">{badge.description}</p>
            </div>
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}
