"use client";

const items = [
  { className: "left-[8%] top-[12%] h-16 w-16 rounded-full bg-[#FFCB05]/20", content: "" },
  { className: "right-[6%] top-[22%] h-10 w-10 rounded-full bg-[#3B4CCA]/15", content: "" },
  { className: "left-[12%] top-[55%] h-8 w-8 rounded-full bg-[#FFCB05]/15", content: "" },
  { className: "right-[10%] top-[68%] h-12 w-12 rounded-full bg-[#3B4CCA]/10", content: "" },
];

export function PokeballDecorations() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] mx-auto max-w-[430px]" aria-hidden>
      {items.map((item, i) => (
        <span key={i} className={`absolute animate-float ${item.className}`} style={{ animationDelay: `${i * 0.5}s` }} />
      ))}
    </div>
  );
}
