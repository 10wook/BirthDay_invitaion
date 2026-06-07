import type { SfxKey } from "@/lib/audio/sfxMap";

export interface StarterChoice {
  id: string;
  name: string;
  nameKo: string;
  dexNo: string;
  types: string[];
  sprite: string;
  choiceLabel: string;
  flavorText: string;
  rsvpUrlKey: "rsvpAttendUrl" | "rsvpMaybeUrl" | "rsvpDeclineUrl";
  sfx?: SfxKey;
}

export const starterChoices: StarterChoice[] = [
  {
    id: "bulbasaur",
    name: "Bulbasaur",
    nameKo: "이상해씨",
    dexNo: "001",
    types: ["Grass", "Poison"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/1.png",
    choiceLabel: "함께 모험!",
    flavorText: "풀 타입 파트너와 함께 9월 12일 모험에 참여할게!",
    rsvpUrlKey: "rsvpAttendUrl",
    sfx: "CONFIRM",
  },
  {
    id: "charmander",
    name: "Charmander",
    nameKo: "파이리",
    dexNo: "004",
    types: ["Fire"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/4.png",
    choiceLabel: "아직 고민 중",
    flavorText: "불꽃처럼 마음은 있지만, 일정을 조금 더 확인할게.",
    rsvpUrlKey: "rsvpMaybeUrl",
  },
  {
    id: "squirtle",
    name: "Squirtle",
    nameKo: "꼬부기",
    dexNo: "007",
    types: ["Water"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/7.png",
    choiceLabel: "다음에 만나요",
    flavorText: "이번 모험은 쉬어가지만, 응원은 보낼게!",
    rsvpUrlKey: "rsvpDeclineUrl",
  },
];
