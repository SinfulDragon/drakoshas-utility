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
  if (!slug) return [];

  return ALL_PATCHES.filter((patch) => {
    if (patch.itemType !== itemType) return false;
    if (patch.slug !== slug) return false;
    if (patch.compendiumSource && patch.compendiumSource !== compendiumSource) {
      return false;
    }
    return true;
  });
}
