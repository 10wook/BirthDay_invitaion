const SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white";

/** 배경색이 깨져 보이는 GIF — 로컬에서 투명 처리한 버전 사용 */
const ANIMATED_OVERRIDES: Record<number, string> = {
  131: "/sprites/animated/131.gif",
  132: "/sprites/animated/132.gif",
};

export function getPokemonSpriteUrl(dexNo: number): string {
  return `${SPRITE_BASE}/${dexNo}.png`;
}

/** B/W 행동 애니메이션 도트 (날갯짓·고개 돌림 등) */
export function getPokemonAnimatedSpriteUrl(dexNo: number): string {
  return ANIMATED_OVERRIDES[dexNo] ?? `${SPRITE_BASE}/animated/${dexNo}.gif`;
}
