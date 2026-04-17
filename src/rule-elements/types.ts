import type { ItemType } from "@item/types.ts";
import type { RuleElementSource } from "@module/rules/rule-element/data.ts";

/**
 * A single rule-element source with permissive extra fields.
 *
 * PF2e's `RuleElementSource` only types common base fields (`key`, `slug`,
 * `label`, `predicate`, etc.). Concrete rule elements (FlatModifier, RollOption,
 * Note, etc.) add their own fields, so we relax the type with an index
 * signature to allow defining them declaratively.
 */
export type RuleElementSourcePatch = RuleElementSource & {
  [key: string]: unknown;
};

/**
 * Declarative description of rule elements that should be injected into a
 * PF2e item when it is created on an actor (drag-and-drop, compendium import,
 * etc.). Matching is performed by item type + slug; an optional
 * `compendiumSource` UUID can further restrict matches to an item originating
 * from a specific compendium entry.
 */
export interface RuleElementPatch {
  /** Sluggified identifier of the target item (e.g. "experienced-harrower"). */
  slug: string;
  /** PF2e item type (e.g. "feat", "action", "effect"). */
  itemType: ItemType;
  /**
   * If provided, the patched item must originate from this compendium entry
   * (matched against `_stats.compendiumSource`). This avoids applying the
   * patch to unrelated homebrew items that happen to share the slug.
   */
  compendiumSource?: string;
  /** Rule elements to append to the item's `system.rules`. */
  rules: RuleElementSourcePatch[];
}
