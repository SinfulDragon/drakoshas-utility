import { describe, expect, it } from "vitest";
import { SUIT_MAP } from "@/module/automations/harrowing/suits.ts";

describe("SUIT_MAP", () => {
  it("has exactly 6 entries for d6 results 1-6", () => {
    expect(Object.keys(SUIT_MAP)).toHaveLength(6);
    for (let i = 1; i <= 6; i++) {
      expect(SUIT_MAP[i]).toBeDefined();
    }
  });

  it("each suit has a name and labelKey", () => {
    for (let i = 1; i <= 6; i++) {
      const suit = SUIT_MAP[i];
      expect(suit.name).toBeTruthy();
      expect(suit.labelKey).toBeTruthy();
      expect(suit.labelKey).toMatch(/^DRAKOSHAS_UTILITY\.Harrowing\.Suit\./);
    }
  });

  it("Hammers (1) has strike-attack-roll selector", () => {
    expect(SUIT_MAP[1].selector).toBe("strike-attack-roll");
  });

  it("Keys (2) has reflex selector", () => {
    expect(SUIT_MAP[2].selector).toBe("reflex");
  });

  it("Shields (3) has fortitude selector", () => {
    expect(SUIT_MAP[3].selector).toBe("fortitude");
  });

  it("Books (4) has skill-check selector", () => {
    expect(SUIT_MAP[4].selector).toBe("skill-check");
  });

  it("Stars (5) has will selector", () => {
    expect(SUIT_MAP[5].selector).toBe("will");
  });

  it("Crowns (6) has multiple selectors", () => {
    const suit = SUIT_MAP[6];
    expect(suit.selectors).toBeDefined();
    expect(suit.selectors).toContain("perception");
    expect(suit.selectors).toContain("flat-check");
    expect(suit.selectors).toContain("initiative");
    expect(suit.selectors).toContain("spell-attack-roll");
    expect(suit.selectors).toContain("counteract-check");
  });
});
