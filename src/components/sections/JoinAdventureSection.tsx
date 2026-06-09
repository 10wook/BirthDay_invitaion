"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/gsap";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StarterSelect } from "@/components/ui/StarterSelect";

export function JoinAdventureSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.from(section.querySelectorAll("[data-rsvp]"), {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: { trigger: section, start: "top 80%" },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="join-adventure">
      <section ref={sectionRef}>
        <SectionTitle subtitle="스타터 선택" title="파트너를 선택하고 모험에 참여하세요" />
        <div data-rsvp>
          <StarterSelect />
        </div>
      </section>
    </SectionWrapper>
  );
}
