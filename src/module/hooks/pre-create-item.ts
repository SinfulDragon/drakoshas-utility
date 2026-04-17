import type { ActorPF2e } from "@actor";
import type { ItemPF2e } from "@item";
import type { RuleElementSource } from "@module/rules/rule-element/data.ts";

import { Logger } from "@/module/logger.ts";
import {
  findRuleElementPatches,
  type RuleElementSourcePatch,
} from "@/rule-elements/index.ts";

/**
 * Callback signature as Foundry v13 actually invokes the `preCreateItem` hook
 * (the types bundled in this repo describe an older 3-argument shape).
 */
type PreCreateItemCallback = (
  document: ItemPF2e<ActorPF2e | null>,
  data: object,
  options: Record<string, unknown>,
  userId: string,
) => boolean | void;

type HookRegistrar = (event: string, fn: (...args: unknown[]) => boolean | void) => number;

function onPreCreateItem(callback: PreCreateItemCallback): void {
  const register = Hooks.on as unknown as HookRegistrar;
  register("preCreateItem", callback as unknown as (...args: unknown[]) => boolean | void);
}

function getCompendiumSource(document: ItemPF2e<ActorPF2e | null>, data: object): string | null {
  const docStats = (document as unknown as { _stats?: { compendiumSource?: string | null } })._stats;
  const dataStats = (data as { _stats?: { compendiumSource?: string | null } })._stats;
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
  onPreCreateItem((document, data) => {
    if (!document.actor) return;

    const slug = resolveSlug(document);
    const patches = findRuleElementPatches({
      slug,
      itemType: document.type,
      compendiumSource: getCompendiumSource(document, data),
    });
    if (patches.length === 0) return;

    const existingRules: RuleElementSource[] = [...(document.system?.rules ?? [])];
    const existingSlugs = new Set(
      existingRules
        .map((rule) => (typeof rule?.slug === "string" ? rule.slug : null))
        .filter((s): s is string => s !== null),
    );

    const additions: RuleElementSourcePatch[] = [];
    for (const patch of patches) {
      for (const rule of patch.rules) {
        const ruleSlug = typeof rule.slug === "string" ? rule.slug : null;
        if (ruleSlug && existingSlugs.has(ruleSlug)) continue;
        if (ruleSlug) existingSlugs.add(ruleSlug);
        additions.push(rule);
      }
    }
    if (additions.length === 0) return;

    const mergedRules = [...existingRules, ...additions] as RuleElementSource[];
    document.updateSource({ "system.rules": mergedRules });

    Logger.info(
      `Injected ${additions.length} rule element(s) into "${document.name}" (${slug ?? "?"})`,
    );
  });
}
