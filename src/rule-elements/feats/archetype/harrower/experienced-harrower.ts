import type { RuleElementPatch } from "@/rule-elements/types.ts";

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
      predicate: ["action:harrowing", "harrowing-primary-check"]
    }
  ]
};
