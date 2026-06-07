"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/gsap";
import { closingMessage, closingSubMessage } from "@/config/content";
import { SectionWrapper } from "@/components/layout/SectionWrapper";

export function EndingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section || !textRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        y: 30, opacity: 0, scale: 0.95, duration: 1,
        scrollTrigger: { trigger: section, start: "top 75%" },
      });
      gsap.from(section.querySelectorAll("[data-star]"), {
        scale: 0, opacity: 0, stagger: 0.1, delay: 0.5, ease: "back.out(2)",
        scrollTrigger: { trigger: section, start: "top 75%" },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="ending" fullHeight className="pb-24">
      <section ref={sectionRef} className="flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex gap-2">
          {["★", "✦", "★", "✦", "★"].map((s, i) => (
            <span key={i} data-star className="text-xl text-primary-yellow animate-sparkle">{s}</span>
          ))}
        </div>
        <div ref={textRef} className="dex-screen mx-auto max-w-[360px] p-8">
          <p className="font-display text-2xl text-text">{closingMessage}</p>
          <p className="mt-3 text-base font-bold text-poke-red">{closingSubMessage}</p>
        </div>
        <p className="mt-6 text-xs text-text-light">Pokédex Entry Complete ✓</p>
      </section>
    </SectionWrapper>
  );
}
