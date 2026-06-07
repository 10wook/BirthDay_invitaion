"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/gsap";
import { adventureLog } from "@/config/content";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GameTextBox } from "@/components/ui/GameTextBox";

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
            <div key={entry.year} data-log>
              <GameTextBox label={`YEAR ${entry.year}`} showCursor={false}>
                <span className="font-bold">{entry.title}</span>
                <br />
                {entry.description}
              </GameTextBox>
            </div>
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}
