import type { SfxKey } from "@/lib/audio/sfxMap";

export interface StarterChoice {
  id: string;
  name: string;
  nameKo: string;
  dexNo: number;
  types: string[];
  choiceLabel: string;
  flavorText: string;
  rsvpUrlKey: "rsvpAttendUrl" | "rsvpMaybeUrl" | "rsvpDeclineUrl";
  sfx?: SfxKey;
}

const RSVP = {
  attend: {
    choiceLabel: "함께 모험!",
    flavorText: "9월 12일 생일 모험에 함께할게!",
    rsvpUrlKey: "rsvpAttendUrl" as const,
    sfx: "CONFIRM" as const,
  },
  maybe: {
    choiceLabel: "같이 가자!",
    flavorText: "이 포켓몬과 함께라면 최고의 모험이 될 거야!",
    rsvpUrlKey: "rsvpAttendUrl" as const,
    sfx: "CONFIRM" as const,
  },
  decline: {
    choiceLabel: "참여할게요!",
    flavorText: "좋아, 이 파트너와 함께 생일 파티로 출발!",
    rsvpUrlKey: "rsvpAttendUrl" as const,
    sfx: "CONFIRM" as const,
  },
};

/** 세대별 스타팅 3종 (풀·불·물 순) */
const STARTER_SETS: Record<number, Omit<StarterChoice, "choiceLabel" | "flavorText" | "rsvpUrlKey" | "sfx">[]> = {
  1: [
    { id: "bulbasaur", name: "Bulbasaur", nameKo: "이상해씨", dexNo: 1, types: ["Grass", "Poison"] },
    { id: "charmander", name: "Charmander", nameKo: "파이리", dexNo: 4, types: ["Fire"] },
    { id: "squirtle", name: "Squirtle", nameKo: "꼬부기", dexNo: 7, types: ["Water"] },
  ],
  2: [
    { id: "chikorita", name: "Chikorita", nameKo: "치코리타", dexNo: 152, types: ["Grass"] },
    { id: "cyndaquil", name: "Cyndaquil", nameKo: "브케인", dexNo: 155, types: ["Fire"] },
    { id: "totodile", name: "Totodile", nameKo: "리아코", dexNo: 158, types: ["Water"] },
  ],
  3: [
    { id: "treecko", name: "Treecko", nameKo: "나무지기", dexNo: 252, types: ["Grass"] },
    { id: "torchic", name: "Torchic", nameKo: "아차모", dexNo: 255, types: ["Fire"] },
    { id: "mudkip", name: "Mudkip", nameKo: "물짱이", dexNo: 258, types: ["Water"] },
  ],
  4: [
    { id: "turtwig", name: "Turtwig", nameKo: "모부기", dexNo: 387, types: ["Grass"] },
    { id: "chimchar", name: "Chimchar", nameKo: "불꽃숭이", dexNo: 390, types: ["Fire"] },
    { id: "piplup", name: "Piplup", nameKo: "팽도리", dexNo: 393, types: ["Water"] },
  ],
  5: [
    { id: "snivy", name: "Snivy", nameKo: "주리비얀", dexNo: 495, types: ["Grass"] },
    { id: "tepig", name: "Tepig", nameKo: "뚜꾸리", dexNo: 498, types: ["Fire"] },
    { id: "oshawott", name: "Oshawott", nameKo: "수댕이", dexNo: 501, types: ["Water"] },
  ],
  6: [
    { id: "chespin", name: "Chespin", nameKo: "도치마론", dexNo: 650, types: ["Grass"] },
    { id: "fennekin", name: "Fennekin", nameKo: "푸호꼬", dexNo: 653, types: ["Fire"] },
    { id: "froakie", name: "Froakie", nameKo: "개구마르", dexNo: 656, types: ["Water"] },
  ],
  7: [
    { id: "rowlet", name: "Rowlet", nameKo: "나몰빼미", dexNo: 722, types: ["Grass", "Flying"] },
    { id: "litten", name: "Litten", nameKo: "냐오불", dexNo: 725, types: ["Fire"] },
    { id: "popplio", name: "Popplio", nameKo: "누리공", dexNo: 728, types: ["Water"] },
  ],
  8: [
    { id: "grookey", name: "Grookey", nameKo: "흥나숭", dexNo: 810, types: ["Grass"] },
    { id: "scorbunny", name: "Scorbunny", nameKo: "염버니", dexNo: 813, types: ["Fire"] },
    { id: "sobble", name: "Sobble", nameKo: "울머기", dexNo: 816, types: ["Water"] },
  ],
  9: [
    { id: "sprigatito", name: "Sprigatito", nameKo: "나오하", dexNo: 906, types: ["Grass"] },
    { id: "fuecoco", name: "Fuecoco", nameKo: "뜨아거", dexNo: 910, types: ["Fire"] },
    { id: "quaxly", name: "Quaxly", nameKo: "꾸왁스", dexNo: 913, types: ["Water"] },
  ],
};

function buildChoices(duelId: number): StarterChoice[] {
  const base = STARTER_SETS[duelId] ?? STARTER_SETS[1];
  const rsvpKeys = [RSVP.attend, RSVP.maybe, RSVP.decline] as const;

  return base.map((starter, i) => ({
    ...starter,
    ...rsvpKeys[i],
    flavorText: `${starter.nameKo}! ${rsvpKeys[i].flavorText}`,
  }));
}

export function getStarterChoicesByDuelId(duelId: number): StarterChoice[] {
  const id = duelId >= 1 && duelId <= 9 ? duelId : 1;
  return buildChoices(id);
}

/** @deprecated use getStarterChoicesByDuelId */
export const starterChoices = buildChoices(1);
