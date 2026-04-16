import type { HarrowingSuit } from "./types.ts";

export const SUIT_MAP: Record<number, HarrowingSuit> = {
  1: {
    name: "Hammers",
    labelKey: "DRAKOSHAS_UTILITY.Harrowing.Suit.Hammers",
    selector: "strike-attack-roll",
  },
  2: {
    name: "Keys",
    labelKey: "DRAKOSHAS_UTILITY.Harrowing.Suit.Keys",
    selector: "reflex",
  },
  3: {
    name: "Shields",
    labelKey: "DRAKOSHAS_UTILITY.Harrowing.Suit.Shields",
    selector: "fortitude",
  },
  4: {
    name: "Books",
    labelKey: "DRAKOSHAS_UTILITY.Harrowing.Suit.Books",
    selector: "skill-check",
  },
  5: {
    name: "Stars",
    labelKey: "DRAKOSHAS_UTILITY.Harrowing.Suit.Stars",
    selector: "will",
  },
  6: {
    name: "Crowns",
    labelKey: "DRAKOSHAS_UTILITY.Harrowing.Suit.Crowns",
    selectors: [
      "perception",
      "flat-check",
      "initiative",
      "spell-attack-roll",
      "counteract-check",
    ],
  },
};
