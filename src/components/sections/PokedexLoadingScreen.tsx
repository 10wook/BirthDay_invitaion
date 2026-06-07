"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { trainerConfig } from "@/config/trainer";

interface PokedexLoadingScreenProps {
  onComplete: () => void;
}

export function PokedexLoadingScreen({ onComplete }: PokedexLoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const messages = [
      "Scanning Trainer...",
      "Trainer Found!",
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
    }, 600);

    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        width: "100%",
        duration: 2.2,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            delay: 0.4,
            onComplete,
          });
        },
      });
    });

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-cream px-6"
    >
      <div className="dex-screen w-full max-w-[360px] p-6">
        <p className="font-display mb-4 text-center text-lg text-text">
          POKÉDEX
        </p>
        <div className="mb-4 h-4 overflow-hidden rounded-full border-2 border-dex-border bg-white">
          <div
            ref={barRef}
            className="h-full w-0 rounded-full bg-grass-green"
          />
        </div>
        <div ref={textRef} className="min-h-[100px] space-y-2 font-mono text-sm text-text">
          {lines.map((line, idx) => (
            <p key={idx} className="animate-pulse">{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
