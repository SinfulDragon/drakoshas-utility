import type { EffectSource } from "@item/effect/data.ts";

import type {
  HarrowingEffectParams,
  HarrowingImmunityParams
} from "./types.ts";

interface BaseEffectParams {
  ritualRank: number;
  name: string;
  description: string;
  rules?: unknown[];
  flags?: Record<string, unknown>;
}

function buildBaseEffectSource(
  params: BaseEffectParams
): PreCreate<EffectSource> {
  const { ritualRank, name, description, rules = [], flags = {} } = params;
  return {
    name,
    type: "effect",
    img: "icons/sundries/gaming/playing-cards-grey.webp",
    system: {
      description: { value: description },
      duration: {
        expiry: "turn-start",
        sustained: false,
        unit: "days",
        value: 30
      },
      level: { value: ritualRank },
      start: { initiative: null, value: 0 },
      tokenIcon: { show: true },
      traits: { value: [] },
      rules
    },
    flags
  } as unknown as PreCreate<EffectSource>;
}

const DEGREE_INFO: Record<number, { value: number; labelKey: string }> = {
  3: {
    value: 4,
    labelKey: "DRAKOSHAS_UTILITY.Harrowing.Degree.CriticalSuccess"
  },
  2: { value: 0, labelKey: "DRAKOSHAS_UTILITY.Harrowing.Degree.Success" },
  1: { value: -4, labelKey: "DRAKOSHAS_UTILITY.Harrowing.Degree.Failure" }
};

export function buildHarrowingEffectSource(
  params: HarrowingEffectParams
): PreCreate<EffectSource> {
  const { caster, skillLabel, rollTotal, degree, suit, ritualRank } = params;

  const info = DEGREE_INFO[degree] ?? DEGREE_INFO[1];
  const degreeSelection = info.value;
  const degreeKey = info.labelKey;
  const degreeName = game.i18n.localize(degreeKey);

  const suitLabel = game.i18n.localize(suit.labelKey);
  const effectName = game.i18n.format(
    "DRAKOSHAS_UTILITY.Harrowing.Effect.Name",
    {
      suit: suitLabel
    }
  );

  const selectors = suit.selectors ?? (suit.selector ? [suit.selector] : []);
  const primarySelector = suit.selector ?? selectors[0] ?? "";

  const description = game.i18n.format(
    "DRAKOSHAS_UTILITY.Harrowing.Effect.Description",
    {
      degreeLabel: game.i18n.localize(
        "DRAKOSHAS_UTILITY.Harrowing.Effect.DegreeLabel"
      ),
      degreeName,
      checksLabel: game.i18n.localize(
        "DRAKOSHAS_UTILITY.Harrowing.Effect.ChecksLabel"
      ),
      checks: selectors.join(", "),
      sourceLabel: game.i18n.localize(
        "DRAKOSHAS_UTILITY.Harrowing.Effect.SourceLabel"
      ),
      casterName: caster.name,
      rankLabel: game.i18n.localize(
        "DRAKOSHAS_UTILITY.Harrowing.Effect.RankLabel"
      ),
      rank: ritualRank
    }
  );

  const rules = [
    ...selectors.map((selector) => ({
      key: "FlatModifier",
      predicate: ["harrowing-reroll"],
      removeAfterRoll: "if-enabled",
      selector,
      type: "status",
      value: degreeSelection
    })),
    {
      key: "RollOption",
      label: "PF2E.SpecificRule.Harrowing.RerollLabel",
      option: "harrowing-reroll",
      toggleable: true
    }
  ];

  return buildBaseEffectSource({
    ritualRank,
    name: effectName,
    description,
    rules,
    flags: {
      pf2e: {
        rulesSelections: {
          degreeOfSuccess: degreeSelection,
          suit: primarySelector
        }
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
          timestamp: Date.now()
        }
      }
    }
  });
}

export function buildHarrowingImmunitySource(
  params: HarrowingImmunityParams
): PreCreate<EffectSource> {
  const { caster, ritualRank } = params;

  const description = game.i18n.format(
    "DRAKOSHAS_UTILITY.Harrowing.Effect.ImmunityDescription",
    {
      sourceLabel: game.i18n.localize(
        "DRAKOSHAS_UTILITY.Harrowing.Effect.SourceLabel"
      ),
      casterName: caster.name,
      rankLabel: game.i18n.localize(
        "DRAKOSHAS_UTILITY.Harrowing.Effect.RankLabel"
      ),
      rank: ritualRank
    }
  );

  return buildBaseEffectSource({
    ritualRank,
    name: game.i18n.localize("DRAKOSHAS_UTILITY.Harrowing.Effect.ImmunityName"),
    description,
    flags: {
      world: {
        harrowing: {
          immunity: true,
          casterId: caster.id,
          casterName: caster.name,
          timestamp: Date.now()
        }
      }
    }
  });
}
