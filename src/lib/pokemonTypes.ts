export const TYPE_COLORS: Record<string, { bg: string; border: string }> = {
  Normal: { bg: "#A8A878", border: "#6D6D4E" },
  Fire: { bg: "#F08030", border: "#9C531F" },
  Water: { bg: "#6890F0", border: "#445E9C" },
  Grass: { bg: "#78C850", border: "#4E8234" },
  Electric: { bg: "#F8D030", border: "#A1871F" },
  Ice: { bg: "#98D8D8", border: "#638D8D" },
  Fighting: { bg: "#C03028", border: "#7D1F1A" },
  Poison: { bg: "#A040A0", border: "#682A68" },
  Ground: { bg: "#E0C068", border: "#927D44" },
  Flying: { bg: "#A890F0", border: "#6D5E9C" },
  Psychic: { bg: "#F85888", border: "#A13959" },
  Bug: { bg: "#A8B820", border: "#6D7815" },
  Rock: { bg: "#B8A038", border: "#786824" },
  Ghost: { bg: "#705898", border: "#493963" },
  Dragon: { bg: "#7038F8", border: "#4924A1" },
  Dark: { bg: "#705848", border: "#49392F" },
  Steel: { bg: "#B8B8D0", border: "#787887" },
  Fairy: { bg: "#EE99AC", border: "#9B6470" },
};

export function getTypeColor(type: string) {
  return TYPE_COLORS[type] ?? { bg: "#A8A878", border: "#6D6D4E" };
}
