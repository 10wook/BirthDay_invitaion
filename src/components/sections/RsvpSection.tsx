"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Heart, X } from "lucide-react";
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
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
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
    <SectionWrapper id="rsvp" className="bg-cream/5">
      <section ref={sectionRef}>
        <SectionTitle subtitle="RSVP" title="참석 여부를 알려주세요" />

        <p
          data-rsvp-animate
          className="mx-auto mb-12 max-w-lg text-center text-sm leading-relaxed text-warm-gray"
        >
          소중한 자리에 함께해 주시면
          <br />
          더욱 특별한 하루가 될 것 같아요.
        </p>

        <div
          data-rsvp-animate
          className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => openForm(siteConfig.rsvpAttendUrl)}
          >
            <span className="flex items-center gap-2">
              <Heart size={18} />
              참석 가능
            </span>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => openForm(siteConfig.rsvpDeclineUrl)}
          >
            <span className="flex items-center gap-2">
              <X size={18} />
              참석 불가
            </span>
          </Button>
        </div>

        <p
          data-rsvp-animate
          className="mt-8 text-center text-xs text-warm-gray/60"
        >
          Google Form URL은 site.ts에서 변경할 수 있습니다
        </p>
      </section>
    </SectionWrapper>
  );
}
