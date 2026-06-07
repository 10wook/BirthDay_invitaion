"use client";

const decorations = [
  { emoji: "🎈", className: "left-[8%] top-[12%] text-2xl animate-float", delay: "0s" },
  { emoji: "💕", className: "right-[10%] top-[18%] text-xl animate-heart", delay: "0.5s" },
  { emoji: "⭐", className: "left-[15%] top-[35%] text-lg animate-sparkle", delay: "1s" },
  { emoji: "☁️", className: "right-[5%] top-[45%] text-2xl animate-cloud", delay: "0s" },
  { emoji: "🎀", className: "left-[5%] top-[60%] text-xl animate-float-slow", delay: "1.5s" },
  { emoji: "✨", className: "right-[12%] top-[70%] text-base animate-sparkle", delay: "0.8s" },
  { emoji: "🎈", className: "right-[20%] top-[85%] text-xl animate-float", delay: "2s" },
  { emoji: "💖", className: "left-[12%] top-[88%] text-lg animate-heart", delay: "1.2s" },
];

export function FloatingDecorations() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] mx-auto max-w-[430px] overflow-hidden"
      aria-hidden="true"
    >
      {decorations.map((item, i) => (
        <span
          key={i}
          className={`absolute opacity-60 ${item.className}`}
          style={{ animationDelay: item.delay }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
}
