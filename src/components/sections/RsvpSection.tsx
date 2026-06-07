"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";

export function RsvpSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(section.querySelectorAll("[data-rsvp-animate]"), {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const openForm = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <SectionWrapper id="rsvp">
      <section ref={sectionRef}>
        <SectionTitle subtitle="💌 RSVP" title="참석 여부 알려주기" />

        <p
          data-rsvp-animate
          className="font-body mb-8 text-center text-base leading-relaxed text-text-light"
        >
          함께해 주시면
          <br />
          더 행복한 생일이 될 것 같아요 💕
        </p>

        <div data-rsvp-animate className="flex flex-col gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={() => openForm(siteConfig.rsvpAttendUrl)}
          >
            참석 가능해요! 🎉
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => openForm(siteConfig.rsvpDeclineUrl)}
          >
            아쉽지만 못 가요 😢
          </Button>
        </div>
      </section>
    </SectionWrapper>
  );
}
