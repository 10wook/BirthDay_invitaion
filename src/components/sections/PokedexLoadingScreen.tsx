"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useAudio } from "@/components/audio/useAudio";
import { trainerConfig } from "@/config/trainer";
import { Button } from "@/components/ui/Button";
import { PokeballIcon } from "@/components/ui/PokeballIcon";

interface PokedexLoadingScreenProps {
  onComplete: () => void;
}

export function PokedexLoadingScreen({ onComplete }: PokedexLoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [progressDone, setProgressDone] = useState(false);
  const { unlock, playSfx } = useAudio();

  useEffect(() => {
    const messages = [
      "트레이너 스캔 중...",
      "██████████ 100%",
      "트레이너 발견",
      "포켓몬 도감 등록 완료",
      `No.${trainerConfig.trainerNo}`,
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setLines((prev) => [...prev, messages[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 550);

    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        width: "100%",
        duration: 2.5,
        ease: "power2.inOut",
        onComplete: () => setProgressDone(true),
      });
      gsap.to(scanRef.current, {
        y: "200%",
        duration: 0.8,
        repeat: -1,
        ease: "none",
      });
    });

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, []);

  const handleStart = () => {
    unlock();
    playSfx("START");
    sessionStorage.setItem("pokedex_loaded", "1");
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete,
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#7ecbff] px-6"
    >
      <div className="dex-screen scan-lines relative w-full max-w-[360px] overflow-hidden p-6">
        <div
          ref={scanRef}
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-2 bg-gradient-to-b from-transparent via-[#78C850]/80 to-transparent"
        />
        <div className="mb-4 flex items-center justify-center gap-2">
          <PokeballIcon size={18} />
          <p className="font-system text-center text-[10px] text-game-blue">포켓몬 도감</p>
        </div>
        <div className="mb-4 h-4 overflow-hidden border-2 border-dex-border bg-[#383838] p-0.5">
          <div ref={barRef} className="h-full w-0 bg-[#78C850]" />
        </div>
        <div className="min-h-[120px] space-y-2">
          {lines.map((line, idx) => (
            <p
              key={idx}
              className={idx === 0 ? "font-system text-[8px] text-text" : "text-sm text-text"}
            >
              {line}
            </p>
          ))}
        </div>
        {progressDone && (
          <div className="mt-6 animate-pulse">
            <Button variant="primary" size="lg" sfx="none" onClick={handleStart}>
              ▶ 시작하기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
