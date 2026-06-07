"use client";

const items = [
  { className: "left-[6%] top-[10%] animate-float text-lg", content: "⚪" },
  { className: "right-[8%] top-[15%] animate-float text-poke-red text-lg", content: "●" },
  { className: "left-[10%] top-[40%] animate-sparkle font-system text-[8px] text-game-blue", content: "★" },
  { className: "right-[5%] top-[55%] animate-float text-xl opacity-40", content: "☁" },
  { className: "left-[8%] top-[75%] animate-sparkle font-system text-[8px] text-primary-yellow", content: "◆" },
];

export function PokeballDecorations() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] mx-auto max-w-[430px]" aria-hidden>
      {items.map((item, i) => (
        <span key={i} className={`absolute opacity-60 ${item.className}`}>
          {item.content}
        </span>
      ))}
    </div>
  );
}
