import { Logger } from "@/module/logger.ts";
import { harrowerArchetypePatches } from "./feats/archetype/harrower/index.ts";
import type { RuleElementPatch } from "./types.ts";

export type { RuleElementPatch, RuleElementSourcePatch } from "./types.ts";

const ALL_PATCHES: RuleElementPatch[] = [...harrowerArchetypePatches];

export interface FindRuleElementPatchesOptions {
  slug: string | null | undefined;
  itemType: string;
  compendiumSource?: string | null;
}

/**
 * Returns every registered patch that targets the given item.
 *
 * - A patch whose `compendiumSource` is set requires an exact match on the
 *   item's own compendium source UUID.
 * - A patch without `compendiumSource` matches on slug + item type only
 *   (useful for homebrew or cross-compendium items).
 */
export function findRuleElementPatches(
  options: FindRuleElementPatchesOptions,
): RuleElementPatch[] {
  const { slug, itemType, compendiumSource } = options;

  Logger.debug(
    `findRuleElementPatches: slug=${slug ?? "∅"}, itemType=${itemType}, compendiumSource=${compendiumSource ?? "∅"}, totalPatches=${ALL_PATCHES.length}`,
  );

  if (!slug) {
    Logger.debug("findRuleElementPatches: empty slug, skipping");
    return [];
  }

  const matches = ALL_PATCHES.filter((patch) => {
    if (patch.itemType !== itemType) return false;
    if (patch.slug !== slug) return false;
    if (patch.compendiumSource && patch.compendiumSource !== compendiumSource) {
      return false;
    }
    return true;
  });

  Logger.debug(
    `findRuleElementPatches: matched ${matches.length} patch(es)` +
      (matches.length > 0
        ? ` -> [${matches.map((p) => p.slug).join(", ")}]`
        : ""),
  );

  return matches;
}
