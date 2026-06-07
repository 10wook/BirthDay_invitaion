"use client";

const SPARKLES = [
  { top: "15%", left: "10%", delay: "0s" },
  { top: "25%", left: "85%", delay: "0.5s" },
  { top: "60%", left: "15%", delay: "1s" },
  { top: "70%", left: "80%", delay: "1.5s" },
  { top: "40%", left: "50%", delay: "0.8s" },
  { top: "85%", left: "40%", delay: "2s" },
];

export function SparkleField() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="animate-sparkle absolute text-lg text-primary-yellow"
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}
