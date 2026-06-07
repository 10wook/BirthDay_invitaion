export interface LegendaryCombatant {
  dexNo: number;
  name: string;
  nameKo: string;
}

export interface LegendaryDuel {
  id: number;
  left: LegendaryCombatant;
  right: LegendaryCombatant;
  leftColor: string;
  rightColor: string;
  clashColor: string;
}

export const legendaryDuels: LegendaryDuel[] = [
  {
    id: 1,
    left: { dexNo: 151, name: "Mew", nameKo: "뮤" },
    right: { dexNo: 150, name: "Mewtwo", nameKo: "뮤츠" },
    leftColor: "#FF6EB4",
    rightColor: "#7B68EE",
    clashColor: "#E056FD",
  },
  {
    id: 2,
    left: { dexNo: 250, name: "Ho-Oh", nameKo: "칠색조" },
    right: { dexNo: 249, name: "Lugia", nameKo: "루기아" },
    leftColor: "#FF4500",
    rightColor: "#4682B4",
    clashColor: "#FFD700",
  },
  {
    id: 3,
    left: { dexNo: 382, name: "Kyogre", nameKo: "가이오가" },
    right: { dexNo: 383, name: "Groudon", nameKo: "그란돈" },
    leftColor: "#1E90FF",
    rightColor: "#DC143C",
    clashColor: "#87CEEB",
  },
  {
    id: 4,
    left: { dexNo: 483, name: "Dialga", nameKo: "디아루가" },
    right: { dexNo: 484, name: "Palkia", nameKo: "펄기아" },
    leftColor: "#4169E1",
    rightColor: "#DA70D6",
    clashColor: "#B0C4DE",
  },
  {
    id: 5,
    left: { dexNo: 644, name: "Zekrom", nameKo: "제크로무" },
    right: { dexNo: 643, name: "Reshiram", nameKo: "레시라무" },
    leftColor: "#2F4F4F",
    rightColor: "#FFFACD",
    clashColor: "#F0E68C",
  },
  {
    id: 6,
    left: { dexNo: 716, name: "Xerneas", nameKo: "제르네아스" },
    right: { dexNo: 717, name: "Yveltal", nameKo: "이벨타르" },
    leftColor: "#3CB371",
    rightColor: "#8B0000",
    clashColor: "#FF6347",
  },
  {
    id: 7,
    left: { dexNo: 791, name: "Solgaleo", nameKo: "솔가레오" },
    right: { dexNo: 792, name: "Lunala", nameKo: "루나아라" },
    leftColor: "#FFD700",
    rightColor: "#9370DB",
    clashColor: "#E6E6FA",
  },
  {
    id: 8,
    left: { dexNo: 888, name: "Zacian", nameKo: "자시안" },
    right: { dexNo: 889, name: "Zamazenta", nameKo: "자마젠타" },
    leftColor: "#4169E1",
    rightColor: "#CD5C5C",
    clashColor: "#B8860B",
  },
  {
    id: 9,
    left: { dexNo: 1008, name: "Miraidon", nameKo: "미라이돈" },
    right: { dexNo: 1007, name: "Koraidon", nameKo: "코라이돈" },
    leftColor: "#9400D3",
    rightColor: "#FF1493",
    clashColor: "#FF00FF",
  },
];

export function getLegendaryDuel(id: number): LegendaryDuel {
  return legendaryDuels.find((d) => d.id === id) ?? legendaryDuels[0];
}

export function pickRandomDuelId(): number {
  return Math.floor(Math.random() * 9) + 1;
}
