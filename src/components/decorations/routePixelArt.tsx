import type { CSSProperties } from "react";

type PixelProps = { className?: string; style?: CSSProperties };

/** 하늘 구름 — 배경 전용 SVG (게임 타일셋에 구름 오브젝트 없음) */
export function PixelCloud({ className, style }: PixelProps) {
  return (
    <svg
      viewBox="0 0 56 28"
      className={className}
      style={style}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <rect x="16" y="4" width="8" height="4" fill="#eef8ff" />
      <rect x="24" y="0" width="8" height="4" fill="#ffffff" />
      <rect x="32" y="4" width="8" height="4" fill="#eef8ff" />
      <rect x="8" y="8" width="8" height="4" fill="#dceef8" />
      <rect x="16" y="8" width="24" height="4" fill="#ffffff" />
      <rect x="40" y="8" width="8" height="4" fill="#eef8ff" />
      <rect x="4" y="12" width="48" height="4" fill="#ffffff" />
      <rect x="8" y="16" width="40" height="4" fill="#f4fbff" />
      <rect x="12" y="20" width="32" height="4" fill="#eef8ff" />
      <rect x="20" y="24" width="16" height="4" fill="#dceef8" />
    </svg>
  );
}

export function PixelCloudSmall({ className, style }: PixelProps) {
  return (
    <svg viewBox="0 0 32 16" className={className} style={style} shapeRendering="crispEdges" aria-hidden>
      <rect x="8" y="2" width="8" height="4" fill="#ffffff" />
      <rect x="16" y="0" width="8" height="4" fill="#f4fbff" />
      <rect x="4" y="6" width="24" height="4" fill="#ffffff" />
      <rect x="8" y="10" width="16" height="4" fill="#eef8ff" />
      <rect x="12" y="14" width="8" height="2" fill="#dceef8" />
    </svg>
  );
}
