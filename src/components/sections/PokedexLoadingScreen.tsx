"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useAudio } from "@/components/audio/useAudio";
import { trainerConfig } from "@/config/trainer";
import { Button } from "@/components/ui/Button";

interface PokedexLoadingScreenProps {
  onComplete: () => void;
}

export function PokedexLoadingScreen({ onComplete }: PokedexLoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [progressDone, setProgressDone] = useState(false);
  const { unlock, playSfx } = useAudio();

  useEffect(() => {
    const messages = [
      "Scanning Trainer...",
      "Trainer Found",
      "Pokédex Entry Loaded",
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
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#EEF0F4] px-6"
    >
      <div className="promo-panel w-full max-w-[360px] p-6">
        <div className="mb-4 text-center">
          <span className="promo-label">POKÉDEX</span>
        </div>
        <div className="mb-4 h-2 overflow-hidden rounded-full bg-[#E5E7EB]">
          <div ref={barRef} className="h-full w-0 rounded-full bg-[#FFCB05]" />
        </div>
        <div className="min-h-[100px] space-y-2">
          {lines.map((line, idx) => (
            <p key={idx} className="text-sm text-text-light">
              {line}
            </p>
          ))}
        </div>
        {progressDone && (
          <div className="mt-6">
            <Button variant="primary" size="lg" sfx="none" onClick={handleStart}>
              시작하기 →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
