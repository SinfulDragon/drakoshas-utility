import type { ActorPF2e } from "@actor";
import type { EffectSource } from "@item/effect/data.ts";
import type { TokenDocumentPF2e } from "@scene";

import { Logger } from "@/module/logger.ts";

async function resolveActor(uuid: string): Promise<ActorPF2e | null> {
  const doc = await fromUuid(uuid);
  if (doc instanceof Actor) return doc as unknown as ActorPF2e;
  if (doc instanceof TokenDocument) return (doc as unknown as TokenDocumentPF2e).actor;
  return null;
}

function actorNotFound(uuid: string): Error {
  return new Error(
    game.i18n.format("DRAKOSHAS_UTILITY.Harrowing.Error.ActorNotFound", { uuid }),
  );
}

export async function applyHarrowingEffect(
  uuid: string,
  source: PreCreate<EffectSource>,
): Promise<void> {
  Logger.debug(`applyHarrowingEffect: uuid=${uuid}, effect="${source?.name ?? "∅"}"`);
  const actor = await resolveActor(uuid);
  if (!actor) throw actorNotFound(uuid);
  Logger.debug(`applyHarrowingEffect: resolved actor="${actor.name}" (id=${actor.id})`);
  await actor.createEmbeddedDocuments("Item", [source]);
  Logger.debug(`applyHarrowingEffect: effect created on "${actor.name}"`);
}

export async function applyHarrowingImmunity(
  uuid: string,
  source: PreCreate<EffectSource>,
): Promise<void> {
  Logger.debug(`applyHarrowingImmunity: uuid=${uuid}, effect="${source?.name ?? "∅"}"`);
  const actor = await resolveActor(uuid);
  if (!actor) throw actorNotFound(uuid);
  Logger.debug(`applyHarrowingImmunity: resolved actor="${actor.name}" (id=${actor.id})`);
  await actor.createEmbeddedDocuments("Item", [source]);
  Logger.debug(`applyHarrowingImmunity: immunity created on "${actor.name}"`);
}
