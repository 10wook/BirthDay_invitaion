import type { CSSProperties } from "react";

type PixelProps = { className?: string; style?: CSSProperties };

/**
 * 포켓몬 FRLG 스타일 큰 나무
 * 둥근 왕관, 3단 초록 레이어, 갈색 기둥
 */
export function PixelTree({ className, style }: PixelProps) {
  return (
    <svg viewBox="0 0 32 40" className={className} style={style} shapeRendering="crispEdges" aria-hidden>
      {/* 왕관 — 어두운 외곽 */}
      <rect x="8"  y="0"  width="16" height="4" fill="#1a5010" />
      <rect x="4"  y="4"  width="24" height="4" fill="#1a5010" />
      <rect x="0"  y="8"  width="32" height="4" fill="#1a5010" />
      <rect x="0"  y="12" width="32" height="4" fill="#1a5010" />
      <rect x="0"  y="16" width="32" height="4" fill="#1a5010" />
      <rect x="0"  y="20" width="32" height="4" fill="#1a5010" />
      <rect x="4"  y="24" width="24" height="4" fill="#1a5010" />
      <rect x="8"  y="28" width="16" height="4" fill="#1a5010" />
      {/* 왕관 — 중간 초록 (1px 안쪽) */}
      <rect x="8"  y="4"  width="16" height="4" fill="#2d7318" />
      <rect x="4"  y="8"  width="24" height="4" fill="#2d7318" />
      <rect x="4"  y="12" width="24" height="4" fill="#2d7318" />
      <rect x="4"  y="16" width="24" height="4" fill="#2d7318" />
      <rect x="4"  y="20" width="24" height="4" fill="#2d7318" />
      <rect x="8"  y="24" width="16" height="4" fill="#2d7318" />
      {/* 왕관 — 밝은 안쪽 */}
      <rect x="8"  y="8"  width="16" height="4" fill="#4a9820" />
      <rect x="8"  y="12" width="16" height="4" fill="#4a9820" />
      <rect x="8"  y="16" width="16" height="4" fill="#4a9820" />
      <rect x="8"  y="20" width="16" height="4" fill="#4a9820" />
      {/* 왕관 — 중심 밝은 반점 */}
      <rect x="12" y="12" width="8"  height="8"  fill="#6ab830" />
      {/* 하이라이트 (왼쪽 위) */}
      <rect x="8"  y="8"  width="8"  height="4"  fill="#88d840" />
      <rect x="8"  y="12" width="4"  height="4"  fill="#88d840" />
      {/* 오른쪽 아래 그림자 */}
      <rect x="20" y="16" width="8"  height="4"  fill="#183c0c" />
      <rect x="16" y="20" width="12" height="4"  fill="#183c0c" />
      <rect x="16" y="24" width="8"  height="4"  fill="#183c0c" />
      {/* 기둥 */}
      <rect x="12" y="32" width="8"  height="8"  fill="#6b3810" />
      <rect x="12" y="32" width="2"  height="8"  fill="#8b5030" />
    </svg>
  );
}

/** 포켓몬 스타일 작은 나무 */
export function PixelSmallTree({ className, style }: PixelProps) {
  return (
    <svg viewBox="0 0 24 30" className={className} style={style} shapeRendering="crispEdges" aria-hidden>
      {/* 왕관 — 어두운 외곽 */}
      <rect x="6"  y="0"  width="12" height="3" fill="#1a5010" />
      <rect x="3"  y="3"  width="18" height="3" fill="#1a5010" />
      <rect x="0"  y="6"  width="24" height="3" fill="#1a5010" />
      <rect x="0"  y="9"  width="24" height="3" fill="#1a5010" />
      <rect x="0"  y="12" width="24" height="3" fill="#1a5010" />
      <rect x="0"  y="15" width="24" height="3" fill="#1a5010" />
      <rect x="3"  y="18" width="18" height="3" fill="#1a5010" />
      <rect x="6"  y="21" width="12" height="3" fill="#1a5010" />
      {/* 왕관 — 중간 */}
      <rect x="6"  y="3"  width="12" height="3" fill="#2d7318" />
      <rect x="3"  y="6"  width="18" height="3" fill="#2d7318" />
      <rect x="3"  y="9"  width="18" height="3" fill="#2d7318" />
      <rect x="3"  y="12" width="18" height="3" fill="#2d7318" />
      <rect x="3"  y="15" width="18" height="3" fill="#2d7318" />
      <rect x="6"  y="18" width="12" height="3" fill="#2d7318" />
      {/* 왕관 — 밝은 안쪽 */}
      <rect x="6"  y="6"  width="12" height="12" fill="#4a9820" />
      {/* 하이라이트 */}
      <rect x="6"  y="6"  width="6"  height="3"  fill="#88d840" />
      <rect x="6"  y="9"  width="3"  height="3"  fill="#88d840" />
      {/* 그림자 */}
      <rect x="15" y="12" width="6"  height="6"  fill="#183c0c" />
      {/* 기둥 */}
      <rect x="9"  y="24" width="6"  height="6"  fill="#6b3810" />
      <rect x="9"  y="24" width="2"  height="6"  fill="#8b5030" />
    </svg>
  );
}

/**
 * 포켓몬 긴 풀 (tall grass) — 2칸 타일
 * 밝고 어두운 두 타일이 나란히, 위에 풀잎
 */
export function PixelTallGrass({ className, style }: PixelProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} style={style} shapeRendering="crispEdges" aria-hidden>
      {/* 왼쪽 타일 (밝음) */}
      <rect x="0"  y="0"  width="16" height="32" fill="#58c038" />
      {/* 오른쪽 타일 (어둠) */}
      <rect x="16" y="0"  width="16" height="32" fill="#489828" />
      {/* 왼쪽 풀잎 끝 */}
      <rect x="1"  y="0"  width="3"  height="10" fill="#78d848" />
      <rect x="6"  y="0"  width="3"  height="8"  fill="#70d040" />
      <rect x="12" y="0"  width="3"  height="11" fill="#78d848" />
      {/* 오른쪽 풀잎 끝 */}
      <rect x="17" y="0"  width="3"  height="11" fill="#58b030" />
      <rect x="22" y="0"  width="3"  height="8"  fill="#58b030" />
      <rect x="28" y="0"  width="3"  height="10" fill="#58b030" />
      {/* 십자 하이라이트 */}
      <rect x="8"  y="3"  width="2"  height="6"  fill="#98e858" />
      <rect x="24" y="2"  width="2"  height="6"  fill="#68c038" />
      {/* 타일 경계 */}
      <rect x="15" y="0"  width="2"  height="32" fill="rgba(0,0,0,0.08)" />
    </svg>
  );
}

/**
 * 짧은 풀 장식 클럼프
 * 일반 잔디 위에 살짝 튀어나온 풀잎들
 */
export function PixelGrassClump({ className, style }: PixelProps) {
  return (
    <svg viewBox="0 0 32 16" className={className} style={style} shapeRendering="crispEdges" aria-hidden>
      <rect x="0"  y="10" width="4"  height="6"  fill="#70d040" />
      <rect x="2"  y="7"  width="4"  height="9"  fill="#58c038" />
      <rect x="6"  y="5"  width="4"  height="11" fill="#70d040" />
      <rect x="8"  y="8"  width="4"  height="8"  fill="#48a828" />
      <rect x="12" y="4"  width="4"  height="12" fill="#58c038" />
      <rect x="14" y="7"  width="4"  height="9"  fill="#70d040" />
      <rect x="18" y="5"  width="4"  height="11" fill="#58c038" />
      <rect x="20" y="9"  width="4"  height="7"  fill="#48a828" />
      <rect x="24" y="7"  width="4"  height="9"  fill="#70d040" />
      <rect x="26" y="10" width="4"  height="6"  fill="#58c038" />
      <rect x="28" y="8"  width="4"  height="8"  fill="#70d040" />
      {/* 밑동 그림자 */}
      <rect x="0"  y="13" width="32" height="3"  fill="#397728" opacity="0.45" />
    </svg>
  );
}

/** 하늘 구름 — 배경 전용 SVG */
export function PixelCloud({ className, style }: PixelProps) {
  return (
    <svg
      viewBox="0 0 56 28"
      className={className}
      style={style}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <rect x="16" y="4"  width="8"  height="4" fill="#eef8ff" />
      <rect x="24" y="0"  width="8"  height="4" fill="#ffffff" />
      <rect x="32" y="4"  width="8"  height="4" fill="#eef8ff" />
      <rect x="8"  y="8"  width="8"  height="4" fill="#dceef8" />
      <rect x="16" y="8"  width="24" height="4" fill="#ffffff" />
      <rect x="40" y="8"  width="8"  height="4" fill="#eef8ff" />
      <rect x="4"  y="12" width="48" height="4" fill="#ffffff" />
      <rect x="8"  y="16" width="40" height="4" fill="#f4fbff" />
      <rect x="12" y="20" width="32" height="4" fill="#eef8ff" />
      <rect x="20" y="24" width="16" height="4" fill="#dceef8" />
    </svg>
  );
}

export function PixelCloudSmall({ className, style }: PixelProps) {
  return (
    <svg viewBox="0 0 32 16" className={className} style={style} shapeRendering="crispEdges" aria-hidden>
      <rect x="8"  y="2"  width="8"  height="4" fill="#ffffff" />
      <rect x="16" y="0"  width="8"  height="4" fill="#f4fbff" />
      <rect x="4"  y="6"  width="24" height="4" fill="#ffffff" />
      <rect x="8"  y="10" width="16" height="4" fill="#eef8ff" />
      <rect x="12" y="14" width="8"  height="2" fill="#dceef8" />
    </svg>
  );
}
