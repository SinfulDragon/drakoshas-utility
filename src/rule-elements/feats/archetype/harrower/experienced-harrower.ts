import type { RuleElementPatch } from "@/rule-elements/types.ts";

/**
 * Experienced Harrower (Pathfinder Stolen Fate Player's Guide, level 4 feat).
 *
 * Adds a +5 untyped bonus to the primary check of the Harrowing ritual. The
 * predicate expects the Harrowing automation to emit the
 * `harrowing-primary-check` roll option alongside the `action:harrowing`
 * option on the relevant `skill-check`.
 *
 * Source item UUID: Compendium.pf2e.feats-srd.Item.Q0cTWUptV3uRIAIr
 */
export const experiencedHarrowerPatch: RuleElementPatch = {
  slug: "experienced-harrower",
  itemType: "feat",
  compendiumSource: "Compendium.pf2e.feats-srd.Item.Q0cTWUptV3uRIAIr",
  rules: [
    {
      key: "FlatModifier",
      slug: "drakoshas-experienced-harrower",
      selector: "skill-check",
      type: "untyped",
      value: 5,
      label: "DRAKOSHAS_UTILITY.RuleElement.Harrower.ExperiencedHarrower",
      predicate: ["action:harrowing", "harrowing-primary-check"],
    },
  ],
};
