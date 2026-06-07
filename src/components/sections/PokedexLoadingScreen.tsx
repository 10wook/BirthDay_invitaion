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
  const scanRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [progressDone, setProgressDone] = useState(false);
  const { unlock, playSfx } = useAudio();

  useEffect(() => {
    const messages = [
      "Scanning Trainer...",
      "██████████ 100%",
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
      gsap.to(scanRef.current, {
        y: "200%",
        duration: 1.2,
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
      className="fixed inset-0 z-[200] flex items-center justify-center bg-cream px-6"
    >
      <div className="dex-screen relative w-full max-w-[360px] overflow-hidden p-6">
        <div
          ref={scanRef}
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-grass-green/60"
        />
        <p className="font-display mb-4 text-center text-lg text-text">POKÉDEX</p>
        <div className="mb-4 h-4 overflow-hidden rounded-full border-2 border-dex-border bg-white">
          <div ref={barRef} className="h-full w-0 rounded-full bg-grass-green" />
        </div>
        <div className="min-h-[120px] space-y-2">
          {lines.map((line, idx) => (
            <p
              key={idx}
              className={idx === 0 ? "font-system text-xs text-text" : "text-sm text-text"}
            >
              {line}
            </p>
          ))}
        </div>
        {progressDone && (
          <div className="mt-6 animate-pulse">
            <Button variant="primary" size="lg" sfx="none" onClick={handleStart}>
              ▶ PRESS START
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
