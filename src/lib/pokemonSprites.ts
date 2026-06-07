const SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white";

const SHOWDOWN_GEN5ANI = "https://play.pokemonshowdown.com/sprites/gen5ani";
const SHOWDOWN_ANI = "https://play.pokemonshowdown.com/sprites/ani";

/** 파티·도감·스타팅용 — B/W 없거나 깨진 GIF 대체 */
const ANIMATED_OVERRIDES: Record<number, string> = {
  131: "/sprites/animated/131.gif",
  132: "/sprites/animated/132.gif",
  650: `${SHOWDOWN_ANI}/chespin.gif`,
  653: `${SHOWDOWN_GEN5ANI}/fennekin.gif`,
  656: `${SHOWDOWN_GEN5ANI}/froakie.gif`,
  716: `${SHOWDOWN_GEN5ANI}/xerneas.gif`,
  717: `${SHOWDOWN_GEN5ANI}/yveltal.gif`,
  810: `${SHOWDOWN_GEN5ANI}/grookey.gif`,
  813: `${SHOWDOWN_GEN5ANI}/scorbunny.gif`,
  816: `${SHOWDOWN_GEN5ANI}/sobble.gif`,
  906: `${SHOWDOWN_ANI}/sprigatito.gif`,
  910: `${SHOWDOWN_ANI}/fuecoco.gif`,
  913: `${SHOWDOWN_ANI}/quaxly.gif`,
  1007: "/sprites/animated/1007.gif",
  1008: `${SHOWDOWN_GEN5ANI}/miraidon.gif`,
};

/** 배경 대결용 — 측면 gen5ani (서로 마주 보기 좋음) */
const DUEL_SPRITE_URLS: Record<number, string> = {
  150: `${SHOWDOWN_GEN5ANI}/mewtwo.gif`,
  151: `${SHOWDOWN_GEN5ANI}/mew.gif`,
  249: `${SHOWDOWN_GEN5ANI}/lugia.gif`,
  250: `${SHOWDOWN_GEN5ANI}/hooh.gif`,
  382: `${SHOWDOWN_GEN5ANI}/kyogre.gif`,
  383: `${SHOWDOWN_GEN5ANI}/groudon.gif`,
  483: `${SHOWDOWN_GEN5ANI}/dialga.gif`,
  484: `${SHOWDOWN_GEN5ANI}/palkia.gif`,
  643: `${SHOWDOWN_GEN5ANI}/reshiram.gif`,
  644: `${SHOWDOWN_GEN5ANI}/zekrom.gif`,
  716: `${SHOWDOWN_GEN5ANI}/xerneas.gif`,
  717: `${SHOWDOWN_GEN5ANI}/yveltal.gif`,
  791: `${SHOWDOWN_GEN5ANI}/solgaleo.gif`,
  792: `${SHOWDOWN_GEN5ANI}/lunala.gif`,
  888: `${SHOWDOWN_GEN5ANI}/zacian.gif`,
  889: `${SHOWDOWN_GEN5ANI}/zamazenta.gif`,
  1007: "/sprites/animated/1007.gif",
  1008: `${SHOWDOWN_GEN5ANI}/miraidon.gif`,
};

/** gen5ani=오른쪽 기본. koraidon=왼쪽. 일부 전설=방향 반전 */
const DUEL_FACE_LEFT = new Set([
  150, 151, 249, 250, 382, 383, 483, 484, 643, 644, 716, 717, 791, 792, 888, 889, 1007, 1008,
]);

/** 캔버스 여백이 커서 작아 보이는 스프라이트 — 표시 배율 */
const SPRITE_DISPLAY_SCALE: Record<number, number> = {
  722: 2.75, // 나몰빼미
  725: 2.25, // 냐오불
  810: 2.35, // 흥나숭
  813: 2.3, // 염버니
  816: 2.35, // 울머기
};

/** 스프라이트별 위치 미세 조정 (px) */
const SPRITE_DISPLAY_OFFSET: Record<number, { x: number; y: number }> = {
  722: { x: 0, y: 34 }, // 나몰빼미
  725: { x: 0, y: 30 }, // 냐오불
  810: { x: 0, y: 5 },
  813: { x: 0, y: 10 },
  816: { x: 1, y: 4 },
};

export function getPokemonSpriteDisplayScale(dexNo: number): number {
  return SPRITE_DISPLAY_SCALE[dexNo] ?? 1;
}

export function getPokemonSpriteDisplayOffset(dexNo: number): { x: number; y: number } {
  return SPRITE_DISPLAY_OFFSET[dexNo] ?? { x: 0, y: 0 };
}

export function getPokemonSpriteUrl(dexNo: number): string {
  return `${SPRITE_BASE}/${dexNo}.png`;
}

export function getPokemonAnimatedSpriteUrl(dexNo: number): string {
  return ANIMATED_OVERRIDES[dexNo] ?? `${SPRITE_BASE}/animated/${dexNo}.gif`;
}

export function getDuelAnimatedSpriteUrl(dexNo: number): string {
  return DUEL_SPRITE_URLS[dexNo] ?? getPokemonAnimatedSpriteUrl(dexNo);
}

/** 왼쪽=오른쪽 봄, 오른쪽=왼쪽 봄 */
export function getDuelSpriteFlip(dexNo: number, side: "left" | "right"): boolean {
  const facesRight = !DUEL_FACE_LEFT.has(dexNo);
  if (side === "left") return !facesRight;
  return facesRight;
}
