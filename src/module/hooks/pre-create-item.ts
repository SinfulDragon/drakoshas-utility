import type { ActorPF2e } from "@actor";
import type { ItemPF2e } from "@item";
import type { RuleElementSource } from "@module/rules/rule-element/data.ts";

import { Logger } from "@/module/logger.ts";
import {
  findRuleElementPatches,
  type RuleElementSourcePatch
} from "@/rule-elements/index.ts";

function getCompendiumSource(
  document: ItemPF2e<ActorPF2e | null>,
  data: object
): string | null {
  const docStats = (
    document as unknown as { _stats?: { compendiumSource?: string | null } }
  )._stats;
  const dataStats = (data as { _stats?: { compendiumSource?: string | null } })
    ._stats;
  const flags = (data as { flags?: { core?: { sourceId?: string } } }).flags;
  return (
    docStats?.compendiumSource ??
    dataStats?.compendiumSource ??
    flags?.core?.sourceId ??
    null
  );
}

function resolveSlug(document: ItemPF2e<ActorPF2e | null>): string | null {
  if (document.slug) return document.slug;
  const sluggify = game.pf2e?.system?.sluggify;
  return typeof sluggify === "function" ? sluggify(document.name) : null;
}

/**
 * Registers a `preCreateItem` hook that injects rule elements declared in
 * `src/rule-elements/**` when a matching item is created on an actor (drag
 * and drop, compendium import, granted item, etc.).
 *
 * Injected rules are deduplicated by slug so that re-adding the same feat
 * (or importing an already-patched item) does not stack duplicates.
 */
export function registerPreCreateItemHook(): void {
  try {
    Hooks.on("preCreateItem", ((
      document: ItemPF2e<ActorPF2e | null>,
      data: object
    ) => {
      const slug = resolveSlug(document);
      const compendiumSource = getCompendiumSource(document, data);

      Logger.debug(
        `preCreateItem fired: name="${document.name}", type=${document.type}, slug=${slug ?? "∅"}, actor=${document.actor?.name ?? "∅"}, compendiumSource=${compendiumSource ?? "∅"}`
      );

      if (!document.actor) {
        Logger.debug(
          "preCreateItem: no actor (world/sidebar item), skipping patch injection"
        );
        return;
      }

      const patches = findRuleElementPatches({
        slug,
        itemType: document.type,
        compendiumSource
      });
      if (patches.length === 0) {
        Logger.debug(
          `preCreateItem: no patches for slug=${slug ?? "∅"}, skipping`
        );
        return;
      }

      const existingRules: RuleElementSource[] = [
        ...(document.system?.rules ?? [])
      ];
      const existingSlugs = new Set(
        existingRules
          .map((rule) => (typeof rule?.slug === "string" ? rule.slug : null))
          .filter((s): s is string => s !== null)
      );

      Logger.debug(
        `preCreateItem: existing rules=${existingRules.length}, existing slugs=[${[...existingSlugs].join(", ")}]`
      );

      const additions: RuleElementSourcePatch[] = [];
      for (const patch of patches) {
        for (const rule of patch.rules) {
          const ruleSlug = typeof rule.slug === "string" ? rule.slug : null;
          if (ruleSlug && existingSlugs.has(ruleSlug)) {
            Logger.debug(
              `preCreateItem: skip duplicate rule slug="${ruleSlug}" from patch "${patch.slug}"`
            );
            continue;
          }
          if (ruleSlug) existingSlugs.add(ruleSlug);
          Logger.debug(
            `preCreateItem: will add rule key=${String(rule.key)}, slug=${ruleSlug ?? "∅"} (from patch "${patch.slug}")`
          );
          additions.push(rule);
        }
      }
      if (additions.length === 0) {
        Logger.debug(
          "preCreateItem: all patch rules already present, no updates"
        );
        return;
      }

      const mergedRules = [
        ...existingRules,
        ...additions
      ] as RuleElementSource[];
      Logger.debug(
        `preCreateItem: updateSource system.rules (${existingRules.length} -> ${mergedRules.length})`
      );
      document.updateSource({ "system.rules": mergedRules });

      Logger.info(
        `Injected ${additions.length} rule element(s) into "${document.name}" (${slug ?? "?"})`
      );
    }) as never);
    Logger.info("preCreateItem hook registered");
  } catch (err) {
    Logger.error("Failed to register preCreateItem hook:", err);
  }
}
