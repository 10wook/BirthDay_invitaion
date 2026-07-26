"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useAudio } from "@/components/audio/useAudio";
import { siteConfig } from "@/config/site";
import { getStarterChoicesByDuelId, type StarterChoice } from "@/config/starters";
import { pickRandomDuelId } from "@/config/legendaryDuels";
import { TypeBadge } from "@/components/ui/TypeBadge";
import { PokemonSprite } from "@/components/ui/PokemonSprite";
import { GameTextBox } from "@/components/ui/GameTextBox";
import { cn } from "@/lib/utils";

const SESSION_KEY = "legendary_duel_id";

const TRAINER_SLUGS: Record<number, string> = {
  1: "red",   2: "ethan",   3: "brendan", 4: "lucas",  5: "hilbert",
  6: "calem", 7: "elio",    8: "victor",  9: "florian-s",
};

const TRAINER_NAMES: Record<number, string> = {
  1: "레드",   2: "에단",   3: "브랜든",  4: "루카스",  5: "힐버트",
  6: "칼렘",  7: "엘리오", 8: "빅토르",  9: "플로리안",
};

export function StarterSelect() {
  const [duelId, setDuelId] = useState(1);
  const [selected, setSelected] = useState<StarterChoice | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { playSfx, playCry, unlock, hasConsented } = useAudio();

  const backdropRef    = useRef<HTMLDivElement>(null);
  const trainerWrapRef = useRef<HTMLDivElement>(null);
  const trainerImgRef  = useRef<HTMLImageElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    const id = stored ? Number.parseInt(stored, 10) : pickRandomDuelId();
    if (!stored) sessionStorage.setItem(SESSION_KEY, String(id));
    setDuelId(Number.isNaN(id) ? 1 : id);
  }, []);

  // 시네마틱 등장: 동의 후 + 마운트 후에만 실행
  useEffect(() => {
    if (!mounted || !hasConsented) return;

    requestAnimationFrame(() => {
      const wrap     = trainerWrapRef.current;
      const backdrop = backdropRef.current;
      if (!wrap) return;

      const rect   = wrap.getBoundingClientRect();
      const deltaX = window.innerWidth  / 2 - (rect.left + rect.width  / 2);
      const deltaY = window.innerHeight / 2 - (rect.top  + rect.height / 2);
      const BIG    = 3.5;

      const tl = gsap.timeline();

      // 1. 배경 어둡게
      if (backdrop) {
        tl.to(backdrop, { opacity: 1, duration: 0.2 });
      }

      // 2. 중앙에 크게 등장
      tl.fromTo(
        wrap,
        { x: deltaX, y: deltaY, scale: BIG, opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" },
        backdrop ? "-=0.05" : 0,
      );

      // 3. 잠깐 보여주기
      tl.to(wrap, { duration: 0.55 });

      // 4. 배경 페이드아웃 + 도트 계단 축소
      if (backdrop) {
        tl.to(backdrop, { opacity: 0, duration: 0.35 }, "shrink");
      }
      tl.to(
        wrap,
        { x: 0, y: 0, scale: 1, duration: 0.45, ease: "steps(8)" },
        "shrink",
      );
    });
  }, [mounted, hasConsented]);

  const starterChoices = getStarterChoicesByDuelId(duelId);

  const choose = (starter: StarterChoice) => {
    unlock();
    setSelected(starter);
    playCry(starter.name, starter.dexNo);
    playSfx(starter.sfx ?? "CLICK");
  };

  // 참여 확정: 같은 탭에서 구글 폼으로 바로 이동
  const confirm = () => {
    if (!selected || confirming) return;
    unlock();
    playSfx("CONFIRM");
    setConfirming(true);
    window.location.href = siteConfig[selected.rsvpUrlKey];
  };

  const trainerSlug = TRAINER_SLUGS[duelId] ?? "red";
  const trainerName = TRAINER_NAMES[duelId] ?? "레드";

  return (
    <>
      <div className="space-y-4">
        <GameTextBox label={`박사 · ${duelId}세대`}>
          파트너 포켓몬을 선택하고 생일 모험에 참여하세요!
        </GameTextBox>

        <div className="starter-stage grid grid-cols-3 gap-2 p-3">
          {starterChoices.map((starter) => {
            const isActive = selected?.id === starter.id;
            return (
              <button
                key={starter.id}
                type="button"
                onClick={() => choose(starter)}
                className={cn("starter-slot", isActive && "is-selected")}
                aria-pressed={isActive}
              >
                {isActive && (
                  <span className="font-system absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] text-poke-red">
                    ▶
                  </span>
                )}
                <div className="flex h-14 items-end justify-center overflow-visible pb-0.5">
                  <PokemonSprite dexNo={starter.dexNo} name={starter.nameKo} size="sm" />
                </div>
                <p className="font-system mt-1 text-[7px] text-game-blue">
                  No.{String(starter.dexNo).padStart(3, "0")}
                </p>
                <p className="font-display text-xs font-bold leading-tight">{starter.nameKo}</p>
                <p className="font-system mt-1 text-[6px] leading-snug text-text-light">
                  {starter.choiceLabel}
                </p>
              </button>
            );
          })}
        </div>

        {selected ? (
          <div className="space-y-3">
            <GameTextBox showCursor={false}>{selected.flavorText}</GameTextBox>
            <div className="flex flex-wrap gap-1">
              {selected.types.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>
            <button
              type="button"
              onClick={confirm}
              disabled={confirming}
              className="font-system w-full min-h-[52px] rounded-md border-[3px] border-dex-border bg-primary-yellow text-text shadow-[inset_0_0_0_2px_#fff,inset_0_0_0_4px_#383838,4px_4px_0_#383838] active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-60"
            >
              ▶ {selected.nameKo}와 모험 시작!
            </button>
          </div>
        ) : (
          <p className="font-system text-center text-[8px] text-text-light">
            포켓몬을 선택하면 울음소리를 들을 수 있어요
          </p>
        )}
      </div>

      {mounted && createPortal(
        <>
          {/* 어두운 배경 오버레이 */}
          <div
            ref={backdropRef}
            className="fixed inset-0 z-[45] pointer-events-none bg-black/70 opacity-0"
          />

          {/* 주인공 스프라이트 */}
          <div
            ref={trainerWrapRef}
            className="fixed bottom-[130px] right-4 z-[46] pointer-events-none flex flex-col items-center gap-1"
            style={{ transformOrigin: "center center" }}
          >
            <p
              className="font-display text-base font-bold text-white"
              style={{ textShadow: "1px 1px 0 #383838, -1px 1px 0 #383838, 1px -1px 0 #383838, -1px -1px 0 #383838" }}
            >
              {trainerName}
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={trainerImgRef}
              src={`https://play.pokemonshowdown.com/sprites/trainers/${trainerSlug}.png`}
              alt={trainerName}
              width={96}
              height={96}
              style={{ imageRendering: "pixelated" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
        </>,
        document.body,
      )}
    </>
  );
}
