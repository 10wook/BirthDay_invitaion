"use client";

import { createPortal } from "react-dom";
import { useEffect, useState, useRef } from "react";
import { useAudio } from "@/components/audio/useAudio";

interface MusicConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const CHATOT_SPRITE = "https://play.pokemonshowdown.com/sprites/gen5ani/chatot.gif";

const DIALOGUE: string[] = [
  "야생의 페라페가 나타났다!",
  "페라페가 노래를\n들려주려고 한다.",
  "노래를 들으시겠습니까?",
];

function useTypewriter(text: string, speed = 35) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    if (!text) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return displayed;
}

export function MusicConsentModal({ isOpen, onAccept, onDecline }: MusicConsentModalProps) {
  const { playSfx, unlock } = useAudio();
  const [mounted, setMounted] = useState(false);
  const [flash, setFlash] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dialogIdx, setDialogIdx] = useState(-1);
  const [showMenu, setShowMenu] = useState(false);
  const [cursor, setCursor] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!isOpen) {
      setFlash(false); setVisible(false);
      setDialogIdx(-1); setShowMenu(false);
      setCursor(0); doneRef.current = false;
      return;
    }
    doneRef.current = false;
    unlock();
    playSfx("START");
    setFlash(true);
    const t1 = setTimeout(() => { setFlash(false); setVisible(true); }, 350);
    const t2 = setTimeout(() => setDialogIdx(0), 750);
    const t3 = setTimeout(() => setDialogIdx(1), 2400);
    const t4 = setTimeout(() => { setDialogIdx(2); setShowMenu(true); }, 3900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const currentText = dialogIdx >= 0 ? DIALOGUE[dialogIdx] : "";
  const typed = useTypewriter(currentText, 38);

  const handleAccept = () => { unlock(); playSfx("CONFIRM"); onAccept(); };
  const handleDecline = () => { unlock(); playSfx("CLICK"); onDecline(); };

  if (!mounted || !isOpen) return null;

  const isDone = typed.length >= currentText.length && currentText.length > 0;

  return createPortal(
    <>
      <style>{`
        @keyframes floatNote1 {
          0%   { transform: translate(0,0) scale(1); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translate(-18px,-38px) scale(0.6); opacity: 0; }
        }
        @keyframes floatNote2 {
          0%   { transform: translate(0,0) scale(1); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translate(12px,-44px) scale(0.5); opacity: 0; }
        }
        @keyframes floatNote3 {
          0%   { transform: translate(0,0) scale(1); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translate(-8px,-52px) scale(0.7); opacity: 0; }
        }
        @keyframes slideMenu { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes flashWhite { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .note-1 { animation: floatNote1 1.8s ease-out infinite; animation-delay: 0s; }
        .note-2 { animation: floatNote2 1.8s ease-out infinite; animation-delay: 0.6s; }
        .note-3 { animation: floatNote3 1.8s ease-out infinite; animation-delay: 1.2s; }
      `}</style>

      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Flash overlay */}
        {flash && (
          <div className="absolute inset-0 z-20 bg-white" style={{ animation: "flashWhite 0.35s ease-out forwards" }} />
        )}

        {/* Modal */}
        <div
          className="relative w-full max-w-[420px] overflow-hidden rounded-2xl border-[4px] border-[#2c2c2c] shadow-[0_8px_0_#000,0_0_0_2px_#fff]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1) translateY(0)" : "scale(0.92) translateY(12px)",
            transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
          }}
        >

          {/* ── Battle field ── */}
          <div className="relative overflow-hidden" style={{ height: 220 }}>

            {/* Sky gradient with subtle banding */}
            <div className="absolute inset-0" style={{
              background: "linear-gradient(180deg, #b8e0f8 0%, #a0d0f0 30%, #c0e8a0 68%, #78b858 68%, #5a9840 100%)",
            }} />

            {/* Subtle sky horizontal lines (Gen 4 aesthetic) */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: "repeating-linear-gradient(180deg, transparent 0px, transparent 6px, rgba(255,255,255,0.4) 6px, rgba(255,255,255,0.4) 7px)",
              backgroundSize: "100% 7px",
              height: "68%",
            }} />

            {/* Enemy grass island platform */}
            <div
              className="absolute"
              style={{
                bottom: "28%",
                right: "10%",
                width: 130,
                height: 28,
                background: "radial-gradient(ellipse 100% 100% at 50% 0%, #6ab84a 0%, #4a8830 60%, #305820 100%)",
                borderRadius: "50% 50% 40% 40% / 80% 80% 20% 20%",
                boxShadow: "0 4px 0 #2a5018, 0 6px 0 #1a3810",
              }}
            />

            {/* Player grass island platform (lower-left, larger) */}
            <div
              className="absolute"
              style={{
                bottom: "5%",
                left: "8%",
                width: 160,
                height: 34,
                background: "radial-gradient(ellipse 100% 100% at 50% 0%, #72c050 0%, #52a030 60%, #387020 100%)",
                borderRadius: "50% 50% 40% 40% / 80% 80% 20% 20%",
                boxShadow: "0 4px 0 #2a6018, 0 8px 0 #183808",
              }}
            />

            {/* Ground divider line */}
            <div className="absolute left-0 right-0 h-[3px] bg-[#2c2c2c]" style={{ bottom: "30%" }} />

            {/* Enemy HP box – slides in from left */}
            <div
              className="absolute"
              style={{
                left: 10, top: 14,
                width: 166,
                transform: visible ? "translateX(0)" : "translateX(-130%)",
                transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1) 0.1s",
              }}
            >
              <div
                className="rounded-xl bg-white px-3 py-2"
                style={{ border: "3px solid #2c2c2c", boxShadow: "3px 3px 0 #2c2c2c" }}
              >
                {/* Name row */}
                <div className="flex items-center justify-between">
                  <span className="font-system text-[10px] font-bold tracking-tight" style={{ color: "#1c1c1c" }}>페라페</span>
                  <span className="font-system text-[9px]" style={{ color: "#606060" }}>♂  Lv.<span className="text-poke-red">♪</span></span>
                </div>
                {/* Divider */}
                <div className="my-1.5 h-[2px] rounded-full bg-[#c0c0c0]" />
                {/* HP bar */}
                <div className="flex items-center gap-1.5">
                  <span className="font-system text-[8px] font-black" style={{ color: "#2c6c2c", minWidth: 14 }}>HP</span>
                  <div className="relative flex-1 h-[7px] rounded-full overflow-hidden" style={{ background: "#d0d0d0", border: "1.5px solid #808080" }}>
                    {/* HP bar fill with gradient */}
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "84%",
                        background: "linear-gradient(180deg, #70e050 0%, #48b830 100%)",
                        boxShadow: "inset 0 2px 0 rgba(255,255,255,0.4)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Chatot + floating notes – slides in from right */}
            <div
              className="absolute"
              style={{
                right: 16,
                bottom: "28%",
                transform: visible ? "translateX(0)" : "translateX(140%)",
                transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1) 0.1s",
              }}
            >
              {/* Music notes */}
              {visible && (
                <>
                  <span className="note-1 absolute font-bold text-poke-red" style={{ fontSize: 13, right: 60, top: 0 }}>♪</span>
                  <span className="note-2 absolute font-bold text-game-blue" style={{ fontSize: 11, right: 30, top: 10 }}>♩</span>
                  <span className="note-3 absolute font-bold" style={{ fontSize: 10, right: 50, top: 5, color: "#a040c0" }}>♫</span>
                </>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CHATOT_SPRITE}
                alt="페라페"
                width={80}
                height={80}
                style={{ imageRendering: "pixelated", transform: "scale(2)", transformOrigin: "bottom center", display: "block" }}
              />
            </div>
          </div>

          {/* ── Textbox area (Gen 4 style) ── */}
          <div style={{ background: "#e0e0d8", borderTop: "4px solid #2c2c2c" }}>
            <div className="flex gap-2 p-2.5">

              {/* Dialogue box */}
              <div
                className="flex-1 flex flex-col justify-between"
                style={{
                  background: "#f8f8f0",
                  border: "3px solid #909088",
                  borderRadius: 8,
                  padding: "10px 14px",
                  minHeight: 88,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), 2px 2px 0 #b0b0a8",
                }}
              >
                <p className="font-system whitespace-pre-line" style={{ fontSize: 12, lineHeight: 1.9, color: "#181818", minHeight: 46 }}>
                  {typed}
                  {isDone && dialogIdx < 2 && (
                    <span className="inline-block animate-bounce ml-1" style={{ fontSize: 9 }}>▼</span>
                  )}
                </p>
              </div>

              {/* Battle command menu */}
              {showMenu && (
                <div
                  style={{
                    width: 126,
                    background: "#f8f8f0",
                    border: "3px solid #2c2c2c",
                    borderRadius: 10,
                    overflow: "hidden",
                    boxShadow: "3px 3px 0 #2c2c2c",
                    alignSelf: "center",
                    animation: "slideMenu 0.18s ease-out",
                  }}
                >
                  {/* Menu header */}
                  <div style={{ background: "#2c2c2c", padding: "4px 10px" }}>
                    <span className="font-system" style={{ fontSize: 8, color: "#f0f0e8", letterSpacing: 1 }}>ANSWER</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setCursor(0); handleAccept(); }}
                    onMouseEnter={() => setCursor(0)}
                    className="font-system w-full text-left font-bold"
                    style={{
                      padding: "10px 12px",
                      fontSize: 11,
                      background: cursor === 0 ? "#d0f0d0" : "#f8f8f0",
                      borderBottom: "2px solid #d0d0c8",
                      color: "#181818",
                    }}
                  >
                    <span style={{ marginRight: 4 }}>{cursor === 0 ? "▶" : "　"}</span>음악 켜기
                  </button>
                  <button
                    type="button"
                    onClick={() => { setCursor(1); handleDecline(); }}
                    onMouseEnter={() => setCursor(1)}
                    className="font-system w-full text-left font-bold"
                    style={{
                      padding: "10px 12px",
                      fontSize: 11,
                      background: cursor === 1 ? "#f0d0d0" : "#f8f8f0",
                      color: "#181818",
                    }}
                  >
                    <span style={{ marginRight: 4 }}>{cursor === 1 ? "▶" : "　"}</span>괜찮아요
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>,
    document.body,
  );
}
