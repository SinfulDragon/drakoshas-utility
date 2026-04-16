import type { ActorPF2e } from "@actor";

export function getMaxRitualRank(actor: Pick<ActorPF2e, "level">): number {
  const level = actor.level ?? 1;
  return Math.max(1, Math.ceil(level / 2));
}
