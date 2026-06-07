"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/gsap";
import { useAudio } from "@/components/audio/useAudio";
import { siteConfig } from "@/config/site";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";

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

  const open = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <SectionWrapper id="join-adventure">
      <section ref={sectionRef}>
        <SectionTitle subtitle="RSVP" title="Join The Adventure" />
        <div className="flex flex-col gap-3">
          <div data-rsvp>
            <Button variant="primary" size="lg" sfx="CONFIRM" onClick={() => open(siteConfig.rsvpAttendUrl)}>
              ● Join Adventure
            </Button>
          </div>
          <div data-rsvp>
            <Button variant="secondary" size="lg" onClick={() => open(siteConfig.rsvpMaybeUrl)}>
              ◐ Maybe
            </Button>
          </div>
          <div data-rsvp>
            <Button variant="ghost" size="lg" onClick={() => open(siteConfig.rsvpDeclineUrl)}>
              ○ Cannot Join
            </Button>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
