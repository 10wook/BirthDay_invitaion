"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { registerGsapPlugins } from "@/lib/gsap";
import { trainerConfig } from "@/config/trainer";
import { siteConfig } from "@/config/site";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { DexCard } from "@/components/ui/DexCard";
import { StatBar } from "@/components/ui/StatBar";
const stats = [
  { label: "Name", value: trainerConfig.name },
  { label: "Trainer No.", value: trainerConfig.trainerNo },
  { label: "Region", value: trainerConfig.region },
  { label: "Class", value: trainerConfig.trainerClass },
  { label: "Type", value: trainerConfig.type },
  { label: "Level", value: `Lv.${trainerConfig.level}` },
  { label: "Birthday", value: trainerConfig.birthday },
  { label: "Trainer Rank", value: trainerConfig.rank },
];

export function TrainerProfileSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.from(section.querySelectorAll("[data-profile]"), {
        y: 25,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="trainer-profile">
      <section ref={sectionRef}>
        <SectionTitle subtitle="Trainer Data" title="Trainer Profile" />
        <DexCard>
          <div data-profile className="mb-4 flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden border-[3px] border-dex-border bg-[#C8F0C0]">
              <Image
                src={siteConfig.profileImageSrc}
                alt={trainerConfig.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div>
              <p className="font-display text-xl">{trainerConfig.nameKo}</p>
              <p className="font-system text-[8px] text-game-blue">{trainerConfig.type.toUpperCase()}</p>
            </div>
          </div>
          <div data-profile className="mb-4 grid grid-cols-2 gap-2">
            {stats.map((s) => (
              <div key={s.label} className="game-window border-2 p-2 shadow-[inset_0_0_0_2px_#fff,2px_2px_0_#383838]">
                <p className="font-system text-[7px] text-text-light">{s.label.toUpperCase()}</p>
                <p className="text-sm font-bold text-text">{s.value}</p>
              </div>
            ))}
          </div>
          <div data-profile className="space-y-3">
            <StatBar label="HP" value={trainerConfig.hp} color="hp" />
            <StatBar label="EXP" value={trainerConfig.exp} color="exp" />
          </div>
          <div data-profile className="mt-4 grid grid-cols-2 gap-2">
            <div className="game-window border-2 p-3 text-center shadow-[inset_0_0_0_2px_#fff,2px_2px_0_#383838]">
              <p className="font-system text-[7px] text-text-light">BADGES</p>
              <p className="font-display text-lg">
                {trainerConfig.badgeCount}/{trainerConfig.badgeCount}
              </p>
            </div>
            <div className="game-window border-2 p-3 text-center shadow-[inset_0_0_0_2px_#fff,2px_2px_0_#383838]">
              <p className="font-system text-[7px] text-text-light">PARTY</p>
              <p className="font-display text-lg">
                {trainerConfig.partyCount}/{trainerConfig.partyCount}
              </p>
            </div>
          </div>
          <p
            data-profile
            className="font-system mt-4 border-[3px] border-dex-border bg-primary-yellow py-2 text-center text-poke-red shadow-[inset_0_0_0_2px_#fff,3px_3px_0_#383838]"
          >
            ■ POKÉDEX ENTRY COMPLETE
          </p>
        </DexCard>
      </section>
    </SectionWrapper>
  );
}
