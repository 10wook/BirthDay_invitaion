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
  { label: "이름", value: trainerConfig.nameKo },
  { label: "트레이너 번호", value: trainerConfig.trainerNo },
  { label: "지역", value: trainerConfig.region },
  { label: "직업", value: trainerConfig.trainerClass },
  { label: "타입", value: trainerConfig.type },
  { label: "레벨", value: `Lv.${trainerConfig.level}` },
  { label: "생일", value: trainerConfig.birthdayDisplay },
  { label: "랭크", value: trainerConfig.rank },
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
        <SectionTitle subtitle="트레이너 데이터" title="트레이너 프로필" />
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
                <p className="font-system text-[7px] text-text-light">{s.label}</p>
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
              <p className="font-system text-[7px] text-text-light">배지</p>
              <p className="font-display text-lg">
                {trainerConfig.badgeCount}/{trainerConfig.badgeCount}
              </p>
            </div>
            <div className="game-window border-2 p-3 text-center shadow-[inset_0_0_0_2px_#fff,2px_2px_0_#383838]">
              <p className="font-system text-[7px] text-text-light">파티</p>
              <p className="font-display text-lg">
                {trainerConfig.partyCount}/{trainerConfig.partyCount}
              </p>
            </div>
          </div>
          <p
            data-profile
            className="font-system mt-4 border-[3px] border-dex-border bg-primary-yellow py-2 text-center text-poke-red shadow-[inset_0_0_0_2px_#fff,3px_3px_0_#383838]"
          >
            ■ 포켓몬 도감 등록 완료
          </p>
        </DexCard>
      </section>
    </SectionWrapper>
  );
}
