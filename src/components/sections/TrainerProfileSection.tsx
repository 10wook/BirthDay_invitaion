"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { registerGsapPlugins } from "@/lib/gsap";
import { trainerConfig } from "@/config/trainer";
import { siteConfig } from "@/config/site";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
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
        <div data-profile className="mb-5 flex items-center gap-4 rounded-2xl bg-[#F9FAFB] p-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-2 ring-[#FFCB05]">
            <Image
              src={siteConfig.profileImageSrc}
              alt={trainerConfig.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div>
            <p className="font-display text-xl font-bold">{trainerConfig.nameKo}</p>
            <p className="text-sm text-text-light">{trainerConfig.type}</p>
          </div>
        </div>
        <div data-profile className="mb-4 grid grid-cols-2 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-[#F9FAFB] px-3 py-2.5">
              <p className="text-[10px] font-bold uppercase tracking-wide text-text-light">{s.label}</p>
              <p className="mt-0.5 text-sm font-bold text-text">{s.value}</p>
            </div>
          ))}
        </div>
        <div data-profile className="space-y-3">
          <StatBar label="HP" value={trainerConfig.hp} color="hp" />
          <StatBar label="EXP" value={trainerConfig.exp} color="exp" />
        </div>
        <div data-profile className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-[#FFCB05]/20 px-3 py-3 text-center">
            <p className="text-[10px] font-bold text-text-light">BADGES</p>
            <p className="font-display text-lg font-bold">
              {trainerConfig.badgeCount}/{trainerConfig.badgeCount}
            </p>
          </div>
          <div className="rounded-xl bg-[#3B4CCA]/10 px-3 py-3 text-center">
            <p className="text-[10px] font-bold text-text-light">PARTY</p>
            <p className="font-display text-lg font-bold">
              {trainerConfig.partyCount}/{trainerConfig.partyCount}
            </p>
          </div>
        </div>
        <p
          data-profile
          className="mt-4 rounded-full bg-[#3B4CCA] py-2.5 text-center text-xs font-bold text-white"
        >
          POKÉDEX ENTRY COMPLETE
        </p>
      </section>
    </SectionWrapper>
  );
}
