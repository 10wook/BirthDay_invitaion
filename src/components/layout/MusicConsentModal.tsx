"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useAudio } from "@/components/audio/useAudio";

interface MusicConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const CHATOT_SPRITE = "https://play.pokemonshowdown.com/sprites/gen4/chatot.png";

const STEPS = [
  "야생의 페라페가\n나타났다!",
  "페라페가 노래를\n들려주려고 한다.",
  "노래를 들으시겠습니까?",
] as const;

export function MusicConsentModal({ isOpen, onAccept, onDecline }: MusicConsentModalProps) {
  const { playSfx, unlock } = useAudio();
  const [mounted, setMounted] = useState(false);
  const [flash, setFlash] = useState(false);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [cursor, setCursor] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!isOpen) {
      setFlash(false);
      setVisible(false);
      setStep(0);
      setShowMenu(false);
      setCursor(0);
      return;
    }
    // white flash → scene
    setFlash(true);
    const t1 = setTimeout(() => { setFlash(false); setVisible(true); }, 300);
    const t2 = setTimeout(() => setStep(1), 700);
    const t3 = setTimeout(() => setStep(2), 2300);
    const t4 = setTimeout(() => { setStep(3); setShowMenu(true); }, 3700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [isOpen]);

  const handleAccept = () => {
    unlock();
    playSfx("CONFIRM");
    onAccept();
  };

  const handleDecline = () => {
    unlock();
    playSfx("CLICK");
    onDecline();
  };

  if (!mounted || !isOpen) return null;

  const dialogText = step === 1 ? STEPS[0] : step === 2 ? STEPS[1] : step >= 3 ? STEPS[2] : "";

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      {/* White flash entrance */}
      {flash && <div className="absolute inset-0 bg-white z-10" />}

      {/* Battle scene */}
      <div
        className="absolute inset-0 flex flex-col"
        style={{
          background: "linear-gradient(180deg, #90c8e8 0%, #90c8e8 55%, #68a858 55%, #68a858 100%)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      >
        {/* Enemy platform + sprites */}
        <div className="relative flex-1">

          {/* Enemy HP box – slides in from left */}
          <div
            className="absolute left-3 top-4 w-[160px]"
            style={{
              transform: visible ? "translateX(0)" : "translateX(-110%)",
              transition: "transform 0.4s ease-out 0.1s",
            }}
          >
            <div className="rounded-xl border-[3px] border-[#383838] bg-white px-3 py-2 shadow-[3px_3px_0_#383838]">
              <div className="flex items-center justify-between">
                <span className="font-system text-[10px] font-bold text-text">페라페</span>
                <span className="font-system text-[9px] text-text-light">Lv.♪</span>
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="font-system text-[8px] font-bold text-text">HP</span>
                <div className="flex-1 h-[6px] rounded-full border border-[#606060] bg-[#d8d8d8] overflow-hidden">
                  <div className="h-full rounded-full bg-[#58d858]" style={{ width: "84%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Chatot sprite – slides in from right */}
          <div
            className="absolute right-4 top-2"
            style={{
              transform: visible ? "translateX(0)" : "translateX(130%)",
              transition: "transform 0.4s ease-out 0.1s",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CHATOT_SPRITE}
              alt="페라페"
              width={96}
              height={96}
              style={{ imageRendering: "pixelated", transform: "scale(2.2)", transformOrigin: "top right" }}
            />
          </div>

          {/* Enemy ground strip */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[18px]"
            style={{
              background: "linear-gradient(180deg, #4a9840 0%, #2a6820 100%)",
              borderTop: "3px solid #383838",
            }}
          />
        </div>

        {/* Player ground strip */}
        <div
          className="h-[22px]"
          style={{
            background: "linear-gradient(180deg, #58b048 0%, #387030 100%)",
            borderTop: "3px solid #383838",
            borderBottom: "3px solid #383838",
          }}
        />

        {/* Bottom: textbox area */}
        <div className="bg-[#e8e8e8] border-t-[4px] border-[#383838]" style={{ minHeight: "130px" }}>
          <div className="relative flex gap-2 p-2">

            {/* Dialogue box */}
            <div className="flex-1 rounded-lg border-[3px] border-[#a0a0a0] bg-white px-4 py-3 min-h-[90px] flex items-start">
              {step > 0 && (
                <p className="font-system text-[11px] leading-[1.8] text-text whitespace-pre-line">
                  {dialogText}
                  {step > 0 && step < 3 && <span className="animate-bounce inline-block ml-1 text-[9px]">▼</span>}
                </p>
              )}
            </div>

            {/* Battle menu */}
            {showMenu && (
              <div
                className="w-[130px] rounded-lg border-[3px] border-[#383838] bg-white shadow-[3px_3px_0_#383838] overflow-hidden self-start"
                style={{ animation: "fadeIn 0.15s ease-out" }}
              >
                <button
                  type="button"
                  onClick={() => { setCursor(0); handleAccept(); }}
                  onMouseEnter={() => setCursor(0)}
                  className="font-system w-full px-3 py-3 text-left text-[10px] font-bold text-text border-b-[2px] border-[#d0d0d0]"
                  style={{ background: cursor === 0 ? "#e8f8e8" : "white" }}
                >
                  {cursor === 0 ? "▶" : "　"} 음악 켜기
                </button>
                <button
                  type="button"
                  onClick={() => { setCursor(1); handleDecline(); }}
                  onMouseEnter={() => setCursor(1)}
                  className="font-system w-full px-3 py-3 text-left text-[10px] font-bold text-text"
                  style={{ background: cursor === 1 ? "#f8e8e8" : "white" }}
                >
                  {cursor === 1 ? "▶" : "　"} 괜찮아요
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>,
    document.body,
  );
}
