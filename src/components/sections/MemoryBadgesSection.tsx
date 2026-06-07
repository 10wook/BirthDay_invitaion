"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/gsap";
import { useAudio } from "@/components/audio/useAudio";
import { memoryBadges } from "@/config/content";
import type { MemoryBadge } from "@/types";
import { BadgeDetailModal } from "@/components/modals/BadgeDetailModal";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BadgeTile } from "@/components/ui/BadgeTile";

export function MemoryBadgesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeBadge, setActiveBadge] = useState<MemoryBadge | null>(null);
  const { playSfx } = useAudio();

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
          delay: i * 0.06,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const handleBadgeClick = (badge: MemoryBadge) => {
    playSfx("BADGE_UNLOCK");
    setActiveBadge(badge);
  };

  return (
    <SectionWrapper id="memory-badges">
      <section ref={sectionRef}>
        <SectionTitle subtitle="Achievements" title="Memory Badges" />
        <div className="grid grid-cols-4 gap-2">
          {memoryBadges.map((badge) => (
            <BadgeTile key={badge.id} badge={badge} onClick={() => handleBadgeClick(badge)} />
          ))}
        </div>
        <p className="font-system mt-4 text-center text-text-light">
          BADGES {memoryBadges.length}/{memoryBadges.length}
        </p>
      </section>
      <BadgeDetailModal badge={activeBadge} onClose={() => setActiveBadge(null)} />
    </SectionWrapper>
  );
}
