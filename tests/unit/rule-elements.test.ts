import { describe, expect, it } from "vitest";
import { findRuleElementPatches } from "@/rule-elements/index.ts";

describe("findRuleElementPatches", () => {
  it("returns empty array for empty slug", () => {
    expect(
      findRuleElementPatches({ slug: "", itemType: "feat" })
    ).toHaveLength(0);
    expect(
      findRuleElementPatches({ slug: null, itemType: "feat" })
    ).toHaveLength(0);
    expect(
      findRuleElementPatches({ slug: undefined, itemType: "feat" })
    ).toHaveLength(0);
  });

  it("returns empty array for non-matching slug", () => {
    const result = findRuleElementPatches({
      slug: "non-existent-slug",
      itemType: "feat",
    });
    expect(result).toHaveLength(0);
  });

  it("returns empty array for non-matching item type", () => {
    const result = findRuleElementPatches({
      slug: "experienced-harrower",
      itemType: "spell",
    });
    expect(result).toHaveLength(0);
  });

  it("returns empty array when compendiumSource does not match", () => {
    const result = findRuleElementPatches({
      slug: "experienced-harrower",
      itemType: "feat",
      compendiumSource: "Compendium.wrong.Source",
    });
    expect(result).toHaveLength(0);
  });

  it("returns the experienced-harrower patch for matching slug, type, and source", () => {
    const result = findRuleElementPatches({
      slug: "experienced-harrower",
      itemType: "feat",
      compendiumSource:
        "Compendium.pf2e.feats-srd.Item.Q0cTWUptV3uRIAIr",
    });
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("experienced-harrower");
    expect(result[0].rules).toHaveLength(1);
    expect(result[0].rules[0].key).toBe("FlatModifier");
  });
});
