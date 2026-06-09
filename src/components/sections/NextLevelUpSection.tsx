"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import dynamic from "next/dynamic";
import { registerGsapPlugins } from "@/lib/gsap";
import { useAudio } from "@/components/audio/useAudio";
import { useCountdown } from "@/hooks/useCountdown";
import { trainerConfig } from "@/config/trainer";
import { siteConfig } from "@/config/site";
import { padZero } from "@/lib/utils";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBar } from "@/components/ui/StatBar";

const units = [
  { key: "days", label: "일" },
  { key: "hours", label: "시간" },
  { key: "minutes", label: "분" },
  { key: "seconds", label: "초" },
] as const;

function NextLevelDisplay() {
  const gridRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);
  const { playSfx } = useAudio();
  const { days, hours, minutes, seconds, isPast } = useCountdown(siteConfig.eventDate);
  const values = { days, hours, minutes, seconds };

  useEffect(() => {
    registerGsapPlugins();
    const grid = gridRef.current;
    if (!grid) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-lvl]", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
          onEnter: () => {
            if (playedRef.current) return;
            playedRef.current = true;
            playSfx("LEVEL_UP");
            if (flashRef.current) {
              gsap.fromTo(
                flashRef.current,
                { opacity: 0.5 },
                { opacity: 0, duration: 0.8, ease: "power2.out" },
              );
            }
          },
        },
      });
    }, grid);
    return () => ctx.revert();
  }, [playSfx]);

  return (
    <div ref={gridRef} className="relative">
      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl bg-primary-yellow opacity-0"
      />
      <div data-lvl className="mb-6 flex items-center justify-center gap-4">
        <div className="dex-card px-6 py-3 text-center">
          <p className="font-system text-text-light">현재</p>
          <p className="font-display text-3xl">Lv.{trainerConfig.level}</p>
        </div>
        <span className="animate-bounce text-2xl">↓</span>
        <div className="dex-card border-poke-red px-6 py-3 text-center">
          <p className="font-system text-poke-red">다음</p>
          <p className="font-display text-3xl text-poke-red">Lv.{trainerConfig.nextLevel}</p>
        </div>
      </div>
      {!isPast ? (
        <div className="grid grid-cols-2 gap-3">
          {units.map(({ key, label }) => (
            <div key={key} className="dex-card py-4 text-center">
              <AnimatePresence mode="popLayout">
                <motion.p key={values[key]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display text-3xl">
                  {padZero(values[key])}
                </motion.p>
              </AnimatePresence>
              <p className="text-xs font-bold text-text-light">{label}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center font-bold text-poke-red">레벨업 준비 완료!</p>
      )}
      <div className="mt-6">
        <StatBar label="다음 레벨까지 EXP" value={trainerConfig.exp} color="exp" />
      </div>

      {/* 생일 파티 초대 */}
      <div className="mt-8 space-y-4">
        <div className="game-window border-2 border-poke-red bg-primary-yellow px-4 py-3 text-center shadow-[inset_0_0_0_2px_#fff,3px_3px_0_#383838]">
          <p className="font-display text-lg font-bold text-poke-red">🎉 생일 파티 초대장 🎉</p>
        </div>

        <div className="game-textbox">
          <p className="font-display text-base leading-relaxed text-text">
            트레이너 <span className="font-bold text-poke-red">{trainerConfig.nameKo}</span>가
            드디어 <span className="font-bold text-game-blue">Lv.{trainerConfig.nextLevel}</span>로 진화합니다!
          </p>
          <p className="mt-2 font-display text-sm text-text-light">
            이 특별한 순간을 함께 축하해 주세요.
          </p>
          <span className="game-cursor">▼</span>
        </div>

        <div className="dex-card space-y-3 p-4">
          <div className="flex items-start gap-3 border-b-2 border-dex-border pb-3">
            <span className="text-xl">📅</span>
            <div>
              <p className="font-system text-[8px] text-text-light">날짜</p>
              <p className="font-display font-bold">{siteConfig.eventDateDisplay}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 border-b-2 border-dex-border pb-3">
            <span className="text-xl">⏰</span>
            <div>
              <p className="font-system text-[8px] text-text-light">시간</p>
              <p className="font-display font-bold">{siteConfig.eventTime}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">📍</span>
            <div>
              <p className="font-system text-[8px] text-text-light">장소</p>
              <p className="font-display font-bold">{siteConfig.venueName}</p>
              <p className="font-display text-sm text-text-light">{siteConfig.address}</p>
            </div>
          </div>
        </div>

        <div className="game-textbox">
          <p className="font-display text-sm leading-relaxed text-text">
            전설의 트레이너들만 받는 초대장입니다.
            함께해 주신다면 최고의 모험이 될 거예요!
          </p>
          <p className="mt-2 font-display text-sm font-bold text-poke-red">
            당신도 이 모험에 합류하지 않겠습니까? ✨
          </p>
          <span className="game-cursor">▼</span>
        </div>

        <div className="game-window border-2 border-dex-border bg-[#C8F0C0] px-4 py-3 text-center shadow-[inset_0_0_0_2px_#fff,3px_3px_0_#383838]">
          <p className="font-system text-[8px] text-game-blue">■ SPECIAL EVENT</p>
          <p className="font-display mt-1 text-base font-bold text-text">
            참석하시면 한정판 선물 증정!
          </p>
          <p className="font-display mt-1 text-xs text-text-light">
            선착순 · 수량 한정
          </p>
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return <div className="grid grid-cols-2 gap-3">{[1,2,3,4].map(i => <div key={i} className="dex-card h-20 animate-pulse" />)}</div>;
}

const NextLevelDisplayClient = dynamic(() => Promise.resolve({ default: NextLevelDisplay }), { ssr: false, loading: () => <Skeleton /> });

export function NextLevelUpSection() {
  return (
    <SectionWrapper id="next-level">
      <SectionTitle subtitle="카운트다운" title="다음 레벨업" />
      <NextLevelDisplayClient />
      <p className="mt-4 text-center text-sm text-text-light">{siteConfig.eventDateDisplay}</p>
    </SectionWrapper>
  );
}
