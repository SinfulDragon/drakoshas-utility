import type { ActorPF2e, CreaturePF2e } from "@actor";

/**
 * Narrows an `ActorPF2e` to `CreaturePF2e` by checking for the presence
 * of a `skills` property. Returns `null` for non-creature actors (e.g. items,
 * hazards, vehicles).
 */
export function asCreature(actor: ActorPF2e): CreaturePF2e | null {
  if (!("skills" in actor)) return null;
  if (typeof (actor as { skills?: unknown }).skills !== "object") return null;
  return actor as unknown as CreaturePF2e;
}
