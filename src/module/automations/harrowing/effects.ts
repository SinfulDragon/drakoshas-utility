import type { EffectSource } from "@item/effect/data.ts";

import type {
  HarrowingEffectParams,
  HarrowingImmunityParams,
} from "./types.ts";

const DEGREE_VALUE_MAP: Record<number, number> = {
  3: 4,
  2: 0,
  1: -4,
};

const DEGREE_KEY_MAP: Record<number, string> = {
  3: "DRAKOSHAS_UTILITY.Harrowing.Degree.CriticalSuccess",
  2: "DRAKOSHAS_UTILITY.Harrowing.Degree.Success",
  1: "DRAKOSHAS_UTILITY.Harrowing.Degree.Failure",
};

export function buildHarrowingEffectSource(
  params: HarrowingEffectParams,
): PreCreate<EffectSource> {
  const { caster, skillLabel, rollTotal, degree, suit, ritualRank } = params;

  const degreeSelection = DEGREE_VALUE_MAP[degree];
  const degreeKey = DEGREE_KEY_MAP[degree] ?? "DRAKOSHAS_UTILITY.Harrowing.Degree.Failure";
  const degreeName = game.i18n.localize(degreeKey);

  const suitLabel = game.i18n.localize(suit.labelKey);
  const effectName = game.i18n.format("DRAKOSHAS_UTILITY.Harrowing.Effect.Name", {
    suit: suitLabel,
  });

  const selectors = suit.selectors ?? (suit.selector ? [suit.selector] : []);
  const primarySelector = suit.selector ?? selectors[0] ?? "";

  const description = game.i18n.format("DRAKOSHAS_UTILITY.Harrowing.Effect.Description", {
    degreeLabel: game.i18n.localize("DRAKOSHAS_UTILITY.Harrowing.Effect.DegreeLabel"),
    degreeName,
    checksLabel: game.i18n.localize("DRAKOSHAS_UTILITY.Harrowing.Effect.ChecksLabel"),
    checks: selectors.join(", "),
    sourceLabel: game.i18n.localize("DRAKOSHAS_UTILITY.Harrowing.Effect.SourceLabel"),
    casterName: caster.name,
    rankLabel: game.i18n.localize("DRAKOSHAS_UTILITY.Harrowing.Effect.RankLabel"),
    rank: ritualRank,
  });

  const rules = [
    ...selectors.map((selector) => ({
      key: "FlatModifier",
      predicate: ["harrowing-reroll"],
      removeAfterRoll: "if-enabled",
      selector,
      type: "status",
      value: degreeSelection,
    })),
    {
      key: "RollOption",
      label: "PF2E.SpecificRule.Harrowing.RerollLabel",
      option: "harrowing-reroll",
      toggleable: true,
    },
  ];

  return {
    name: effectName,
    type: "effect",
    img: "icons/sundries/gaming/playing-cards-grey.webp",
    system: {
      description: { value: description },
      duration: {
        expiry: "turn-start",
        sustained: false,
        unit: "days",
        value: 30,
      },
      level: { value: ritualRank },
      start: { initiative: null, value: 0 },
      tokenIcon: { show: true },
      traits: { value: [] },
      rules,
    },
    flags: {
      pf2e: {
        rulesSelections: {
          degreeOfSuccess: degreeSelection,
          suit: primarySelector,
        },
      },
      world: {
        harrowing: {
          casterId: caster.id,
          casterName: caster.name,
          skillLabel,
          rollTotal,
          degree,
          suit: suit.name,
          suitLabel,
          selector: primarySelector,
          ritualRank,
          timestamp: Date.now(),
        },
      },
    },
  } as unknown as PreCreate<EffectSource>;
}

export function buildHarrowingImmunitySource(
  params: HarrowingImmunityParams,
): PreCreate<EffectSource> {
  const { caster, ritualRank } = params;

  const description = game.i18n.format(
    "DRAKOSHAS_UTILITY.Harrowing.Effect.ImmunityDescription",
    {
      sourceLabel: game.i18n.localize("DRAKOSHAS_UTILITY.Harrowing.Effect.SourceLabel"),
      casterName: caster.name,
      rankLabel: game.i18n.localize("DRAKOSHAS_UTILITY.Harrowing.Effect.RankLabel"),
      rank: ritualRank,
    },
  );

  return {
    name: game.i18n.localize("DRAKOSHAS_UTILITY.Harrowing.Effect.ImmunityName"),
    type: "effect",
    img: "icons/sundries/gaming/playing-cards-grey.webp",
    system: {
      description: { value: description },
      duration: {
        expiry: "turn-start",
        sustained: false,
        unit: "days",
        value: 30,
      },
      level: { value: ritualRank },
      start: { initiative: null, value: 0 },
      tokenIcon: { show: true },
      traits: { value: [] },
      rules: [],
    },
    flags: {
      world: {
        harrowing: {
          immunity: true,
          casterId: caster.id,
          casterName: caster.name,
          timestamp: Date.now(),
        },
      },
    },
  } as unknown as PreCreate<EffectSource>;
}
