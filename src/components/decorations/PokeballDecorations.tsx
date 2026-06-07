"use client";

const items = [
  { className: "left-[6%] top-[10%] animate-float", content: "⚪" },
  { className: "right-[8%] top-[15%] animate-float text-poke-red", content: "●" },
  { className: "left-[10%] top-[40%] animate-sparkle", content: "✦" },
  { className: "right-[5%] top-[55%] animate-float", content: "☁" },
  { className: "left-[8%] top-[75%] animate-sparkle text-primary-yellow", content: "★" },
];

export function PokeballDecorations() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] mx-auto max-w-[430px]" aria-hidden>
      {items.map((item, i) => (
        <span key={i} className={`absolute text-xl opacity-50 ${item.className}`}>
          {item.content}
        </span>
      ))}
    </div>
  );
}
