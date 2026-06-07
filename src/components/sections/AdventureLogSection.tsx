"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/gsap";
import { adventureLog } from "@/config/content";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { DexCard } from "@/components/ui/DexCard";

export function AdventureLogSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      section.querySelectorAll("[data-log]").forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 === 0 ? -20 : 20,
          opacity: 0,
          duration: 0.7,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="adventure-log">
      <section ref={sectionRef}>
        <SectionTitle subtitle="Journey Log" title="Adventure Log" />
        <div className="space-y-4">
          {adventureLog.map((entry) => (
            <DexCard key={entry.year} data-log className="relative pl-4">
              <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-poke-red" />
              <p className="font-display text-lg text-poke-red">{entry.year}</p>
              <p className="font-bold text-text">{entry.title}</p>
              <p className="mt-1 text-sm text-text-light">{entry.description}</p>
            </DexCard>
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}
