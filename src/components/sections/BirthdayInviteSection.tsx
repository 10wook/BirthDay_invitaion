"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { trainerConfig } from "@/config/trainer";

export function BirthdayInviteSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.from(section.querySelectorAll("[data-invite]"), {
        y: 30,
        opacity: 0,
        stagger: 0.18,
        duration: 0.9,
        ease: "power2.out",
        delay: 0.3,
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-[2] flex min-h-[100dvh] flex-col items-center justify-center px-4 py-16"
    >
      <div className="mx-auto w-full max-w-[380px] space-y-4">
        <div data-invite className="game-window border-2 border-poke-red bg-primary-yellow px-5 py-3 text-center shadow-[inset_0_0_0_2px_#fff,4px_4px_0_#383838]">
          <p className="font-system text-[9px] text-poke-red">■ SPECIAL INVITATION</p>
          <p className="font-display mt-1 text-2xl font-bold text-text">🎂 생일 파티 초대장 🎂</p>
        </div>

        <div data-invite className="game-textbox">
          <p className="font-display text-base leading-relaxed text-text">
            안녕하세요, 트레이너!
          </p>
          <p className="font-display mt-2 text-base leading-relaxed text-text">
            <span className="font-bold text-poke-red">{trainerConfig.nameKo}</span> 트레이너가
            레벨 <span className="font-bold text-game-blue">{trainerConfig.nextLevel}</span>로 진화하는
            특별한 날에 여러분을 초대합니다.
          </p>
          <span className="game-cursor">▼</span>
        </div>

        <div data-invite className="dex-card divide-y-2 divide-dex-border p-0 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3">
            <span className="text-2xl">📅</span>
            <div>
              <p className="font-system text-[7px] text-text-light">날짜</p>
              <p className="font-display font-bold">{siteConfig.eventDateDisplay}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3">
            <span className="text-2xl">⏰</span>
            <div>
              <p className="font-system text-[7px] text-text-light">시간</p>
              <p className="font-display font-bold">{siteConfig.eventTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3">
            <span className="text-2xl">📍</span>
            <div>
              <p className="font-system text-[7px] text-text-light">장소</p>
              <p className="font-display font-bold">{siteConfig.venueName}</p>
            </div>
          </div>
        </div>

        <div data-invite className="game-textbox">
          <p className="font-display text-sm leading-relaxed text-text">
            오셔서 함께 축하해 주세요!<br />
            스크롤을 내려 더 많은 이야기를 확인하세요 ✨
          </p>
          <span className="game-cursor">▼</span>
        </div>
      </div>
    </section>
  );
}
